---
sidebar_position: 2
---

# Node-level architecture

## Node Types

### Leader node

A Leader node provides the core functionality of a Movement node:

- Ingresses transactions into a local mempool
- Forms batches from the transactions in the mempool and forwards them
  to the [DA light node](#da-light-node)
- Runs executions of blocks sequenced by the Data Availability(DA),
  receiving them through the DA light node. The sequenced blocks provided by the DA are called protoBlocks.
- Provides views on the optimistic and settled (finalized) states via
  Aptos REST API endpoints.
- Creates the deterministic state transitions from the protoBlocks, and from which L2 blocks are created.
- Both Fast Finality Settlement (FFS) and Data Availability (DA) writing are optional modules, and omitting them allows for two additional node configurations. 

The node can be configured to operate in the following three modes:

- Can operate as a [Validator Node](#validator-node) with a key from the trusted validator set.
- Can operate as a [Follower_Node](#follower-node) which removes the requirement to write batches to the DA.
- Can operate as an [Archival Node](#archival-node) which removes the requirement to write to DA and settle to Layer 1 with FFS.

### Validator node

A validator node is a full node that is part of the trusted validator set, which settles blocks via the [Fast-Finality-Settlement](high_level_architecture.md#settlement).

### Follower Node

The Movement [Follower Node][follower] is a node type introduced for RPC providers. A follower node
performs most of the functions provided by the full node, except settlement of blocks.
As such, it does not need access to a private key from the trusted validator set. 
Follower Nodes help the Movement Network to scale by providing increased transaction ingress capacity and horizontal scaling for queries over chain state. Learn to run and deploy a follower node [here](/devs/followerNode).

[follower]: https://github.com/movementlabsxyz/movement/tree/main/docs/movement-node/run/manual/follower-node

### DA light node

The DA light node is a standalone service which performs these categories of operations:

1. Write: the light node forwards signed transaction-batches, which are submitted by authorized nodes, to the data availability layer.
2. Read: the light node reads the blobs from the data availability layer and verifies them against its verification parameters, currently by verifying a trusted signature. We call the set of transaction-batches (which are now ordered by the DA) a protoBlock.
3. Parameter update (to be implemented): updates parameters of verification, blob data format, and the DA namespace.

The DA light node provides access to these operation via a gRPC API.

### Archival node

An archival node is a read-only node that synchronizes with the DA network and provides a view on the chain state.
