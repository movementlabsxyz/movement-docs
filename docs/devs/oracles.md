---
sidebar_position: 5
---

# Oracles

## MEVM

This document explains how to use real-time Pyth data in EVM contracts on the Movement testnet. For an interactive playground to explore the methods supported by the Pyth contract, see the [EVM API reference](https://docs.pyth.network/evm).

## Pyth Deployment on Movement Testnet

The Pyth deployment address on the Movement testnet is: `0xA2aa501b19aff244D90cc15a4Cf739D2725B5729`

## Install Pyth SDK

Pyth provides a Solidity SDK to fetch prices from Pyth contracts. The SDK exposes the `IPyth` interface to interact with Pyth price feeds.

### Truffle/Hardhat

If you are using Truffle or Hardhat, simply install the NPM package:

```sh
npm install @pythnetwork/pyth-sdk-solidity
```

### Foundry

If you are using Foundry, you will need to create an NPM project if you don't already have one. From the root directory of your project, run:

```sh
npm init -y
npm install @pythnetwork/pyth-sdk-solidity
```

Then add the following line to your `remappings.txt` file:

```txt
@pythnetwork/pyth-sdk-solidity/=node_modules/@pythnetwork/pyth-sdk-solidity
```

## Write Contract Code

The code snippet below provides a general template for what your contract code should look like:

```solidity
pragma solidity ^0.8.0;

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract PythExample {
    IPyth public pyth;

    /**
     * @param pythContract The address of the Pyth contract on the Movement testnet
     */
    constructor(address pythContract) {
        // The IPyth interface from pyth-sdk-solidity provides the methods to interact with the Pyth contract.
        // Instantiate it with the Pyth contract address.
        pyth = IPyth(pythContract);
    }

    /**
     * This method is an example of how to interact with the Pyth contract.
     * Fetch the priceUpdate and pass it to the Pyth contract to update the prices.
     * Add the priceUpdate argument to any method on your contract that needs to read the Pyth price.
     * See https://docs.pyth.network/price-feeds/fetch-price-updates for more information on how to fetch the priceUpdate.
     *
     * @param priceUpdate The encoded data to update the contract with the latest price
     */
    function updatePriceAndFetch(bytes[] calldata priceUpdate) public payable {
        // Submit a priceUpdate to the Pyth contract to update the on-chain price.
        // Updating the price requires paying the fee returned by getUpdateFee.
        // WARNING: These lines are required to ensure the getPrice call below succeeds. If you remove them, transactions may fail with "0x19abf40e" error.
        uint fee = pyth.getUpdateFee(priceUpdate);
        pyth.updatePriceFeeds{ value: fee }(priceUpdate);

        // Read the current price from a price feed.
        // Each price feed (e.g., ETH/USD) is identified by a price feed ID.
        // The complete list of feed IDs is available at https://pyth.network/developers/price-feed-ids
        bytes32 priceFeedId = 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace; // ETH/USD
        PythStructs.Price memory price = pyth.getPrice(priceFeedId);
        
        // Use the price as needed in your contract
        // Example: emit an event with the price
        emit PriceUpdated(price.price, price.conf);
    }

    // Event to emit the updated price
    event PriceUpdated(int64 price, uint64 conf);
}
```

### Instructions to Use

1. **Install the Pyth SDK**:
    - For Truffle/Hardhat:
      ```sh
      npm install @pythnetwork/pyth-sdk-solidity
      ```
    - For Foundry:
      ```sh
      npm init -y
      npm install @pythnetwork/pyth-sdk-solidity
      ```
      Add to `remappings.txt`:
      ```txt
      @pythnetwork/pyth-sdk-solidity/=node_modules/@pythnetwork/pyth-sdk-solidity
      ```

2. **Deploy the Contract**:
    - Ensure you pass the Pyth contract address on the Movement testnet (`0xA2aa501b19aff244D90cc15a4Cf739D2725B5729`) to the constructor when deploying.

3. **Fetch and Update Prices**:
    - Use the `updatePriceAndFetch` function to submit a price update and read the latest price from the Pyth contract.

This snippet includes the instantiation of the `IPyth` interface, updates the price feeds, and fetches the current price for a given price feed ID. You can customize the `updatePriceAndFetch` function as needed for your application.

## Aptos & Sui Move


The Pyth smart contract is deployed on both Aptos and Sui Move on the Movement chain on these addresses:

| Named Address | Testnet Value                                                                                                  | Devnet Value                                                                                                  |
|---------------|----------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| pyth          | 0x9357e76fe965c9956a76181ee49f66d51b7f9c3800182a944ed96be86301e49f                                              | 0x9357e76fe965c9956a76181ee49f66d51b7f9c3800182a944ed96be86301e49f                                              |
| wormhole      | 0x9236893d6444b208b7e0b3e8d4be4ace90b6d17817ab7d1584e46a33ef5c50c9                                              | 0x9236893d6444b208b7e0b3e8d4be4ace90b6d17817ab7d1584e46a33ef5c50c9                                              |
| deployer      | 0xa3ad2d9c8114b9a4fe97d45b7a9d3c731148d936b0f5dd396fc20a53a11a70da                                              | 0xa3ad2d9c8114b9a4fe97d45b7a9d3c731148d936b0f5dd396fc20a53a11a70da                                              |