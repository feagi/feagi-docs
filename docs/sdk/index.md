---
title: SDK Integrator
sidebar_label: SDK Integrator
---

# SDK Integrator

The SDK Integrator journey is for developers connecting FEAGI to real hardware, simulators, and external software systems. FEAGI exposes multiple integration surfaces because deployment targets range from rapid Python prototyping to embedded Rust runtimes and AI-assistant workflows through MCP.

## Integration Surfaces and When To Use Each

### Python SDK

Use the Python SDK when you want the fastest path to a working controller, rich ecosystem support, and straightforward scripting for robotics experiments.

- Best for rapid iteration and embodiment development
- Ideal when your controller stack is already Python-based
- Common choice for simulator integrations and prototyping
- Repository: [github.com/feagi/feagi](https://github.com/feagi/feagi)

### Java SDK

Use the Java SDK for JVM-native environments, enterprise integration patterns, or teams with existing Java robotics and middleware stacks.

- Best for Java-first production systems
- Useful when integrating with existing JVM tooling
- Suitable for strict typed-service integration workflows
- Repository: [github.com/feagi/feagi-connector-java](https://github.com/feagi/feagi-connector-java)

### Rust Crates (`feagi-core`, `feagi-hal`)

Use Rust crates when you need deterministic performance, low overhead, and a path toward embedded or RTOS targets.

- Best for performance-critical control loops
- Use `feagi-core` crates for core computation and platform-specific builds
- Use `feagi-hal` abstractions for hardware portability in embedded contexts

### FEAGI CLI (Python and Java)

Use the CLI for scripting, quick diagnostics, and repeatable operational tasks without writing full integration code first.

- Best for automation and CI-friendly commands
- Useful for health checks and operational workflows
- Good bridge between manual debugging and production tooling

### REST API

Use the REST API when integrating FEAGI from any language or platform that can make HTTP requests.

- Best for language-agnostic integrations
- Useful for orchestration tools and service-to-service workflows
- API reference: [FEAGI REST API](https://brainsforrobots.com/feagi/api-docs)

### MCP Server (`feagi-mcp`)

Use the MCP server when you want AI assistants (such as Cursor or Claude clients) to observe and operate FEAGI safely through structured tools.

- Best for assisted debugging and guided operations
- Useful for runtime inspection, stimulation, and iterative workflows
- MCP reference in this docs site: [MCP Server](./api/mcp-server.md)

## Start With Synced Embodiment Guides

The embodiment guides below are synced from controller repositories and show concrete hardware and platform wiring patterns:

- [Arduino](./embodiments/arduino.md)
- [ESP32](./embodiments/esp32.md)
- [Raspberry Pi](./embodiments/raspberry_pi.md)
- [micro:bit](./embodiments/microbit.md)
- [Petoi](./embodiments/petoi.md)
- [Elephant Robotics](./embodiments/elephant_robotics.md)

## Recommended Path

If you are new to FEAGI integrations, start with one embodiment guide and one integration surface:

1. Pick your target platform (for example, Raspberry Pi or ESP32)
2. Choose the SDK/API that matches your runtime constraints
3. Validate sensor input and motor output end to end
4. Add MCP-based inspection once baseline behavior is stable

