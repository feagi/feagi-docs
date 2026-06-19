---
slug: /
sidebar_position: 1
title: SDK & Integrations
description: Connect hardware, simulators, and custom systems to a running FEAGI instance.
---

# SDK & Integrations

This section is for robotics engineers, simulator developers, and hardware hackers who
want to connect an embodiment to a running FEAGI instance using one of the official SDKs
or the REST API.

## What you will learn

- How the agent registration and I/O protocol works
- How to install and use the Python, Rust, or Java SDKs
- How to use the CLI for scripting and automation
- How to call the REST API from any language
- How to configure the MCP server for AI assistant control
- How to use or extend the sensorimotor encoders and decoders
- How to set up a specific embodiment connector (simulator or physical robot)

## Where to start

Read [Agent I/O Architecture](./architecture.md) first — it explains how FEAGI agents
register, exchange sensory data, and receive motor commands. This applies regardless of
which SDK or transport you use.

Then pick your integration path:

| I want to... | Go to |
|---|---|
| Use Python | [Python SDK](./sdks/python.md) |
| Use Rust | [Rust SDK](./sdks/rust.md) |
| Use Java | [Java SDK](./sdks/java.md) |
| Use HTTP from any language | [REST API](./api/rest-api.md) |
| Control FEAGI from Cursor or Claude | [MCP Server](./api/mcp-server.md) |
| Connect MuJoCo, Webots, or a robot | [Embodiment Connectors](./embodiments/overview.md) |
