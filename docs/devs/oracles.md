---
sidebar_position: 6
---

# Oracles

This document explains how to use real-time data from [Pyth Network](https://www.pyth.network/) in modules on the Movement Bardock testnet.

## Configuring the Move.toml file

Add the Pyth Contract to your project dependencies in the Move.toml file like so:

```
[dependencies]
Pyth = { git = "https://github.com/pyth-network/pyth-crosschain.git", subdir = "target_chains/aptos/contracts", rev = "main" }
```

The named addresses of `pyth`, `wormhole`, and `deployer` must be defined at compile time. These addresses are used to interact with the Pyth contract on Movement.

The Pyth smart contracts are deployed on the Movement Network on the following addresses:

| Name     | Address                                                            |
|----------|--------------------------------------------------------------------|
| pyth     | 0x9357e76fe965c9956a76181ee49f66d51b7f9c3800182a944ed96be86301e49f |
| wormhole | 0x9236893d6444b208b7e0b3e8d4be4ace90b6d17817ab7d1584e46a33ef5c50c9 |
| deployer | 0xa3ad2d9c8114b9a4fe97d45b7a9d3c731148d936b0f5dd396fc20a53a11a70da |


## Example Code

The code snippet below provides an example module fetching the BTC/USD price from Pyth price feeds:

```rust
module example::example {
    use pyth::pyth;
    use pyth::price::Price;
    use pyth::price_identifier;
    use aptos_framework::coin;
 
    // Add the pyth_price_update argument to any method on your contract that needs to read the Pyth price.
    // See https://docs.pyth.network/price-feeds/fetch-price-updates for more information on how to fetch the pyth_price_update.
    public fun get_btc_usd_price(user: &signer, pyth_price_update: vector<vector<u8>>): Price {
 
        // First update the Pyth price feeds
        let coins = coin::withdraw(user, pyth::get_update_fee(&pyth_price_update));
        pyth::update_price_feeds(pyth_price_update, coins);
 
        // Read the current price from a price feed.
        // Each price feed (e.g., BTC/USD) is identified by a price feed ID.
        // The complete list of feed IDs is available at https://pyth.network/developers/price-feed-ids
        // Note: Aptos uses the Pyth price feed ID without the `0x` prefix.
        let btc_price_identifier = x"e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43";
        let btc_usd_price_id = price_identifier::from_byte_vec(btc_price_identifier);
        pyth::get_price(btc_usd_price_id)
    }
}
```
 
 The code snippet above does the following:

1. Call `pyth::get_update_fee` to get the fee required to update the Pyth price feeds.
2. Call `pyth::update_price_feeds` and pass pyth_price_update to update the Pyth price feeds.
3. Call `pyth::get_price to read` the current price, providing the price feed ID you wish to read.


## API Reference

The [Aptos API reference](https://docs.pyth.network/price-feeds/api-reference/aptos) (Which is also compatible with Movement) lets you interactively explore the complete API of the Pyth contract.


## Example Applications

[Minimal on-chain contract](https://github.com/pyth-network/pyth-examples/blob/main/price_feeds/aptos/fetch_btc_price/sources/example.move), which updates and returns the BTC/USD price from Pyth price feeds.

[Mint NFT](https://github.com/pyth-network/pyth-examples/tree/main/price_feeds/aptos/mint_nft), which uses Pyth price feeds to mint an NFT.