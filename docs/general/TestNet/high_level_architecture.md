---
sidebar_position: 1
---

# High-level architecture

![Architecture](./images/architecture.png)

!!! . The node also gets informed from FFS about the finality status, hence the arrow should also go back.

!!! . where is the DA light node in this diagram? i assume the DA box is actually two boxes - one for the DA service and one for the DA light node.?

!!! . so Maptos  is the full node / validator node ?

!!! . where is the follower node in this diagram?

!!! . do we really send transactions 1-by-1 to the DA service? or do we send batches of transactions? if blobs, where are they created?

## Data Availability

The DA service is used to store transaction data and make it available to the network. The service is accessed via [DA light nodes](./node_level_architecture.md#da-light-node).

Celestia is used as the Data Availability (DA) layer.


!!! . do nodes pay fees to celestia? or is how is this rate limited?

## Sequencing

!!! is the DA service the only point of sequencing, or do full nodes already sequence transactions from their mempool? (and then send blobs of transactions to celestia)?

The DA service provides basic fair sequencing for transactions ingressed to a single node. The DA service then sequences the fair blocks proposed by authorized nodes.

!!! .  "ingressed to a single node". single node = full node? or light node? or celestia node?

!!! . "sequences the fair blocks" - do you mean fair blobs or fair blocks? 

!!! . if there is also some level of ordering at the full node level, this should also be mentioned here

## Settlement

The network uses the [Fast Finality Settlement Module](../Introduction/technical_details.md#fast-finality-settlement-module) for transaction finality.

Initially - with the training wheels in place - a specialized node is responsible for updating the state on L1. [Validator nodes](./node_level_architecture.md#validator-node) and [full nodes](./node_level_architecture.md#full-node) check against the recorded state root on L1 to increase their security and reduce the risk of providing wrong state updates to users.

As the training wheels get removed the network will move to a more decentralized model where validators will be able to attest to the correctness of state transitions, and a supermajority of validators will be required to advance the state roots on L1.


## Bridge

!!! . TODO How does the bridge work? 

!!! . What is being bridged?

!!! . By whom?

!!! . Links to documentation?

!!! . A diagram or a flowchart?

!!! . TODO link to relevant node-section in the network-level architecture

## User interaction

!!! . TODO How do users interact with the network?
!!! . TODO Can they get confirmation by querying the validators?
