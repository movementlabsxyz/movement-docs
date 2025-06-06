---
sidebar_position: 4
---

# Bridge

## Canonical Bridging via Layer Zero

The Movement Network Bridge, powered by [LayerZero](https://www.layerzero.network/), is a bridge that allows users to bridge tokens between the Movement Network and other chains, initially supporting transfers from Ethereum to Movement Network. 

Note: The Movement Network Bridge is currently in beta and only supports transfers from Ethereum to Movement Network for Move. Other assets can be bridged in both directions.

Learn more about Layer Zero OFT(Omnichain Fungible Tokens) and how this is implemented using Aptos Move [here](https://docs.layerzero.network/v2/developers/aptos-move/contract-modules/oft).

Note: OFTs do not currently support the Coin standard and as such all OFTs are minted as Fungible Asset Standard. 

## Bridge Interface

The Bridge Interface is a web application that allows users to bridge tokens between the Movement Network and other chains.

To start bridging, navigate to the [Bridge Interface](https://bridge.movementnetwork.xyz/) and connect your wallet.

## Asset Transfer

We are launching with support for the following assets:

- Move Token
    - Daily Bridge Limit: 
        - 75M tokens can be bridged to Movement on Day 1
        - 25m tokens can be bridged to Movement per day thereafter
    - No withdrawals from Movement back to Ethereum for Move Token at launch
- USDC/USDT/ETH
    - 3 Day waiting period for withdrawals when briding from Movement to Ethereum
- Other Assets
    - 3 Day waiting period for withdrawals when briding from Movement to Ethereum

## Mainnet Addresses

The mainnet Bridge currently allows for bridging between Ethereum Mainnet and Movement Mainnet.

:::info

Note that the Move Token listed below is not an OFT but is an FA token that is used to pay for gas on the Movement Network. On the Movement Network both Coin and FA move can be used to initialize accounts and pay for gas.

:::



### Adaptor Addresses on Ethereum Mainnet

| Adaptor | Address |
|---------|---------|
| MOVE OFT Adapter | `0xf1df43a3053cd18e477233b59a25fc483c2cbe0f` |
| USDC OFT Adapter | `0xc209a627a7B0a19F16A963D9f7281667A2d9eFf2` |
| USDT OFT Adapter | `0x5e87D7e75B272fb7150B4d1a05afb6Bd71474950` |
| WETH OFT Adapter | `0x06E01cB086fea9C644a2C105A9F20cfC21A526e8` |
| WBTC OFT Adapter | `0xa55688C280E725704CFe8Ea30eD33fE5B91cE6a4` |

### Ethereum Token Addresses

| Token | Address |
|-------|---------|
| MOVE | `0x3073f7aAA4DB83f95e9FFf17424F71D4751a3073` |
| USDC | `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` |
| USDT | `0xdac17f958d2ee523a2206206994597c13d831ec7` |
| WETH | `0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2` |
| WBTC | `0x2260fac5e5542a773aa44fbcfedf7c193bc2c599` |


### Movement OFT Contract Addresses

| Token | Address |
|-------|---------|
| MOVE | `0x7e4fd97ef92302eea9b10f74be1d96fb1f1511cf7ed28867b0144ca89c6ebc3c` |
| USDC.e | `0x4d2969d384e440db9f1a51391cfc261d1ec08ee1bdf7b9711a6c05d485a4110a` |
| USDT.e | `0x38cdb3f0afabee56a3393793940d28214cba1f5781e13d5db18fa7079f60ab55` |
| WETH.e | `0x3dfe1ac4574c7dbbe6f1c5ba862de88fc3e7d3cf8eba95ef1abf32b582889e6d` |
| WBTC.e | `0xbdf86868a32dbae96f2cd50ab05b4be43b92e84e793a4fc01b5b460cc38fdc14` |

### Movement MOVE Escrow Address:

`0x42afc6935b692cd286e3087a4464ec516a60dd21c9e355e1b8b0088376501372`

### Movement OFT / FA Addresses

| Token | Address |
|-------|---------|
| MOVE   | `0xa` |
| USDC.e | `0x83121c9f9b0527d1f056e21a950d6bf3b9e9e2e8353d0e95ccea726713cbea39` |
| USDT.e | `0x447721a30109c662dde9c73a0c2c9c9c459fb5e5a9c92f03c50fa69737f5d08d` |
| WETH.e | `0x908828f4fb0213d4034c3ded1630bbd904e8a3a6bf3c63270887f0b06653a376` |
| WBTC.e | `0xb06f29f24dde9c6daeec1f930f14a441a8d6c0fbea590725e88b340af3e1939c` |


## Testnet Addresses

The testnet Bridge currently allows for bridging between Binance Smart Chain Testnet and Movement Bardock Testnet.


### Mock Token Addresses on BSC Testnet

| Token | Address |
|-------|---------|
| tUsdc | `0x3D40fF7Ff9D5B01Cb5413e7E5C18Aa104A6506a5` |
| tUsdt | `0xC1c94Dde81053612aC602ba39b6AfBd3CfE6a8Bc` |
| tWeth | `0x50e288885258bC62da02d7Bd1e37d5c7B27F814F` |

### Bardock OFT Addresses

| Token | Address |
|-------|---------|
| USDC.e | `0x33987308d6698c3def1f155c8ea394360e9756b0a22e64fb20834327f04a1e42` |
| USDT.e | `0x9cda672762a6f88e4b608428dd063e03aaf6712f0a427923dd0f1416afa1c075` |
| WETH.e | `0x2fa1f2914aa17d239410cb81ab46dd8fa9230272c58bc84e9e8b971eded79ca5` |
