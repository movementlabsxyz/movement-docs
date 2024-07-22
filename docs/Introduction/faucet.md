---
sidebar_position: 5
---

# Faucets

The easiest way to get Testnet MOVE

:::info

MOVE refers to the native token across our networks. At the moment they are distinct in nature and requires conversion and/or different faucets.

:::

## How to Get Move

### Aptos 

Faucet UI: https://mizu.testnet.suzuka.movementlabs.xyz/


### EVM

Faucet UI: https://faucet.testnet.imola.movementlabs.xyz/

### Sui

Legacy UI: https://faucet.movementlabs.xyz/


For developers: You can also use our CLI for additional functionalities.

## Faucet API URLS

### Aptos 

Suzuka Testnetwork 

``https://faucet.testnet.suzuka.movementlabs.xyz/``

```bash

curl -XPOST 'https://faucet.testnet.suzuka.movementlabs.xyz/mint?amount=10000&address=<address>'

```


### MEVM 

Imola Testnetwork

`https://mevm.testnet.imola.movementlabs.xyz`

```bash

curl -X POST "https://mevm.testnet.imola.movementlabs.xyz" \
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