---
sidebar_position: 4
---

# Network Endpoints

:::info

This page contains public endpoints that may at times be subject to rate limits. 

:::

## Movement Porto Testnet: Aptos Environment

| Service          | URL                                                                    |
|------------------|------------------------------------------------------------------------|
| RPC              | [https://aptos.testnet.porto.movementlabs.xyz/v1](https://aptos.testnet.porto.movementlabs.xyz/v1)     |
| Faucet endpoint  | [https://fund.testnet.porto.movementlabs.xyz/](https://fund.testnet.porto.movementlabs.xyz/)     |
| Explorer         | [https://explorer.movementnetwork.xyz/](https://explorer.movementnetwork.xyz/) |
| Faucet UI         | [https://mizu.testnet.porto.movementnetwork.xyz/](https://mizu.testnet.porto.movementnetwork.xyz/) |
| Indexer Explorer        | [Public Explorer](https://cloud.hasura.io/public/graphiql?endpoint=https://indexer.testnet.porto.movementnetwork.xyz/v1/graphql) |
| Indexer Endpoint      | [https://indexer.testnet.porto.movementnetwork.xyz/v1/graphql](https://indexer.testnet.porto.movementnetwork.xyz/v1/graphql) |

<br />


## Movement Bardock Testnet: Aptos Environment

:::warning

The Movement Bardock Testnet is intended for infrastructure and validator design partners to begin testing deployments. Please note that the Bardock Testnet may experience state resets during this phase. If you’re developing a dApp, we recommend using the more stable Porto Testnet.  

:::

The Movement Testnetwork with Aptos Move

| Service          | URL                                                                    |
|------------------|------------------------------------------------------------------------|
| RPC              | [https://aptos.testnet.bardock.movementlabs.xyz/v1](https://aptos.testnet.bardock.movementlabs.xyz/v1)     |
| Faucet endpoint  | [https://faucet.testnet.movementnetwork.xyz](https://faucet.testnet.movementnetwork.xyz)     |
| Explorer         | [https://explorer.movementlabs.xyz/ ](https://explorer.movementlabs.xyz/ ) |


## Movement Mainnet: Aptos Environment

:::warning

The Movement Mainnet is currently in "Operater Mode". This means that we are currently onboarding node operators and other infrastructure providers to the network.   

:::

| Service          | URL                                                                    |
|------------------|------------------------------------------------------------------------|
| RPC              | [https://mainnet.movementnetwork.xyz/v1](https://mainnet.movementnetwork.xyz/v1)     |
| Bridge           |   Coming Soon       |
| Explorer         | [https://explorer.movementnetwork.xyz/?network=mainnet](https://explorer.movementnetwork.xyz/?network=mainnet) |


## Aptos Devnet Environment

We often test updates on our Suzuka devnet before pushing to testnet, you can deploy your modules and test on our devnet with the details below.

| Service          | URL                                                                    |
|------------------|------------------------------------------------------------------------|
| RPC              | [https://devnet.suzuka.movementnetwork.xyz/v1](https://devnet.suzuka.movementnetwork.xyz/v1)     |
| Faucet endpoint  | [https://faucet.devnet.suzuka.movementnetwork.xyz/](https://faucet.devnet.suzuka.movementnetwork.xyz/)     |
| Explorer         | [https://explorer.suzuka.movementnetwork.xyz/?network=devnet](https://explorer.suzuka.movementnetwork.xyz/?network=devnet) |




## EVM Environment

The MEVM environment is currently accessible through the Imola Devnet. 

| Service          | URL                                                                    |
|------------------|------------------------------------------------------------------------|
| RPC              | [https://mevm.devnet.imola.movementnetwork.xyz ](https://mevm.devnet.imola.movementnetwork.xyz )     |
| Faucet UI        | [https://faucet.movementnetwork.xyz/?network=mevm](https://faucet.movementlabs.xyz/?network=mevm)         |
| Chain ID         | 30732                                                                  |
| Explorer         | [https://explorer.devnet.imola.movementnetwork.xyz](https://explorer.devnet.imola.movementnetwork.xyz)     |
| Indexer          | [https://aptos.devnet.imola.movementlabs.xyz/indexer/v1/graphql](https://aptos.devnet.imola.movementlabs.xyz/indexer/v1/graphql) |
| Subgraph RPC     | [https://mevm2.devnet.imola.movementlabs.xyz/](https://mevm2.devnet.imola.movementlabs.xyz/)     |
| Multicall | [0x5005A743875A50F80C306d3A6cfAC1C000623658](https://explorer.devnet.imola.movementlabs.xyz/#/account/0x0000000000000000000000005005a743875a50f80c306d3a6cfac1c000623658/resources)

Additional Public EVM Endpoints

| Service          | URL                                                                    |
|------------------|------------------------------------------------------------------------|
| RPC              | [https://mevm2.devnet.imola.movementnetwork.xyz ](https://mevm2.devnet.imola.movementnetwork.xyz)     |
| RPC       | [https://mevm4.devnet.imola.movementnetwork.xyz](https://mevm4.devnet.imola.movementnetwork.xyz)         |


:::info

Please note that the Sui Baku Devnet has been deprecated. We will share our roadmap compatibility at a later date

:::



## Network Properties

Here is the reformatted table with everything under "Sui Baku Devnet" removed:

|  | Aptos Suzuka Testnet  | Aptos Suzuka Devnet | MEVEM Imola Devnet  |
| --- | --- | --- | --- |
| Validators  | Movement Labs operated validators  | Permissionless + Movement Labs operated validators.  | NA |
| Full Nodes  | Movement Labs operated nodes  | Permissionless + Movement Labs operated nodes  | Movement Labs operated nodes  |
| Data Durability | Data wipes will be announced ahead of time.  | Data can be wiped as part of the regular software updates. | Data could be wiped. |
| Announcement Channel | [Discord](https://discord.com/channels/1101576619493167217/1259638014184001668)| [Discord](https://discord.com/channels/1101576619493167217/1259638353607917589) | [Discord](https://discord.com/channels/1101576619493167217/1259638433102561348) |
| Network Uptime | Constant uptime. | Expect down time happens.  | Expect down time happens.  |
