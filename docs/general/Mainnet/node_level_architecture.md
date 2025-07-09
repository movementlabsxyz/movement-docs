---
sidebar_position: 2
---

# Node-level architecture

Nodes have some basic functionalities in common, such as:

- Runs executions of blocks sequenced by the Data Availability (DA) service,
  receiving them through the DA node. The sequenced blocks provided by the DA are called protoBlocks.
- Provides views on the optimistic and settled (finalized) states via
  Aptos REST API endpoints.
- Creates deterministic state transitions from the protoBlocks, and from which Movement blocks are created.

## Node Types

### Full Node

The Full Node is responsible for getting user transactions from RPC entry points, it will batch the the user transactions and send these batches to the DA Node. Once the DA Node creates blocks it will get the block from DA node and execute. Learn to run and deploy a full node [here](https://github.com/movementlabsxyz/movement/tree/main/docs/movement-node/run/manual/follower-node).

### Archival node

An archival node is a read-only follower-type node that synchronizes with the DA network and provides a view on the chain state.

### DA Sequencer node

The DA node is a standalone service, that differs from the above node types. It performs these categories of operations:

1. Write: the DA node aggregate signed transaction-batches, which are submitted by authorized nodes
2. Write: Order transaction and produce blocks
3. Read: Give access to all produced blocks
4. Write: Save block order in Celestia

The DA light node provides access to these operation via a gRPC API.
