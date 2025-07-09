---
sidebar_position: 1
---

# High-level architecture

![architecture_movement.png](./images/architecture_movement.png)

:::info
Integration with Celestia is currently in progress and will be coming soon.
:::

## Full Node

The Full Node is responsible for getting user transactions from RPC entry points, it will batch the the user transactions and send these batches to the DA Node. Once the DA Node creates blocks it will get the block from DA node and execute.

## Data Availability

The DA service is used to store transaction data and make it available to the network. The service is accessed via [DA nodes](./node_level_architecture.md#da-node). The DA service is currently responsible for the following actions:

- Get all Transaction batches from the connected FullNode
- Create new blcoks from the Transaction batch and order the transactions in the batch
- Persist block data and provide that data for future requests
- Send Created Block digest to Celestia Network
- And in parallele send the Block to all connected the Full Node



## Fees

Transaction fees are paid in the token of the Movement Network. They are used to pay for the data availability, sequencing, execution, and settlement services:

```
fee = data_availability_fee + sequencing_fee + execution_fee + settlement_fee
```

For more information on fees, see [this MIP](https://github.com/movementlabsxyz/MIP/tree/gas-fee-calculation/MIP/mip-19).


### Transaction Flow

The transaction flow in Movement can be broken down into two main parts:

#### Full Node Processing

1. **Transaction Reception and Validation**
   - Receives transactions through RPC endpoints
   - Verifies transaction data
   - Validates transaction pre execution
   - Adds valid transactions to mempool

2. **Batch Processing**
   - Creates batches of transactions from the mempool
   - Sends batches to the DA Sequencer Node
   - Retrieves new blocks from DA Sequencer
   - Executes blocks transactions

#### DA Sequencer Node Processing

1. **Batch Management**
   - Receives transaction batches from Full Nodes
   - Verifies batch signatures
   - Saves batches as pending

2. **Block Production**
   - Every 500 ms, aggregates pending batches into blocks
   - Assigns new block heights
   - Persists blocks in local storage
   - Removes processed pending batches

3. **Data Availability**
   - Sends block data to Celestia network
   - Provides block retrieval service for Full Nodes
   - Maintains block height synchronization

### Key Components

1. **Full Node**
   - Handles transaction ingestion and validation
   - Manages local mempool
   - Executes blocks
   - Maintains blockchain state

2. **DA Sequencer Node**
   - Manages batch processing
   - Produces blocks
   - Interfaces with Celestia
   - Provides block retrieval service

3. **Celestia Integration**
   - Ensures data availability
   - Provides consensus layer
   - Stores block data permanently

