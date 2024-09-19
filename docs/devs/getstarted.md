---
sidebar_position: 1
---
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem';
import InstallIcon from '../assets/terminal.svg'
import KeyboardIcon from '../assets/keyboard.svg'
import DeskIcon from '../assets/desk.svg'
import Title from '@site/src/components/Title'
import Divider from '@site/src/components/Divider'
import CodeBlock from '@site/src/components/CodeBlock'
import Cards from "@site/src/components/Cards"
import Card from "@site/src/components/Card"

# Getting Started

Welcome to the Movement Network! This guide will help you start building on our blockchain quickly and efficiently. Whether you're a developer familiar with Aptos, EVM (Ethereum Virtual Machine), or Sui ecosystems, we've got you covered.

## Choose Your Environment
:::info
+ The Movement Network currently supports three development environments
+ Select the environment that aligns with your preferred programming language or ecosystem.
:::

<Tabs>
<!-- START:>>> Aptos Environment >>> -->
    <TabItem value="aptos" label="Aptos Environment (Suzuka Testnet)" default>
       <Title icon={<InstallIcon />} textSize="2xl"> Install the Aptos CLI</Title>
       <Divider />
       <Tabs queryString="current-os">
<!-- START:>>> MacOs >>> -->
            <TabItem value="macos" label="MacOs">
            <Title>Option 1: Install Movement CLI via build from source (Linux/MacOS)</Title>
                :::info
                - Prerequisites:
                    - Install [Rust Programming Language](https://www.rust-lang.org/tools/install)
                    - [Git](https://git-scm.com/downloads)
                    - [Cmake](https://cmake.org/download/)
                    - [LLVM](https://releases.llvm.org/)
                    - [libssl-dev](https://packages.ubuntu.com/jammy/libssl-dev) and [libclang-dev](https://packages.ubuntu.com/jammy/libclang-dev)
                :::
            - Step 1: Clone the Aptos-core repo & go into the newly created directory
              ```bash title="Terminal"
              git clone https://github.com/movementlabsxyz/aptos-core.git && cd aptos-core
              ```
            <details>
                <summary>Install all prerequites using automatic script</summary>
                - Step 1: Using the Automatic Script to install prerequisites:
                  ```bash title="Terminal"
                  ./scripts/dev_setup.sh
                  ```
                - Step 2: Update your current shell environment:
                  ```bash title="Terminal"
                  source ~/.cargo/env
                  ```
                - Step 3: Ensure you have `cargo` installed by following this commands:
                  ```bash title="Terminal"
                  cargo --version
                  ```
            </details>
            - Step 2: Build the Aptos CLI tool:
              ```bash title="Terminal"
              cargo build -p movement
              ```
              > The binary will be available at `target/debug/movement`
            - Step 3: Move this executable to a place in your path
              ```
              sudo cp target/debug/movement /opt/homebrew/bin/
              ```
            <Title>Option 2: Install CLI via homebrew (Linux/MacOS)</Title>
            - Ensure you have `homebrew` installed
            - If not, you need to install through [Homebrew](https://brew.sh) or you can install it on terminal:
            ```bash title="Install Homebrew"
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
            ```
            - Following commands
            ```bash title="Update Packages"
            brew update && brew upgrade -y
            ```
            - Install Aptos CLI
            ```bash title="Install Aptos CLI" showLineNumbers
            brew install aptos
            aptos --help
            ```
            </TabItem>
<!-- END:<<< MacOs <<< -->
<!-- START:>>> Linux >>> -->
   <!-- START:>>> Linux Option 1 - Install CLI >>> -->
            <TabItem value="linux" label="Linux">
            :::warning
            Note: If you are using an ARM architecture, you will have to install using the steps here:
            :::
            <Title>Option 1: Install Movement CLI via build from source (Linux/MacOS)</Title>

                :::info
                - Prerequisites:
                    - Install [Rust Programming Language](https://www.rust-lang.org/tools/install)
                    - [Git](https://git-scm.com/downloads)
                    - [Cmake](https://cmake.org/download/)
                    - [LLVM](https://releases.llvm.org/)
                    - [libssl-dev](https://packages.ubuntu.com/jammy/libssl-dev) and [libclang-dev](https://packages.ubuntu.com/jammy/libclang-dev)
                :::
            - Step 1: Clone the Aptos-core repo & go into the newly created directory
              ```bash title="Terminal"
              git clone https://github.com/movementlabsxyz/aptos-core.git && cd aptos-core
              ```
            <details>
                <summary>Install all prerequites using automatic script</summary>
                - Step 1: Using the Automatic Script to install prerequisites:
                  ```bash title="Terminal"
                  ./scripts/dev_setup.sh
                  ```
                - Step 2: Update your current shell environment:
                  ```bash title="Terminal"
                  source ~/.cargo/env
                  ```
                - Step 3: Ensure you have `cargo` installed by following this commands:
                  ```bash title="Terminal"
                  cargo --version
                  ```
            </details>
            - Step 2: Build the Aptos CLI tool:
              ```bash title="Terminal"
              cargo build -p movement
              ```
              > The binary will be available at `target/debug/movement`
            - Step 3: Move this executable to a place in your path
              ```
              sudo cp target/cli/aptos /usr/local/bin
              ```
   <!-- END:<<< Linux Option 1 - Install CLI <<< -->
---
   <!-- START:>>> Linux Option 2 - Install CLI >>> -->
            <Title>Option 2: Install via Python Script</Title>
                For Linux, the easiest way to install the Aptos CLI tool is via Python script.
            - Step 1: Ensure you have Python 3.6+ or install on [python.org](https://python.org)
            - Step 2: Please enter one of the commands from the list below in the terminal to install Aptos CLI: [Option 2](#option-2-install-aptos-cli-via-build-from-source)
              ```bash
              curl -fsSL "https://aptos.dev/scripts/install_cli.py" | python3
              ```
              or install by wget:
              ```bash
              wget -qO- "https://aptos.dev/scripts/install_cli.py" | python3
              ```
            - Step 3: Verify Aptos CLI is installed
              ```bash
              aptos help
              ```
            :::tip
            If you would like to update the Aptos CLI to the latest version, you can run `aptos update`.
            :::
            </TabItem>
   <!-- END:<<< Linux Option 2 - Install CLI <<< -->
   <!-- START:>>> Windows - Install CLI >>> -->
            <TabItem value="windows" label="Windows">
            :::info
            - Prerequisites:
                - Install [Rust Programming Language](https://www.rust-lang.org/tools/install)
                - [Git](https://git-scm.com/downloads)
                - [LLVM](https://releases.llvm.org/)
                - Install [Microsoft Visual Studio Build Tools for Windows](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022)
                - If on Windows ARM, install [Visual Studio](https://visualstudio.microsoft.com/vs/)
                - [Cmake](https://cmake.org/download/)
            :::
            - Step 1: Clone the Aptos-core repo & go into the newly created directory
              ```bash title="Terminal"
              git clone https://github.com/aptos-labs/aptos-core.git && cd aptos-core
              ```

            <details>
                <summary>Install all prerequites using automatic script</summary>
                - Open a Powershell terminal as an administrator.
                  ```bash title="Terminal"
                  PowerShell -ExecutionPolicy Bypass -File ./scripts/windows_dev_setup.ps1
                  ```
                  > Open a new PowerShell terminal after installing all dependencies
            </details>
            - Step 2: Build the Aptos CLI tool:
              ```bash title="Terminal"
              cargo build --package aptos --profile cli
              ```
              > The binary will be available at `target\cli\aptos.exe`
            - Step 3: (Optional) Move this executable to a place in your PATH
            </TabItem>
   <!-- END:<<< Windows - Install CLI <<< -->
<!-- END:<<< Linux <<< -->
       </Tabs>
       <Title icon={<DeskIcon />} textSize="2xl"> Address Network Endpoints</Title>
       <Divider />
       - Obtain the necessary endpoints from our [Network Endpoints](/devs/networkEndpoints.md#aptos-environment) section to connect to the Suzuka Testnet.
       <details>
       <summary>Suzuka Testnet</summary>
       <Title textSize="2xl">Aptos Environment</Title>

The Aptos Environment is currently accessible through the Suzuka Testnet.

| Service          | URL                                                                    |
|------------------|------------------------------------------------------------------------|
| RPC              | [https://aptos.testnet.suzuka.movementlabs.xyz/v1](https://aptos.testnet.suzuka.movementlabs.xyz/v1)     |
| Faucet UI        | [https://faucet.movementlabs.xyz/?network=aptos](https://faucet.movementlabs.xyz/?network=aptos)         |
| Faucet endpoint  | [https://faucet.testnet.suzuka.movementlabs.xyz/](https://faucet.testnet.suzuka.movementlabs.xyz/)     |
| Explorer         | [https://explorer.movementnetwork.xyz/?network=testnet](https://explorer.movementnetwork.xyz/?network=testnet) |

<Title textSize="3xl">Aptos Devnet Environment</Title>

We often test updates on our Suzuka devnet before pushing to testnet, you can deploy your modules and test on our devnet with the details below.

| Service          | URL                                                                    |
|------------------|------------------------------------------------------------------------|
| RPC              | [https://devnet.suzuka.movementnetwork.xyz/v1](https://devnet.suzuka.movementnetwork.xyz/v1)     |
| Faucet endpoint  | [https://faucet.devnet.suzuka.movementnetwork.xyz/](https://faucet.devnet.suzuka.movementnetwork.xyz/)     |
| Explorer         | [https://explorer.suzuka.movementnetwork.xyz/?network=devnet](https://explorer.suzuka.movementnetwork.xyz/?network=devnet) |
       </details>
       <Title icon={<KeyboardIcon />} textSize="2xl"> Learn and Build on Aptos Move</Title>
       > Utilize your favorite Solidity tools to start building and deploying smart contracts [First Your Smart Contract](/devs/firstmove.md)

       <Title> Obtain Testnet Tokens</Title>
       :::info
           Visit our [Aptos Faucets page](https://faucet.movementlabs.xyz/?network=aptos) to request tokens for your chosen environment.
           :::
    </TabItem>
<!--  END:<<< Aptos Environment <<< -->
    <TabItem value="MEVM" label="MEVM Environment (Imola Testnet)">
        <Tabs>
    <!-- START:>>> Foundry - Install >>> -->
            <TabItem value="foundry" label="Foundry and Fractal">
               <Title icon={<InstallIcon />} textSize="2xl">Install the Foundry</Title>
               <Divider />
               ### Option 1: Using Foundryup
               - Foundryup is the official installer for the [Foundry toolchain](https://book.getfoundry.sh/getting-started/installation).
               - To install Foundryup, open your terminal and run the following command:
               ```bash title="Terminal"
               curl -L https://foundry.paradigm.xyz | bash
               ```
               :::note
               If you’re using Windows, you’ll need to install and use Git BASH or WSL as your terminal, since Foundryup currently doesn’t support Powershell or Command Prompt (Cmd).
               :::
               ### Option 2: Building from Source
               :::info
               - Prerequisites
                  - Install [Rust Programming Language](https://www.rust-lang.org/tools/install)
                  - [Git](https://git-scm.com/downloads)
                  - Install [Microsoft Visual Studio Build Tools for Windows](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022)
                  - If on Windows ARM, install [Visual Studio](https://visualstudio.microsoft.com/vs/)
               :::
               - Step 1: Building
                   > You can either use the various flags provided by Foundryup:
                   ```bash title="Terminal"
                   foundryup --branch master
                   foundryup --path path/to/foundry
                   ```

                   Or, you can install via Cargo with the following command: (Recommendation)
                   ```bash title="Terminal"
                   cargo install --git https://github.com/foundry-rs/foundry --profile release --locked forge cast chisel anvil
                   ```
               <details>
                   <summary>Github Actions & Docker (Advanced)</summary>
                   ### CI Installation with GitHub Actions
                     > For instructions on setting up Foundry in a CI pipeline, refer to the foundry-rs/foundry-toolchain [GitHub Action](https://github.com/foundry-rs/foundry-toolchain).
                   ### Using Foundry with Docker
                     > Foundry can also be run inside a Docker container. If you don’t have Docker installed, you can download it from [Docker’s website](https://docs.docker.com/get-started/get-docker/).
                   - Once Docker is installed, you can pull the latest Foundry release by running:
                   ```bash title="Terminal"
                   docker pull ghcr.io/foundry-rs/foundry:latest
                   ```
                   - You can also build the Docker image locally by running the following command from the Foundry repository:
                   ```bash title="Terminal"
                   docker build -t foundry .
                   ```
                   :::note
                   Some systems, including those with M1 chips, may experience issues when building the Docker image locally. This is a known issue.
                   :::
               </details>
       <Title icon={<DeskIcon />}> Address Network Endpoints</Title>
       <Divider />
       - Obtain the necessary endpoints from our [Network Endpoints](/devs/networkEndpoints.md#evm-environment) section to connect to the Suzuka Testnet.

       <details>
       <summary>MEVM Environment - Imola Testnet</summary>
## EVM Environment

The MEVM environment is currently accessible through the Imola Devnet.

| Service          | URL                                                                    |
|------------------|------------------------------------------------------------------------|
| RPC              | [https://mevm.devnet.imola.movementlabs.xyz](https://mevm.devnet.imola.movementlabs.xyz)     |
| Faucet UI        | [https://faucet.movementlabs.xyz/?network=mevm](https://faucet.movementlabs.xyz/?network=mevm)         |
| Chain ID         | 30732                                                                  |
| Explorer         | [https://explorer.devnet.imola.movementlabs.xyz](https://explorer.devnet.imola.movementlabs.xyz)     |
| Indexer          | [https://aptos.devnet.imola.movementlabs.xyz/indexer/v1/graphql](https://aptos.devnet.imola.movementlabs.xyz/indexer/v1/graphql) |
| Subgraph RPC     | [https://mevm2.devnet.imola.movementlabs.xyz/](https://mevm2.devnet.imola.movementlabs.xyz/)     |
       </details>

       <Title icon={<KeyboardIcon />}> Build and Deploy first your Smart Contract on Movement</Title>
       > Utilize your favorite Solidity tools to start building and deploying smart contracts [First Your Solidity Smart Contract on Movement](/devs/tutorials/Deploy/EVM%20Contracts/foundryandfractal)
            </TabItem>
   <!-- END:<<< Foundry - Install <<< -->
   <!-- START:>>> Hardhat >>> -->
            <TabItem value="hardhat" label="Hardhat and Fractal">
               <Title icon={<InstallIcon />} textSize="2xl"> Install the Hardhat</Title>
               <Divider />
               :::info
               - Prerequisites
                  - [Node.js](https://nodejs.org/en/download/package-manager)
                  - [Git](https://git-scm.com/downloads)
               :::
               > Hardhat is used through a local installation in your project. This way your environment will be reproducible, and you will avoid future version conflicts.
               >
               > To install it, you need to create an npm project by going to an empty folder, running npm init, and following its instructions. You can use another package manager, like yarn, but we recommend you use npm 7 or later, as it makes installing Hardhat plugins simpler.
               >
               > Once your project is ready, you should run
               ```bash title="Terminal"
               npm install --save-dev hardhat
               ```
               :::tip
               If you are using Windows, we strongly recommend using [WSL 2](https://learn.microsoft.com/en-us/windows/wsl/about) to follow this guide.
               :::
       <Title icon={<DeskIcon />}> Address Network Endpoints</Title>
       <Divider />
       - Obtain the necessary endpoints from our [Network Endpoints](/devs/networkEndpoints.md#evm-environment) section to connect to the Suzuka Testnet.

       <details>
       <summary>MEVM Environment - Imola Testnet</summary>
## EVM Environment

The MEVM environment is currently accessible through the Imola Devnet.

| Service          | URL                                                                    |
|------------------|------------------------------------------------------------------------|
| RPC              | [https://mevm.devnet.imola.movementlabs.xyz](https://mevm.devnet.imola.movementlabs.xyz)     |
| Faucet UI        | [https://faucet.movementlabs.xyz/?network=mevm](https://faucet.movementlabs.xyz/?network=mevm)         |
| Chain ID         | 30732                                                                  |
| Explorer         | [https://explorer.devnet.imola.movementlabs.xyz](https://explorer.devnet.imola.movementlabs.xyz)     |
| Indexer          | [https://aptos.devnet.imola.movementlabs.xyz/indexer/v1/graphql](https://aptos.devnet.imola.movementlabs.xyz/indexer/v1/graphql) |
| Subgraph RPC     | [https://mevm2.devnet.imola.movementlabs.xyz/](https://mevm2.devnet.imola.movementlabs.xyz/)     |
       </details>
       <Title icon={<KeyboardIcon />}> Build and Deploy first your Smart Contract on Movement</Title>
       > Utilize your favorite Solidity tools to start building and deploying smart contracts [First Your Solidity Smart Contract on Movement](/devs/tutorials/Deploy/EVM%20Contracts/hardhatandfractal)
            </TabItem>
   <!-- END:<<< Hardhat <<< -->
        </Tabs>
       <Title> Obtain Testnet Tokens</Title>
       :::info
       Visit our [MEVM Faucets page](https://faucet.movementlabs.xyz/?network=mevm) to request tokens for your chosen environment.
       :::
    </TabItem>
</Tabs>

---

## Learn Move
<Divider />

New to the Move programming language? Start learning here:

- **[Hack Movement](https://hack.movementlabs.xyz/):** A crash course on developing for the Movement Network.
- **[Move Language Book](https://aptos.dev/en/build/smart-contracts/book):** Comprehensive guide to understanding the basics of Move.

## Tutorials and Resources
<Divider />

Ready to expand your skills?

- **[Tutorials](/category/tutorials):** Explore various tutorials to deepen your understanding and start hacking on the Movement Network.
- **[Community Support:](http://discord.gg/movementlabsxyz)** Join our discord and engage in discussions with our developer community for support and updates.

---

By following this guide, you should have a clear path to start developing on the Movement Network using the environment that best suits your expertise. Happy building!
