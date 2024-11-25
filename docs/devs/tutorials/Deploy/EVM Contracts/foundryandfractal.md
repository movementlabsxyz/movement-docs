---
sidebar_position: 1
title: Foundry and Fractal
---

# Deploying Solidity Contracts on Movement using Foundry and Fractal

This tutorial will walk you through deploying a Solidity smart contract on M1 using Fractal and Foundry.

## Our toolkit

### What is Foundry?

Foundry is a powerful Solidity smart contract development toolchain for Ethereum Virtual Machines.

### What is Fractal?

Fractal is Movement Labs' interpreter that allows any developer to deploy any Solidity smart contract on M1 a [Move language](https://move-language.github.io/move/) based Virtual Machine, effectively turning Solidity code into Move code, inheriting all the security properties natively available to Move smart contracts.

## Prerequisites 

Before you begin this tutorial, you'll need to [Install Foundry](https://book.getfoundry.sh/getting-started/installation)


## Fund your wallet with MOVE tokens

Fund an EVM wallet address with some MOVE tokens using our [faucet](/general/UsingMovement/faucet). Another method to get MOVE is to bridge from M1 to your EVM wallet using our [bridge](https://evm-bridge.devnet.m1.movementlabs.xyz/#/Faucet). To connect to our testnet and check if you have received the MOVE tokens, you can take the following steps:

1. Add the move-evm network to your EVM-compatible wallet.

| Property          | Value                                             |
|-------------------|---------------------------------------------------|
| Network Name      | mevm                                              |
| Network RPC       | [https://mevm.devnet.imola.movementlabs.xyz](https://mevm.devnet.imola.movementlabs.xyz) |
| Network ID        | 30732                                               |
| Network Currency  | MOVE                                              |

2. Ensure you have switched your Wallet network to the network added above, i.e., move-evm.

## Setup your Foundry project

If you don't have a specific directory for your project, create one and access it:

```bash
mkdir foundry-move-evm
```

```
cd foundry-move-evm
```

Open it in your favorite editor. Here we are using VSCode

```bash
code .
```

Initiate your Foundry project. This will create a foundry.toml, a README.md and a few folders, lib, script, src and test.

```
forge init
```

Create an .env file 

```bash
touch .env
```

Add your private key to the .env file. You can obtain your private key from your EVM wallet that you funded with MOVE. For example, if you are using MetaMask, you can find your private key by clicking the three vertical dots next to the account you want to export. Account details > Show private key > Enter your password > Confirm > Hold to reveal Private Key. Make sure to keep your private key safe and never share it with anyone.

`PRIVATE_KEY=<your private key>`

## Write your Solidity contract

Here we we will be introducing minimal changes to our contracts to make your life easier. There is nothing intrinsic here that is specific to our devnet. You can write your contracts as you would normally do.

Under `src/` open the file `Counter.sol`. This is the Smart Contract that you will be deploying to M1. You can replace the contents of this file with your own contract.

```js
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
contract Counter {
    uint256 public number;
    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }
    function increment() public {
        number++;
    }
}
```

You have a state variable number and two functions, setNumber and increment to set the value of number and increment it respectively.

Now, under script, open the file `Counter.s.sol`. This is a simple script that we will use to deploy our contract on M1. You can replace the contents of this file with your own script.

```js
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {Script} from "forge-std/Script.sol";
import {Counter} from "../src/Counter.sol";
contract CounterScript is Script {
    Counter public counter;
    uint256 public deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    function run() public {
        vm.startBroadcast(deployerPrivateKey);
        counter = new Counter();
        vm.stopBroadcast();
    }
}
```

This will deploy the contract available at src/Counter.sol. You can tinker with it and change its logic, feel free to try things out!

## Deploy your Solidity contract

To deploy your contract, run the following command:

```bash
forge script CounterScript --broadcast --chain-id 30732 --rpc-url https://mevm.devnet.imola.movementlabs.xyz --legacy
```

After running it, you should see a similar message in your console:

```
## Setting up (1) EVMs.

(...)

##### move-evm
✅  [Success]Hash: <transactionHash>
Contract Address: <contractAddress>
Block: 27547820
Paid: 0.002988132 ETH (106719 gas * 28 gwei)


Transactions saved to: /home/user/test/broadcast/Counter.s.sol/30732/run-latest.json

Sensitive values saved to: /home/user/test/cache/Counter.s.sol/30732/run-latest.json



==========================

ONCHAIN EXECUTION COMPLETE & SUCCESSFUL.
Total Paid: 0.002988132 ETH (106719 gas * avg 28 gwei)

Transactions saved to: /home/user/test/broadcast/Counter.s.sol/30732/run-latest.json

Sensitive values saved to: /home/user/test/cache/Counter.s.sol/30732/run-latest.json
```

Success! You have successfully deployed your contract using Foundry. You should now be able to interact with the contract provided by the message above.

## Interact with your Solidity contract

Now that you have your contract, you can also interact with it using Foundry. To do so, we will write another script. Under script, create a new file Interact.s.sol and add the following contents:

```js

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {Script} from "forge-std/Script.sol";
import {Counter} from "../src/Counter.sol";
import "forge-std/console.sol";
contract InteractScript is Script {
    Counter public counter;
    uint256 public deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    function run() public {
        vm.startBroadcast(deployerPrivateKey);
        counter = Counter(<counterAddress>);
        counter.setNumber(1);
        console.log("Number is now: ", counter.number());
        counter.increment();
        console.log("Number was incremented to: ", counter.number());
        vm.stopBroadcast();
    }
}

```

:::warning

Make sure to replace `<counterAddress>` with the address of your deployed contract. You can find it in the message printed in your console after deploying your contract.

:::

Now, all you have to do is run the following command:

```bash
forge script InteractScript --broadcast --chain-id 30732 --rpc-url https://mevm.devnet.imola.movementlabs.xyz
```

If you are successful, you should see the following message: 

```
(...)

Compiler run successful!
Script ran successfully.

== Logs ==
  Number is now:  1
  Number was incremented to:  2

(...)
```

That's it! If you are used to deploying contract to EVM networks, this should feel like being at home. If you are not, we hope this tutorial was helpful and that you are now ready to work on your contract and deploy your own contracts and continue building on our devnet.

Feel free to reach out to us on Discord if you have any issues, questions or feedback. We would love to hear from you!
