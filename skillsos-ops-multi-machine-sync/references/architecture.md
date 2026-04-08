# Architecture

## Problem

The same prompts, rules, and workflow pieces often need to exist in more than one place.

That becomes painful when:

- one machine is not enough
- runtimes stay intentionally isolated
- copy-paste becomes the default distribution model

## Current answer

The current answer in this repo is deliberately boring:

- one CLI
- one manifest
- one place to keep the source pack
- one repeatable way to fan it out
- public examples install into `packs-public` targets so they do not overwrite a private local rail

## Main idea

Keep these surfaces separate:

- `skill` = something a runtime can install as a real skill
- `pack` = a reusable artifact bundle or reference pack

That separation matters because packs should not pretend to be runtime skills.

## Repo shape

- root = runnable CLI plus media and post stubs
- pack folder = one public pack
- references = deeper material for people who want more than the landing page

## Why it stays small

This repo is not trying to be a huge generated knowledge dump.

The main reading path should stay short:

1. understand the pain
2. run the example
3. decide whether to fork or contribute
