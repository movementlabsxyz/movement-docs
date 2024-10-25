---
sidebar_position: 2
---

# Node-level architecture



## Node Types

### Full node

A full node provides the entire functionality of a Movement node:
ingresses transactions and forwards them to the DA light node, runs executions of blocks
sequenced by the DA, and (in a future decentralized network) operates a key from the trusted validator set to settle blocks.

### Follower Node

The Movement [Follower Node][follower] is a node type introduced for RPC providers.
The follower node type runs executions and forwards transactions to the DA light node.
Follower Nodes help the Movement Network to scale by providing increased transaction ingress
capacity and horizontal scaling for queries over network state.

[follower]: https://github.com/movementlabsxyz/movement/tree/main/docs/movement-node/run/manual/follower-node

### DA Light node

The DA light node is a standalone service which performs these categories of operations:

1. Read: the light node reads the blobs from the data availability layer and verifies them against its verification parameters, currently by verifying a trusted signature.
2. Write: the light node sequences the signed blobs in an ordered mempool to periodically
write them to the data availability layer.
3. Parameter update (to be implemented): updates parameters of verification, blob data format, and the DA namespace.

Movement nodes connect to a DA light node via a gRPC API to perform these operations.

### Archival node

An archival node is a read-only node that synchronizes with the network and provides a
view on the network state.
