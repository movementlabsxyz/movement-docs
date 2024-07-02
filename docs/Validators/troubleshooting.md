---
sidebar_position: 2
---

# Troubleshooting Testnet

## Cannot Connect to Enough Stake

Occasionally, you may see your node report the error `cannot connect to enough stake`. If this occurs during bootstrapping, it's generally nothing to worry about. Otherwise, it indicates an issue running Avalanche's peer-to-peer protocol. 

:::tip Solution
One or more of the below usually resolves this problem:
1. Ensure your node's IP can be correctly resolved by opendns.
2. Ensure port 9651 is open to public TCP traffic. 
:::

## Client Connection Errors

Occasionally, your node may report client connection errors such as `grpc client connection failed`. These may arise as the network is reorganized.

:::tip Solution
Restart your validator. This will usually successfully reset peer connections.
:::
