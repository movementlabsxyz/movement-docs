---
sidebar_position: 5
---

# Faucets

The easiest way to get Testnet MOVE

:::info

MOVE refers to the native token across our networks. At the moment they are distinct in nature and requires conversion and/or different faucets.

:::

## How to Get Move

If you have an Aptos Compatible wallet the easiest way of getting MOVE is via this faucet UI: https://mizu.testnet.suzuka.movementlabs.xyz/

If you are building with EVM or SUI, the easiest way to get MOVE is via our legacy faucet UI: https://faucet.movementlabs.xyz/

For developers: You can also use our CLI for additional functionalities.

## Faucet API URLS

### Aptos 

Testnetwork 

``https://faucet.testnet.suzuka.movementlabs.xyz/``

```bash

curl -X GET "https://faucet.testnet.suzuka.movementlabs.xyz/mint" \
-H "Content-Type: application/json" \
-d '{"address":"<aptos-address>"}'

```

### MEVM 

Devnet

`https://mevm.devnet.m1.movementlabs.xyz`

```bash

curl -X POST "https://mevm.devnet.m1.movementlabs.xyz" \
-H "Content-Type: application/json" \
-d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_faucet",
  "params": ["<evm-address>"]
}'

```

### Sui

Devnet 

`https://sui.devnet.m2.movementlabs.xyz/faucet`

```bash
curl --location --request POST 'https://sui.devnet.m2.movementlabs.xyz/faucet' \
--header 'Content-Type: application/json' \
--data-raw '{
    "FixedAmountRequest": {
        "recipient": "<sui-address>"
    }
}

```