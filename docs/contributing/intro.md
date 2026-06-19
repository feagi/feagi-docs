---
slug: /
sidebar_position: 1
title: Contributing to FEAGI
description: Understand FEAGI internals and contribute to feagi-core.
---

# Contributing to FEAGI

This section is for Rust engineers, neuroscience-informed developers, and researchers
who want to understand FEAGI's internal architecture and contribute to `feagi-core`.

## What you will learn

- How the 20-crate feagi-core architecture is layered
- How the NPU (Neural Processing Unit) works: burst engine, plasticity, state machine
- How the genome encodes cortical structure and drives neuroembryogenesis
- How morphogenetic connectivity rules wire cortical areas in 3D space
- How `feagi-hal` provides embedded portability through trait abstractions
- How to port FEAGI to a new MCU
- How to run architecture compliance tests before submitting a PR

## Where to start

Start with the [Architecture Overview](./architecture/overview.md) for a map of the
crate layers. Then read [NPU Design](./architecture/npu-design.md) if you are working
on the neural engine, or [Genome Schema](./genome/schema.md) if you are working on
the genome or development pipeline.

Before submitting any PR to feagi-core, read the
[Contributing Guide](./contributing/guide.md) and run the architecture compliance tests.
