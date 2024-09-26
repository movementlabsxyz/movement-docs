---
sidebar_position: 2
title: Hardhat and Fractal
---

# Deploying Solidity Contracts on Movement using Hardhat and Fractal

This tutorial will walk you through deploying a Solidity smart contract on Movement and Hardhat.

## Our toolkit

### What is Hardhat?

Hardhat is a powerful Javascript smart contract development toolchain for Ethereum Virtual Machines.

### What is Fractal?

Fractal is Movement Labs' transpiler that allows any developer to deploy any Solidity smart contract on M1 a Move language based Virtual Machine, effectively turning Solidity code into Move code, inheriting all of the security properties natively available to Move smart contracts.

## Prerequisites

Before you begin this tutorial, you'll need to install [Hardhat](https://hardhat.org/hardhat-runner/docs/getting-started#installation)

## Fund your wallet with MOVE tokens

Fund an EVM wallet address with some MOVE tokens using our [faucet](https://docs.movementnetwork.xyz/general/UsingMovement/faucet). Another method to get MOVE is to bridge from M1 to your EVM wallet using our [bridge](https://evm-bridge.devnet.m1.movementlabs.xyz/#/Faucet). To connect to our testnet and check if you have received the MOVE tokens, you can take the following steps:

1. Add the move-evm network to your EVM-compatible wallet.

| Property          | Value                                             |
|-------------------|---------------------------------------------------|
| Network Name      | mevm                                              |
| Network RPC       | [https://mevm.devnet.imola.movementlabs.xyz](https://mevm.devnet.imola.movementlabs.xyz) |
| Network ID        | 30732                                               |
| Network Currency  | MOVE                                              |

2. Ensure you have switched your Wallet network to the network added above, i.e., move-evm.

## Setup your Hardhat Project

Create your project directory:

```bash
mkdir hardhat-move-evm
```

And access it 

```bash
cd hardhat-move-evm
```

Initiate your Hardhat project:

```bash
npx hardhat init
```

Go through the steps and choose your preferences. Here we will be going through the defaults and choosing a javascript project. We named the project hardhat-move-evm.

If you have not accepted the dependency installation, please do so. If you are doing a custom installation, make sure you are using the correct dependencies:

```bash
npm install --save-dev "hardhat@^2.19.0" "@nomicfoundation/hardhat-toolbox@^3.0.0"
```

Make sure to also install dotenv:

```bash
npm install dotenv
```

Open the project in your favorite editor. Here we are using VSCode

```bash
code .
```

Create an .env file

```bash
touch .env
```

Add your private key to the .env file. You can obtain your private key from your EVM wallet that you funded with MOVE. For example, if you are using MetaMask, you can find your private key by clicking the three vertical dots next to the account you want to export. Account details > Show private key > Enter your password > Confirm > Hold to reveal Private Key. Make sure to keep your private key safe and never share it with anyone.

`PRIVATE_KEY=<your private key>`

On the root folder you will be able to find hardhat.config.js. This is the configuration file for hardhat. Add M1 network configurations by replacing its contents with the following:

```js
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  defaultNetwork: "m1",
  networks: {
    hardhat: {
    },
    m1: {
      url: "https://mevm.devnet.imola.movementlabs.xyz",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 30732
    }
  },
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
}
```

## Write your Solidity Smart Contract

Here we we will be introducing minimal changes to our contracts to make your life easier. There is nothing intrinsic here that is specific to our devnet. You can write your contracts as you would normally do.

Under `contracts/` open the file `Lock.sol`. This is the Smart Contract that you will be deploying to M1. You can replace the contents of this file with your own contract.

```js
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract Lock {
    uint public unlockTime;
    address payable public owner;
    event Withdrawal(uint amount, uint when);
    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );
        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }
    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");
        emit Withdrawal(address(this).balance, block.timestamp);
        owner.transfer(address(this).balance);
    }
}
```

You have a state variable `unlockTime` and one function, withdraw to withdraw the funds from the contract.

Now, under scripts, open the file `deploy.js`. This is a simple script that we will use to deploy our contract on M1. You can replace the contents of this file with your own script.

```js
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = hre.ethers.parseEther("0.001");

  const lock = await hre.ethers.deployContract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  await lock.waitForDeployment();

  console.log(
    `Lock with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

This will deploy the contract available at contracts/Lock.sol. You can tinker with it and change its logic, feel free to try things out!

## Deploy your Solidity Smart Contract 

To deploy your contract, run the following command:

```bash
npx hardhat run scripts/deploy.js --network m1
```

After running it, you should see a similar message in your console:

```
Lock with 0.001ETH and unlock timestamp <currentTimestamp> deployed to <lockAddress>
```

Success! You have successfully deployed your contract using Hardhat. You should now be able to interact with the contract provided by the message above.

## Interact with your Solidity Smart Contract

Now that you have your contract, you can also interact with it using Hardhat. To do so, we will write another script. Under script, create a new file `withdraw.js` and add the following contents:

```js

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    const lockAddress = "<lockAddress>";
    console.log(`Lock address: ${lockAddress}`)
    const [deployer] = await hre.ethers.getSigners();
    console.log(`Deployer address: ${deployer.address}`);
    const lockedAmount = await hre.ethers.provider.getBalance(lockAddress);
    const currentBalance = await hre.ethers.provider.getBalance(deployer.address);
    console.log(
        `Current balance of ${deployer.address} is ${hre.ethers.formatEther(currentBalance)}ETH`
    );
    const lock = await hre.ethers.getContractAt("Lock", lockAddress);

    const tx = await lock.withdraw();
    await tx.wait();

    console.log(
        `Withdrawn ${hre.ethers.formatEther(lockedAmount)}ETH from ${lockAddress} to ${deployer.address}`
    );

    const posBalance = await hre.ethers.provider.getBalance(deployer.address);

    console.log(
        `Balance after withdrawal of ${deployer.address} is ${hre.ethers.formatEther(posBalance)}ETH`
    );
    console.log(`sum of previous balance and withdrawn value: ${currentBalance + lockedAmount}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
```

:::warning


Make sure to replace `<lockAddress>` with the address of your deployed contract. You can find it in the message printed in your console after deploying your contract.

:::

Now, all you have to do is run the following command:

```bash
npx hardhat run scripts/withdraw.js --network m1
```

If you are succesful, you should see the following message:

```
Balance after withdrawal of <yourAddress> is <xValue> ETH
sum of previous balance and withdrawn value: <xValue>
```

That's it! If you are used to deploying contract to EVM networks, this should feel like being at home. If you are not, we hope this tutorial was helpful and that you are now ready to work on your contract and deploy your own contracts and continue building on our devnet.

Feel free to reach out to us on Discord if you have any issues, questions or feedback. We would love to hear from you!
