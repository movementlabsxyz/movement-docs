---
sidebar_position: 2
---

# Setting up your Movement Environment

The fastest way to start building on Movement is by interacting with our Testnet or Legacy Devnets. 

:::info

Evm and Sui development is currently available on our Legacy Devnet

:::

## Aptos

Movement CLI supports Aptos Move natively. Here are the instructions to install and use Movement CLI:

### Install Movement CLI

1. `git clone https://github.com/movementlabsxyz/aptos-core/ && cd aptos-core`

2. `cargo build -p movement` (generates the `target/debug/movement` executable)

3. Copy `movement` into your `bin` or add it to your `PATH` depending on your system config. 

For example, to copy `movement` to `bin` on Mac or Linux:

```
sudo cp target/debug/movement /usr/local/bin/
```

### Use Movement CLI

Movement CLI commands are analogous to those of Aptos CLI. Simply replace `aptos` with `movement`.

So `aptos move build` becomes `movement move build`.

For help within the CLI tool:

```
movement --help
```

or 

```
movement <subcommand> --help
```

Developers who would like to contribute or read the source code, please see [the Movement CLI crate](https://github.com/movementlabsxyz/aptos-core/tree/movement/crates/aptos).

## MEVM

If you're building with Solidity check out our section for [Ethereum Developers](/)

## Sui

If you're building with Sui Move check out our section for [Sui Developers](/)


## Faucet 

Refer to our documentation on [Faucets](/Introduction/faucet) to get started building with testnet tokens.

## Learning Move 

If you are new to Movement, head to [Learning Resources](/), [Hack Movement](/), a crash course on developing for Movement, or [Move Language](https://aptos.dev/en/build/smart-contracts/book) to learn about the basics.

## Tutorials

We have a few [tutorials](/category/tutorials) available for you to try things out! Head to Tutorials and start hacking.

## Running a Local Network 

Install the Movement CLI and run the following command:

```bash
movement ctl start m1 localnet
```
