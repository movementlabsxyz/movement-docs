---
sidebar_position: 2
---

# Faucets

The easiest way to get Testnet MOVE

:::info

MOVE refers to the native token across our networks. At the moment they are distinct in nature and require conversion and/or different faucets.

:::

## How to Get Move

### Aptos 

Faucet UI: https://faucet.movementlabs.xyz/?network=aptos


### EVM

Faucet UI: https://faucet.movementlabs.xyz/?network=mevm



<!-- ## Faucet API URLS

### Aptos 

Suzuka Testnetwork 

``https://faucet.testnet.suzuka.movementlabs.xyz/``

```bash

curl -XPOST 'https://faucet.testnet.suzuka.movementlabs.xyz/mint?amount=10000&address=<address>'

```


### MEVM 

Imola Testnetwork

`https://mevm.devnet.imola.movementlabs.xyz`

```bash

curl -X POST "https://mevm.devnet.imola.movementlabs.xyz" \
-H "Content-Type: application/json" \
-d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_faucet",
  "params": ["<evm-address>"]
}'

```

``` -->