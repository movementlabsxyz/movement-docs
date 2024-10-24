---
sidebar_position: 1
---

# High-level architecture

!!! TODO A figure showing the high-level architecture of the network

## Data Availability

!!! TODO Celestia
!!! TODO - how is this rate limited?
!!! TODO - how is data made available?

!!! TODO link to relevant node-section in the network-level architecture

## Sequencing

!!! TODO Celestia provides the sequencing ?

!!! TODO link to relevant node-section in the network-level architecture

## Settlement

The network uses the [Fast Finality Settlement Module](../Introduction/technical_details.md#fast-finality-settlement-module) for transaction finality and starts with an optimistic approach in mind.

Initially - with the training wheels in place - a specialized node is responsible for updating the state on L1. [Validator nodes](./node_level_architecture.md#validator-node) check against the recorded state root to increase their security and reduce the risk of providing wrong state updates to users.

As the training wheels get removed the network will move to a more decentralized model where validators will be able to attest to the correctness of state transitions, and a supermajority of validators will be required to advance the state roots on L1.


## Bridge

!!! TODO How does the bridge work? Any links to documentation?

!!! TODO link to relevant node-section in the network-level architecture

## User interaction

!!! TODO How do users interact with the network?
!!! TODO Can they get confirmation by querying the validators?
