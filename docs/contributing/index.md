---
title: Core Contributor
sidebar_label: Core Contributor
---

# Core Contributor

The Core Contributor journey is for engineers who want to work directly on FEAGI internals, especially `feagi-core` architecture, neural runtime behavior, and platform portability. This section helps you move from first-time codebase orientation to productive development with the synced architecture corpus under `feagi-core-source`.

## feagi-core Architecture at a Glance

From the architecture sources, FEAGI core is organized as layered Rust crates with clear boundaries between foundational data structures, runtime state, neural computation, and integration surfaces.

- Foundational types and shared data structures feed all higher layers
- State management provides deterministic runtime coordination
- Algorithm crates handle neurodevelopment, burst execution, and plasticity
- Application and I/O surfaces compose these crates for server operation
- Feature-gated builds support desktop, cloud, embedded, and WASM targets

Start with:

- [Core architecture overview](./feagi-core-source/ARCHITECTURE.md)
- [Final crate architecture](./feagi-core-source/FINAL_RUST_CRATE_ARCHITECTURE.md)

## Development Environment Setup

Use the FEAGI monorepo and project-local toolchains for reproducible builds.

1. Clone `FEAGI-2.0` and enter the `feagi-core` subproject
2. Install Rust toolchain and required targets via `rustup`
3. Create and activate the Python virtual environment where Python tooling is required
4. Install development dependencies from project metadata (not global installs)
5. Run formatting, linting, and tests before opening a pull request

## Running Tests and Quality Checks

Run checks from the relevant subproject directories:

- `cargo test --workspace` for Rust unit and integration coverage
- `cargo bench --workspace` for performance-sensitive pathways
- `ruff check` and `mypy` where Python support code is touched
- Architecture and platform-compliance checks documented in the source docs

If a command changes over time, prefer the command specified in the synced source doc nearest to the component you are modifying.

## Curated Index Into `feagi-core-source`

The synced folder contains many architecture records and implementation notes. Use this curated map to find the right document quickly.

### Start Here

- [ARCHITECTURE.md](./feagi-core-source/ARCHITECTURE.md)
- [FINAL_RUST_CRATE_ARCHITECTURE.md](./feagi-core-source/FINAL_RUST_CRATE_ARCHITECTURE.md)
- [API_DESIGN_ARCHITECTURE.md](./feagi-core-source/API_DESIGN_ARCHITECTURE.md)
- [VERSIONING_QUICK_REF.md](./feagi-core-source/VERSIONING_QUICK_REF.md)

### NPU, Performance, and Runtime

- [GPU_IMPLEMENTATION_STATUS.md](./feagi-core-source/GPU_IMPLEMENTATION_STATUS.md)
- [GPU_SUPPORT_STATE_ANALYSIS.md](./feagi-core-source/GPU_SUPPORT_STATE_ANALYSIS.md)
- [GPU_BACKEND_INTEGRATION_NEXT_STEP.md](./feagi-core-source/GPU_BACKEND_INTEGRATION_NEXT_STEP.md)
- [UNIFIED_OBSERVABILITY_ARCHITECTURE.md](./feagi-core-source/UNIFIED_OBSERVABILITY_ARCHITECTURE.md)
- [TEST_STATUS_AND_NEXT_STEPS.md](./feagi-core-source/TEST_STATUS_AND_NEXT_STEPS.md)

### Genome and Development Pipeline

- [GENOME_SCHEMA_VERSIONING.md](./feagi-core-source/GENOME_SCHEMA_VERSIONING.md)
- [SPATIAL_GRADIENT_IMPLEMENTATION.md](./feagi-core-source/SPATIAL_GRADIENT_IMPLEMENTATION.md)
- [MEMORY_NEURON_VISUALIZATION_WORKFLOW.md](./feagi-core-source/MEMORY_NEURON_VISUALIZATION_WORKFLOW.md)
- [CRITICAL_BUG_FIX_SYNAPTIC_CONTRIBUTION.md](./feagi-core-source/CRITICAL_BUG_FIX_SYNAPTIC_CONTRIBUTION.md)

### Training and Evolution

- [FEAGI_TRAINER_ARCHITECTURE_AND_DESIGN.md](./feagi-core-source/FEAGI_TRAINER_ARCHITECTURE_AND_DESIGN.md)
- [FEAGI_TRAINER_TRAINING_PARADIGMS.md](./feagi-core-source/FEAGI_TRAINER_TRAINING_PARADIGMS.md)
- [FEAGI_TRAINER_ADR_SET.md](./feagi-core-source/FEAGI_TRAINER_ADR_SET.md)
- [EXPERIENCE_TRAINER_E2E_IMPLEMENTATION_PLAN.md](./feagi-core-source/EXPERIENCE_TRAINER_E2E_IMPLEMENTATION_PLAN.md)

### Architecture Decisions and Change Records

- [ARCHITECTURE_DECISION_INT8_DEFAULT.md](./feagi-core-source/ARCHITECTURE_DECISION_INT8_DEFAULT.md)
- [COMPREHENSIVE_RUST_MIGRATION_PLAN.md](./feagi-core-source/COMPREHENSIVE_RUST_MIGRATION_PLAN.md)
- [INDEPENDENT_VERSIONING.md](./feagi-core-source/INDEPENDENT_VERSIONING.md)
- [CRATE_GRAPH_SNAPSHOT_PROCESS.md](./feagi-core-source/CRATE_GRAPH_SNAPSHOT_PROCESS.md) — includes instructions for generating crate graph snapshots; versioned JSON snapshots live under `feagi-core-source/crate-graphs/`

### Additional Implementation Notes

- [LOGGING_STANDARDS_ENFORCEMENT.md](./feagi-core-source/LOGGING_STANDARDS_ENFORCEMENT.md)
- [GENERIC_INTEGRATION_COMPLETE.md](./feagi-core-source/GENERIC_INTEGRATION_COMPLETE.md)
- [INTEGRATION_TEST_RESULTS_FINAL.md](./feagi-core-source/INTEGRATION_TEST_RESULTS_FINAL.md)
- [DEBUGGING_INFRASTRUCTURE_PROPOSAL.md](./feagi-core-source/DEBUGGING_INFRASTRUCTURE_PROPOSAL.md)
- [BUG_FIXES_2025_10_30.md](./feagi-core-source/BUG_FIXES_2025_10_30.md)

## How To Use This Section Effectively

- Use this page as your starting map
- Open one architecture overview document before touching code
- Narrow to the subsystem-specific records listed above
- Keep source and docs aligned when your changes alter behavior or architecture

