---
sidebar_position: 2
---

# Node-level architecture

Nodes have some basic functionalities in common, such as:

- Runs executions of blocks sequenced by the Data Availability (DA) service,
  receiving them through the DA light node. The sequenced blocks provided by the DA are called protoBlocks.
- Provides views on the optimistic and settled (finalized) states via
  Aptos REST API endpoints.
- Creates deterministic state transitions from the protoBlocks, and from which Movement blocks are created.

## Node Types

### Sequencer node

A sequencer node ingresses transactions into a local mempool and forms batches from the transactions in the mempool and forwards them to the [DA light node](#da-light-node)

### Validator node

A validator node is a node that is part of the trusted validator set, which settles blocks via the [Fast-Finality-Settlement](high_level_architecture.md#settlement).

### Follower Node

The follower node is a node type introduced for RPC providers. A follower node performs basic operations but does neither sequence nor settle. As such, it does not need access to a private key from the trusted validator set. Follower Nodes help the Movement Network to scale by providing increased transaction ingress capacity and horizontal scaling for queries over chain state. Learn to run and deploy a follower node [here](https://github.com/movementlabsxyz/movement/tree/main/docs/movement-node/run/manual/follower-node).

### Archival node

An archival node is a read-only follower-type node that synchronizes with the DA network and provides a view on the chain state.

## DA light node

The DA light node is a standalone service, that differs from the above node types. It performs these categories of operations:

1. Write: the light node forwards signed transaction-batches, which are submitted by authorized nodes, to the data availability layer.
2. Read: the light node reads the data from the data availability layer and verifies them against its verification parameters, currently by verifying a trusted signature.
3. Read: the light node reads the ordered transaction batches with the data from the DA layer constructs protoBlocks.

The DA light node provides access to these operation via a gRPC API.
