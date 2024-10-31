---
sidebar_position: 2
---

# Node-level architecture

## Node Types

### Full node

A full node provides the entire functionality of a Movement node:

- ingresses transactions into a local mempool
- forms proto-blocks from the transactions in the mempool and forwards them
  to the [DA light node](#da-light-node)
- runs executions of blocks sequenced by the DA,
  receiving them through the DA light node.
- provides views on the optimistic and settled (finalized) states via
  Aptos RPC API endpoints.
- (in a future decentralized network) can operate as a [validator node](#validator-node) with a key from the trusted validator set.

### Validator node

A validator node is a full node that is part of the trusted validator set which settles blocks via the [Fast-Finality-Settlement](high_level_architecture.md#settlement).

### Follower Node

The Movement [Follower Node][follower] is a node type introduced for RPC providers. A follower node
performs most of the functions provided by the full node, except settlement of blocks.
As such, it does not need access to a private key from the trusted validator set. 
Follower Nodes help the Movement Network to scale by providing increased transaction ingress capacity and horizontal scaling for queries over chain state.

[follower]: https://github.com/movementlabsxyz/movement/tree/main/docs/movement-node/run/manual/follower-node

### DA Light node

The DA light node is a standalone service which performs these categories of operations:

1. Write: the light node sequences the signed proto-blocks submitted by authorized nodes
   in a locally ordered mempool to periodically write them, sequenced in L2 blocks,
   to the data availability layer.
2. Read: the light node reads the blobs from the data availability layer and verifies them
   against its verification parameters, currently by verifying a trusted signature.
3. Parameter update (to be implemented): updates parameters of verification, blob data format,
   and the DA namespace.

The DA light node provides access to these operation via a gRPC API.

### Archival node

An archival node is a read-only node that synchronizes with the network and provides a view on the chain state.

!!! . with what node type does the archival node communicate to synchronize?
