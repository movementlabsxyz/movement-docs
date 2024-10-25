---
sidebar_position: 1
---

# Introduction

Movement Labs is building a network of Move-based blockchains. Our flagship products are the Movement Network and the M1 shared sequencer. 

> ⚠️ This documentation provides a high level intro to the vision. The [white paper](https://www.movementnetwork.xyz/whitepaper/movement-whitepaper_en.pdf) goes into more details on some of the presented solutions.

Movement is a community-first blockchain providing the highest possible TPS through Move, instant finality, native day-zero access to mass liquidity, and modular customizations.

It will support Aptos Move, Sui Move, and also our embedded EVM interpreter MEVM—empowering both Sui, Aptos, and EVM users to use the L2.

## Why Move?

Move is a safe and secure programming language designed by Facebook for smart contracts that emphasize ownership and safety. Assets in Move are represented as resources. Owing to Move's strong ownership model and explicit resource abilities, Move simplifies the development of safe smart contracts for common blockchain tasks such as transferring ownership of assets, minting, and destroying. 

The chart below compares common non-Move runtimes against Aptos and Sui Move runtimes, underscoring the different models and benefits of Move.

|                        | Aptos / Move                                     | Solana / SeaLevel                                   | EVM                                           | Sui / Move                              |
|------------------------|--------------------------------------------------|-----------------------------------------------------|-----------------------------------------------|------------------------------------------|
| **Data storage**       | Stored at a global address or within the owner's account | Stored within the owner's account associated with a program | Stored within the account associated with a smart contract | Stored at a global address              |
| **Parallelization**    | Capable of inferring parallelization at runtime within Aptos | Requires specifying all data accessed               | Currently serial, nothing in production       | Requires specifying all data accessed    |
| **Transaction safety** | Sequence number                                   | Transaction uniqueness                              | Nonces, similar to sequence numbers           | Transaction uniqueness                    |
| **Type safety**        | Module structs and generics                       | Program structs                                     | Contract types                                | Module structs and generics               |
| **Function calling**   | Static dispatch                                   | Static dispatch                                     | Dynamic dispatch                              | Static dispatch                           |
| **Authenticated Storage** | Yes                                          | No                                                  | Yes                                           | No                                        |
| **Object accessibility** | Guaranteed to be globally accessible            | Not applicable                                      | Not applicable                                | Can be hidden                             |


