#!/usr/bin/env node

import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  renameSync,
  statSync,
  symlinkSync,
  writeFileSync
} from "node:fs";
import { dirname, isAbsolute, join, posix, resolve } from "node:path";
import { homedir } from "node:os";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function usage() {
  console.log(`skillsos-sync

Usage:
  skillsos-sync plan     --manifest <path> --host <name> [--item <name>]...
  skillsos-sync plan     --manifest <path> --all-hosts [--item <name>]...
  skillsos-sync sync     --manifest <path> --host <name> [--item <name>]...
  skillsos-sync sync     --manifest <path> --all-hosts [--item <name>]...
  skillsos-sync verify   --manifest <path> --host <name> [--item <name>]...
  skillsos-sync verify   --manifest <path> --all-hosts [--item <name>]...
  skillsos-sync registry --manifest <path> --host <name> [--item <name>]... [--json-out <path>] [--md-out <path>]
  skillsos-sync registry --manifest <path> --all-hosts [--item <name>]... [--json-out <path>] [--md-out <path>]

Notes:
  - local default = symlink
  - isolated runtime default = copy
  - use --all-hosts for one manifest-wide run
  - real skills and artifact packs must stay separate by kind/family
`);
}

function expandHome(value) {
  if (!value) return value;
  if (value === "~") return homedir();
  if (value.startsWith("~/")) return resolve(homedir(), value.slice(2));
  return value;
}

function resolveRepoPath(pathValue) {
  const expanded = expandHome(pathValue);
  return isAbsolute(expanded) ? expanded : resolve(repoRoot, expanded);
}

function parseArgs(argv) {
  const [command, ...rest] = argv;
  if (!command || command === "--help" || command === "-h") {
    usage();
    process.exit(0);
  }
  if (!["plan", "sync", "verify", "registry"].includes(command)) {
    console.error(`Unsupported command: ${command}`);
    usage();
    process.exit(1);
  }

  const options = { command, items: [] };
  for (let i = 0; i < rest.length; i += 1) {
    const token = rest[i];
    if (token === "--manifest") {
      options.manifest = rest[++i];
      continue;
    }
    if (token === "--host") {
      options.host = rest[++i];
      continue;
    }
    if (token === "--all-hosts") {
      options.allHosts = true;
      continue;
    }
    if (token === "--item") {
      options.items.push(rest[++i]);
      continue;
    }
    if (token === "--json-out") {
      options.jsonOut = rest[++i];
      continue;
    }
    if (token === "--md-out") {
      options.mdOut = rest[++i];
      continue;
    }
    console.error(`Unknown argument: ${token}`);
    usage();
    process.exit(1);
  }

  if (!options.manifest) {
    throw new Error("Missing required --manifest");
  }
  if (!options.host && !options.allHosts) {
    throw new Error("Missing required --host");
  }
  if (options.host && options.allHosts) {
    throw new Error("Use either --host or --all-hosts, not both");
  }

  return options;
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function ensureDir(pathValue) {
  mkdirSync(pathValue, { recursive: true });
}

function ensureParent(pathValue) {
  ensureDir(dirname(pathValue));
}

function runCommand(command, args, stdio = "inherit") {
  const result = spawnSync(command, args, { stdio, encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(`${command} failed with exit code ${result.status}`);
  }
  return result;
}

function ensureRsyncAvailable() {
  runCommand("rsync", ["--version"], "ignore");
}

function validateItem(item) {
  if (!item?.name) throw new Error("Every item needs a non-empty name");
  if (!["skill", "pack"].includes(item.kind)) {
    throw new Error(`Item '${item.name}' has unsupported kind '${item.kind}'`);
  }
  if (!item.source_path) {
    throw new Error(`Item '${item.name}' is missing source_path`);
  }
  if (!item.target_name) {
    throw new Error(`Item '${item.name}' is missing target_name`);
  }
}

function itemMarker(item) {
  return item.kind === "skill" ? "SKILL.md" : "README.md";
}

function familyNameForItem(item) {
  return item.family ?? item.kind;
}

function resolveHost(manifest, hostName) {
  const host = manifest.hosts?.[hostName];
  if (!host) {
    throw new Error(`Unknown host '${hostName}'`);
  }
  return host;
}

function resolveHostNames(manifest, options) {
  if (options.allHosts) {
    const hostNames = Object.keys(manifest.hosts ?? {});
    if (!hostNames.length) {
      throw new Error("Manifest has no hosts");
    }
    return hostNames;
  }
  return [options.host];
}

function resolveInstallSpec(item, host, hostName) {
  const familyName = familyNameForItem(item);
  const family = host.families?.[familyName];
  if (!family) {
    throw new Error(`Host '${hostName}' has no family config for '${familyName}'`);
  }
  const transport = family.transport ?? "local";
  const installMode = family.install_mode ?? (transport === "local" ? "symlink" : "copy");
  if (!family.install_target) {
    throw new Error(`Host '${hostName}' family '${familyName}' is missing install_target`);
  }
  if (!["local", "ssh-rsync"].includes(transport)) {
    throw new Error(`Unsupported transport '${transport}' on host '${hostName}' family '${familyName}'`);
  }
  if (!["symlink", "copy"].includes(installMode)) {
    throw new Error(`Unsupported install_mode '${installMode}' on host '${hostName}' family '${familyName}'`);
  }
  if (transport === "ssh-rsync" && installMode !== "copy") {
    throw new Error(`Host '${hostName}' family '${familyName}' must use copy mode with ssh-rsync`);
  }
  if (transport === "ssh-rsync" && !family.ssh_target) {
    throw new Error(`Host '${hostName}' family '${familyName}' is missing ssh_target`);
  }
  return {
    familyName,
    transport,
    installMode,
    installTarget: family.install_target,
    sshTarget: family.ssh_target ?? null,
    deleteExtraneous: Boolean(family.delete_extraneous)
  };
}

function extractVersion(item, sourcePath) {
  if (item.kind === "skill") {
    const raw = readFileSync(join(sourcePath, "SKILL.md"), "utf8");
    const versionMatch = raw.match(/^\s+version:\s*['"]?([^'"\n]+)['"]?\s*$/m);
    return versionMatch ? versionMatch[1] : null;
  }
  const packageJsonPath = join(repoRoot, "package.json");
  if (existsSync(packageJsonPath)) {
    return readJson(packageJsonPath).version ?? null;
  }
  return null;
}

function buildEntries(manifest, options) {
  const host = resolveHost(manifest, options.host);
  const itemFilter = options.items.length ? new Set(options.items) : null;
  const entries = [];

  for (const item of manifest.items ?? []) {
    validateItem(item);
    if (itemFilter && !itemFilter.has(item.name)) continue;

    const sourcePath = resolveRepoPath(item.source_path);
    if (!existsSync(sourcePath)) {
      throw new Error(`Source path not found for '${item.name}': ${sourcePath}`);
    }

    const marker = itemMarker(item);
    if (!existsSync(join(sourcePath, marker))) {
      throw new Error(`Item '${item.name}' is missing required marker '${marker}'`);
    }

    const familyName = familyNameForItem(item);
    if (!host.families?.[familyName]) {
      if (options.allHosts) continue;
      throw new Error(`Host '${options.host}' has no family config for '${familyName}'`);
    }

    const installSpec = resolveInstallSpec(item, host, options.host);
    const installTarget = expandHome(installSpec.installTarget);
    const destinationPath =
      installSpec.transport === "local"
        ? join(installTarget, item.target_name)
        : posix.join(installSpec.installTarget, item.target_name);

    entries.push({
      name: item.name,
      kind: item.kind,
      family: installSpec.familyName,
      sourcePath,
      targetName: item.target_name,
      marker,
      transport: installSpec.transport,
      installMode: installSpec.installMode,
      installTarget,
      sshTarget: installSpec.sshTarget,
      deleteExtraneous: installSpec.deleteExtraneous,
      destinationPath,
      version: extractVersion(item, sourcePath),
      updatedAt: statSync(join(sourcePath, marker)).mtime.toISOString()
    });
  }

  if (itemFilter) {
    const missing = [...itemFilter].filter((name) => !entries.some((entry) => entry.name === name));
    if (missing.length) {
      throw new Error(`Unknown item(s): ${missing.join(", ")}`);
    }
  }

  if (!entries.length) {
    throw new Error(`No items resolved for host '${options.host}'`);
  }

  return entries;
}

function stateRoot(manifest) {
  return expandHome(manifest.state_root ?? "~/.local/state/brandos-monorepo-sync");
}

function backupRoot(manifest) {
  return expandHome(manifest.backup_root ?? "~/.local/state/brandos-monorepo-sync/backups");
}

function timestampSlug() {
  return new Date().toISOString().replaceAll(":", "").replaceAll(".", "-");
}

function backupExisting(manifest, hostName, entry) {
  if (!existsSync(entry.destinationPath)) return null;

  const backupPath = join(backupRoot(manifest), hostName, timestampSlug(), entry.targetName);
  ensureParent(backupPath);
  renameSync(entry.destinationPath, backupPath);
  return backupPath;
}

function ensureLocalInstallTarget(entry) {
  ensureDir(entry.installTarget);
}

function ensureRemoteInstallTarget(entry) {
  runCommand("ssh", [entry.sshTarget, "mkdir", "-p", entry.installTarget]);
}

function syncLocalSymlink(manifest, hostName, entry) {
  ensureLocalInstallTarget(entry);
  if (existsSync(entry.destinationPath)) {
    const current = lstatSync(entry.destinationPath);
    if (current.isSymbolicLink() && realpathSync(entry.destinationPath) === realpathSync(entry.sourcePath)) {
      return { changed: false, backupPath: null };
    }
    const backupPath = backupExisting(manifest, hostName, entry);
    symlinkSync(entry.sourcePath, entry.destinationPath, "dir");
    return { changed: true, backupPath };
  }

  symlinkSync(entry.sourcePath, entry.destinationPath, "dir");
  return { changed: true, backupPath: null };
}

function syncLocalCopy(manifest, hostName, entry) {
  ensureLocalInstallTarget(entry);
  if (existsSync(entry.destinationPath) && lstatSync(entry.destinationPath).isSymbolicLink()) {
    backupExisting(manifest, hostName, entry);
  }
  ensureDir(entry.destinationPath);
  const args = ["-av"];
  if (entry.deleteExtraneous) args.push("--delete");
  args.push(`${entry.sourcePath}/`, entry.destinationPath);
  runCommand("rsync", args);
  return { changed: true, backupPath: null };
}

function syncRemoteCopy(entry) {
  ensureRemoteInstallTarget(entry);
  const args = ["-av"];
  if (entry.deleteExtraneous) args.push("--delete");
  args.push(`${entry.sourcePath}/`, `${entry.sshTarget}:${entry.destinationPath}`);
  runCommand("rsync", args);
  return { changed: true, backupPath: null };
}

function writeState(manifest, hostName, entries) {
  const root = stateRoot(manifest);
  ensureDir(root);
  const statePath = join(root, `${hostName}.json`);
  const payload = {
    host: hostName,
    updated_at: new Date().toISOString(),
    entries: entries.map((entry) => ({
      name: entry.name,
      kind: entry.kind,
      family: entry.family,
      transport: entry.transport,
      install_mode: entry.installMode,
      source_path: entry.sourcePath,
      destination_path: entry.destinationPath,
      version: entry.version,
      updated_at: entry.updatedAt
    }))
  };
  writeFileSync(statePath, `${JSON.stringify(payload, null, 2)}\n`);
  return statePath;
}

function verifyLocalSymlink(entry) {
  if (!existsSync(entry.destinationPath)) {
    return { ok: false, reason: "destination missing" };
  }
  const stat = lstatSync(entry.destinationPath);
  if (!stat.isSymbolicLink()) {
    return { ok: false, reason: "destination is not a symlink" };
  }
  if (realpathSync(entry.destinationPath) !== realpathSync(entry.sourcePath)) {
    return { ok: false, reason: "symlink points to a different source" };
  }
  return { ok: true, reason: "symlink matches source" };
}

function verifyLocalCopy(entry) {
  const markerPath = join(entry.destinationPath, entry.marker);
  if (!existsSync(markerPath)) {
    return { ok: false, reason: `missing marker ${entry.marker}` };
  }
  return { ok: true, reason: `marker ${entry.marker} found` };
}

function verifyRemoteCopy(entry) {
  const markerPath = posix.join(entry.destinationPath, entry.marker);
  const result = spawnSync("ssh", [entry.sshTarget, "test", "-f", markerPath], { stdio: "ignore" });
  if (result.status !== 0) {
    return { ok: false, reason: `remote marker ${entry.marker} missing` };
  }
  return { ok: true, reason: `remote marker ${entry.marker} found` };
}

function verifyEntry(entry) {
  if (entry.transport === "local" && entry.installMode === "symlink") {
    return verifyLocalSymlink(entry);
  }
  if (entry.transport === "local" && entry.installMode === "copy") {
    return verifyLocalCopy(entry);
  }
  if (entry.transport === "ssh-rsync" && entry.installMode === "copy") {
    return verifyRemoteCopy(entry);
  }
  return { ok: false, reason: "unsupported verify path" };
}

function renderPlan(hostName, entries) {
  console.log(`## host: ${hostName}`);
  for (const entry of entries) {
    const destination =
      entry.transport === "local" ? entry.destinationPath : `${entry.sshTarget}:${entry.destinationPath}`;
    console.log(`- ${entry.kind} ${entry.name}`);
    console.log(`  mode: ${entry.transport}/${entry.installMode}`);
    console.log(`  source: ${entry.sourcePath}`);
    console.log(`  destination: ${destination}`);
  }
}

function renderRegistryMarkdown(hostName, rows) {
  const lines = [
    `# BrandOS Sync Registry`,
    ``,
    `Host: \`${hostName}\``,
    ``,
    `- generated_at: ${new Date().toISOString()}`,
    ``
  ];
  for (const row of rows) {
    lines.push(`- ${row.status === "ok" ? "[x]" : "[ ]"} \`${row.name}\` ${row.kind} ${row.transport}/${row.install_mode}`);
    lines.push(`  source: ${row.source_path}`);
    lines.push(`  destination: ${row.destination_path}`);
    lines.push(`  status: ${row.status} - ${row.reason}`);
  }
  return `${lines.join("\n")}\n`;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const manifestPath = resolveRepoPath(options.manifest);
  if (!existsSync(manifestPath)) {
    throw new Error(`Manifest not found: ${manifestPath}`);
  }
  ensureRsyncAvailable();

  const manifest = readJson(manifestPath);
  const hostNames = resolveHostNames(manifest, options);

  if (options.command === "plan") {
    for (const hostName of hostNames) {
      const entries = buildEntries(manifest, { ...options, host: hostName });
      renderPlan(hostName, entries);
    }
    return;
  }

  if (options.command === "sync") {
    for (const hostName of hostNames) {
      const entries = buildEntries(manifest, { ...options, host: hostName });
      console.log(`## host: ${hostName}`);
      for (const entry of entries) {
        let result;
        if (entry.transport === "local" && entry.installMode === "symlink") {
          result = syncLocalSymlink(manifest, hostName, entry);
        } else if (entry.transport === "local" && entry.installMode === "copy") {
          result = syncLocalCopy(manifest, hostName, entry);
        } else if (entry.transport === "ssh-rsync" && entry.installMode === "copy") {
          result = syncRemoteCopy(entry);
        } else {
          throw new Error(`Unsupported sync path for '${entry.name}'`);
        }
        console.log(`- synced ${entry.name}`);
        if (result.backupPath) {
          console.log(`  backup: ${result.backupPath}`);
        }
      }
      const statePath = writeState(manifest, hostName, entries);
      console.log(`- state: ${statePath}`);
    }
    return;
  }

  const allRows = [];
  for (const hostName of hostNames) {
    const entries = buildEntries(manifest, { ...options, host: hostName });
    const rows = entries.map((entry) => {
      const verification = verifyEntry(entry);
      return {
        host: hostName,
        name: entry.name,
        kind: entry.kind,
        family: entry.family,
        transport: entry.transport,
        install_mode: entry.installMode,
        source_path: entry.sourcePath,
        destination_path:
          entry.transport === "local" ? entry.destinationPath : `${entry.sshTarget}:${entry.destinationPath}`,
        version: entry.version,
        updated_at: entry.updatedAt,
        status: verification.ok ? "ok" : "fail",
        reason: verification.reason
      };
    });
    allRows.push(...rows);
  }

  if (options.command === "verify") {
    let hasFailures = false;
    for (const hostName of hostNames) {
      console.log(`## host: ${hostName}`);
      for (const row of allRows.filter((item) => item.host === hostName)) {
        const prefix = row.status === "ok" ? "[x]" : "[ ]";
        console.log(`- ${prefix} ${row.name} ${row.reason}`);
        if (row.status !== "ok") hasFailures = true;
      }
    }
    if (hasFailures) {
      throw new Error("Verify failed");
    }
    return;
  }

  if (options.command === "registry") {
    const payload = {
      hosts: hostNames,
      generated_at: new Date().toISOString(),
      rows: allRows
    };
    if (options.jsonOut) {
      const jsonOutPath = resolveRepoPath(options.jsonOut);
      ensureParent(jsonOutPath);
      writeFileSync(jsonOutPath, `${JSON.stringify(payload, null, 2)}\n`);
      console.log(`- json: ${jsonOutPath}`);
    } else {
      console.log(JSON.stringify(payload, null, 2));
    }
    if (options.mdOut) {
      if (hostNames.length === 1) {
        const mdOutPath = resolveRepoPath(options.mdOut);
        ensureParent(mdOutPath);
        writeFileSync(mdOutPath, renderRegistryMarkdown(hostNames[0], allRows));
        console.log(`- markdown: ${mdOutPath}`);
      } else {
        for (const hostName of hostNames) {
          const hostRows = allRows.filter((item) => item.host === hostName);
          const suffix = options.mdOut.endsWith(".md") ? options.mdOut.replace(/\.md$/, `.${hostName}.md`) : `${options.mdOut}.${hostName}.md`;
          const mdOutPath = resolveRepoPath(suffix);
          ensureParent(mdOutPath);
          writeFileSync(mdOutPath, renderRegistryMarkdown(hostName, hostRows));
          console.log(`- markdown: ${mdOutPath}`);
        }
      }
    }
    return;
  }
}

try {
  main();
} catch (error) {
  console.error(`\nERROR: ${error.message}`);
  process.exit(1);
}
