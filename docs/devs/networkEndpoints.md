---
sidebar_position: 4
---

# Network Endpoints

:::info

This page contains public endpoints that may at times be subject to rate limits. 

:::

### Network Status

**View the network status and uptime performance of Movement Network here: https://status.movementnetwork.xyz/**


## Movement Developer Mainnet

:::info

The Movement Mainnet is currently in Developer Mainnet mode. We are onboarding a select group of developers to deploy on Movement.

:::

**Chain ID: 126**

| Service          | URL                                                                    |
|------------------|------------------------------------------------------------------------|
| RPC              | https://mainnet.movementnetwork.xyz/v1     |
| Bridge           | https://bridge.movementnetwork.xyz/      |
| Explorer         | https://explorer.movementnetwork.xyz/?network=mainnet |
| Indexer Explorer | [Explorer](https://cloud.hasura.io/public/graphiql?endpoint=https%3A%2F%2Findexer.mainnet.movementnetwork.xyz%2Fv1%2Fgraphql) | 
| Indexer Endpoint | https://indexer.mainnet.movementnetwork.xyz/v1/graphql |


### Partner Endpoints

The following public endpoints are provided by Movement's ecosystem infrastructure providers. All of the partners below also have paid private nodes. To learn more about setting up a private node for your project, see their website below.

| Name             | RPC Endpoint                                                           | Indexer Endpoint |
|------------------|------------------------------------------------------------------------|------------------|
| [BlockPi](https://blockpi.io/)    | https://movement.blockpi.network/rpc/v1/public/v1     |                  |
| [Sentio](https://app.sentio.xyz/) |  https://rpc.sentio.xyz/movement/v1                   | https://rpc.sentio.xyz/movement-indexer/v1/graphql |

#### Custom Solutions

| Name             | Documentation                                                          |
|------------------|------------------------------------------------------------------------|
| [Pangea](https://pangea.foundation/)    | https://docs.pangea.foundation/chain-data/movement/movement.html    |



## Movement Bardock Testnet
**Chain ID: 250**

| Service          | URL                                                                    |
|------------------|------------------------------------------------------------------------|
| RPC              | https://aptos.testnet.bardock.movementlabs.xyz/v1         |
| Faucet endpoint  | https://faucet.testnet.bardock.movementnetwork.xyz/     |
| Faucet UI        | https://faucet.movementnetwork.xyz/        |
| Explorer         | https://explorer.movementlabs.xyz/  |
| Indexer Explorer | [Explorer](https://cloud.hasura.io/public/graphiql?endpoint=https%3A%2F%2Findexer.testnet.movementnetwork.xyz%2Fv1%2Fgraphql) | 
| Indexer Endpoint | https://indexer.testnet.movementnetwork.xyz |

## Suzuka Devnet

We often test updates on our Suzuka devnet before pushing to testnet, you can deploy your modules and test on our devnet with the details below.

| Service          | URL                                                                    |
|------------------|------------------------------------------------------------------------|
| RPC              | https://devnet.suzuka.movementnetwork.xyz/v1     |
| Faucet endpoint  | https://faucet.devnet.suzuka.movementnetwork.xyz/    |
| Explorer         | https://explorer.suzuka.movementnetwork.xyz/?network=devnet |


## Network Properties

|  | Testnet  | Devnet |
| --- | --- | --- |
| Validators  | Movement Labs operated validators  | Movement Labs operated validators.  |
| Full Nodes  | Permissionless + Movement Labs operated nodes  | Movement Labs operated nodes  |
| Data Durability | Data wipes will be announced ahead of time.  | Data can be wiped as part of the regular software updates. |
| Announcement Channel | [Discord](https://discord.com/channels/1101576619493167217/1259638014184001668)| [Discord](https://discord.com/channels/1101576619493167217/1259638353607917589) |
| Network Uptime | Constant uptime. | Expect down time happens.  |
