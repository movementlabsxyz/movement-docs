---
sidebar_position: 4
---

# Bridge

## Canonical Bridging via Layer Zero

The Movement Network Bridge, powered by [LayerZero](https://www.layerzero.network/), is a bridge that allows users to bridge tokens between the Movement Network and other chains, initially supporting transfers from Ethereum to Movement Network. 

Note: The Movement Network Bridge is currently in beta and only supports transfers from Ethereum to Movement Network for Move. Other assets can be bridged in both directions.

Learn more about Layer Zero OFT(Omnichain Fungible Tokens) and how this is implemented using Aptos Move [here](https://docs.layerzero.network/v2/developers/aptos-move/contract-modules/oft).

Note: OFT's do not currently support the COIN standard and as such all OFT's are minted as Fungible Asset Standard. 

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

## Testnet Addresses

The testnet Bridge currently allows for bridging between Binance Smart Chain Testnet and Movement Bardock Testnet.

### Bridge Contract Addresses

| Network | Address |
|---------|---------|
| BSC Testnet | `0xbA1BBC0E25b5Fd3e4D991a14C0fc99E13401e05E` |
| Bardock Testnet | `0x9fca138cfc073f0735dab0ad0b99e3bed844ac70ed36ea7636a0addfa5d56236` |

### Adaptor Addresses on Binance Smart Chain Testnet

| Adaptor | Address |
|---------|---------|
| USDCOFTAdapter | `0x9078C798192C04d473F259A86aC97d6d9D5863Ba` |
| USDTOFTAdapter | `0xf9F7D5D9eD90B4706111653D75B187DF3283eE29` |
| WETHOFTAdapter | `0x2E067e69598cfd2c110bC1A61a8e121f36e464Bf` |

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