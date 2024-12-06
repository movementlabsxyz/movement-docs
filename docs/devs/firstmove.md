---
sidebar_position: 2
---

# Your First Move Contract

Welcome to your first journey in deploying a Move module (smart contract) on the Movement Labs Testnet. In the Move programming language, smart contracts are referred to as **modules**. This guide will walk you through each step, ensuring a smooth experience from setup to deployment.

## Prerequisites

Before we begin, ensure you have one of the following command-line interfaces (CLIs) installed:

- **Movement CLI**: [Installation Guide](/devs/movementcli)
- **Aptos CLI**: [Installation Guide](https://aptos.dev/en/build/cli#-install-the-aptos-cli)

This tutorial uses the **Movement CLI**, but the commands are identical for the Aptos CLI—just replace `movement` with `aptos` in the commands. If you're using the Aptos CLI, you'll need to configure it for a custom network during the initialization process.

---

## Step 1: Initialize the CLI

Open your command prompt or terminal and navigate to the directory where you want to create your project. Then, initialize the CLI with the following command:

```bash
movement init --skip-faucet
```


:::info

Due to current network load, we have restricted the faucet API to only accept requests from a Web UI. You must include the `--skip-faucet` flag. The CLI cannot fund the account immediately, so it will not create an account for you automatically.

:::

### CLI Prompts

1. **Choose Network**

   You'll be prompted to select a network:

   ```bash
   Choose network from [devnet, testnet, local, custom | defaults to devnet]:
   ```

   Type `custom` and press **Enter**.

  You will be prompted for the following details from our [Network EndPoints](/devs/networkEndpoints)

  - RPC/Rest Endpoint: https://aptos.testnet.porto.movementlabs.xyz/v1
  - Faucet Endpoint: https://faucet.testnet.porto.movementnetwork.xyz/

2. **Enter Private Key**

   Next, you'll be asked to enter your private key:

   ```bash
   Enter your private key as a hex literal (0x...) [Current: None | No input: Generate new key (or keep one if present)]:
   ```

   - If you have an existing private key, enter it now.
   - If not, simply press **Enter** to generate a new one.

### Initialization Success

After completing the prompts, you should see a message like:

```bash
Movement CLI is now set up for account 0xYOUR_ACCOUNT_ADDRESS as profile default!
See the account here: https://explorer.movementlabs.xyz/account/0xYOUR_ACCOUNT_ADDRESS?network=testnet
Run `movement --help` for more information about commands
{
  "Result": "Success"
}
```

:::info

Note that Porto Explorer is available here: https://explorer.testnet.porto.movementnetwork.xyz/?network=testnet

:::

---



## Step 2: Fund Your Account

Before deploying contracts, you'll need testnet tokens.

1. **Copy Your Account Address**

   Make note of your account address from the initialization success message (e.g., `0xYOUR_ACCOUNT_ADDRESS`).

2. **Visit the Faucet**

   Go to the [Movement Labs Web Faucet](https://mizu.testnet.porto.movementnetwork.xyz/) to fund your account.

3. **Request Tokens**

   Paste your account address into the faucet and request testnet tokens.

---

## Step 3: Explore the Configuration

Your project directory now contains a hidden `.movement` folder with a `config.yaml` file:

```
.movement/
└── config.yaml
```

This configuration file stores information about your default profile, including your private key and network settings.

```yaml
---
profiles:
  default:
    network: Testnet
    private_key: "YOUR_PRIVATE_KEY"
    public_key: "YOUR_PUBLIC_KEY"
    account: "YOUR_ACCOUNT_ADDRESS"
    rest_url: "https://aptos.testnet.porto.movementlabs.xyz/v1/"
    faucet_url: "https://faucet.testnet.porto.movementlabs.xyz/"
```

:::warning

**Warning:** **Do not commit `config.yaml` to version control systems like GitHub, as it contains your private key!**

:::

---

## Step 4: Scaffold the Project

Now, let's set up the structure for your Move module.

### Initialize the Move Project

Run the following command:

```bash
movement move init --name hello_blockchain
```

This command creates the necessary folders and files for your Move project:

```
Move.toml
Sources/
Scripts/
Tests/
```

- **Move.toml**: Configuration file for your Move project.
- **Sources/**: Directory where you'll write your Move modules.
- **Scripts/**: Directory for transaction scripts (optional).
- **Tests/**: Directory for writing unit tests.

---

## Step 5: Write Your First Module

### Create the Module File

Navigate to the `Sources/` directory and create a new file named `hello_blockchain.move`:

```bash
cd Sources
touch hello_blockchain.move
```

### Add the Module Code

Open `hello_blockchain.move` in your preferred text editor and paste the following code:

```move
module hello_blockchain::message {
    use std::error;
    use std::signer;
    use std::string::{String, utf8};
    use aptos_framework::account;
    use aptos_framework::event;

    struct MessageHolder has key {
        message: String,
        message_change_events: event::EventHandle<MessageChangeEvent>,
    }

    struct MessageChangeEvent has drop, store {
        from_message: String,
        to_message: String,
    }

    /// Error code indicating no message is present.
    const ENO_MESSAGE: u64 = 0;

    #[view]
    public fun signature(): address {
        @hello_blockchain
    }

    #[view]
    public fun get_message(addr: address): String acquires MessageHolder {
        assert!(exists<MessageHolder>(addr), error::not_found(ENO_MESSAGE));
        borrow_global<MessageHolder>(addr).message
    }

    public entry fun set_message(account: signer, message: String) acquires MessageHolder {
        let account_addr = signer::address_of(&account);
        if (!exists<MessageHolder>(account_addr)) {
            move_to(&account, MessageHolder {
                message,
                message_change_events: account::new_event_handle<MessageChangeEvent>(&account),
            });
        } else {
            let message_holder = borrow_global_mut<MessageHolder>(account_addr);
            let from_message = message_holder.message;
            event::emit_event(&mut message_holder.message_change_events, MessageChangeEvent {
                from_message,
                to_message: copy message,
            });
            message_holder.message = message;
        }
    }

    #[test(account = @0x1)]
    public entry fun sender_can_set_message(account: signer) acquires MessageHolder {
        let addr = signer::address_of(&account);
        aptos_framework::account::create_account_for_test(addr);
        set_message(account, utf8(b"Hello, Blockchain"));

        assert!(
            get_message(addr) == utf8(b"Hello, Blockchain"),
            ENO_MESSAGE
        );
    }

    #[test]
    public fun signature_okay() {
        assert!(signature() == @hello_blockchain, ENO_MESSAGE);
    }
}
```

:::info

This is a "Hello, Blockchain" module written in Move. We won't dive into the syntax and functionality in this tutorial.

:::

---

## Step 6: Compile the Module

Let's compile your module to ensure everything is set up correctly.

### Option 1: Without Editing `Move.toml`

If you haven't modified the `Move.toml` file, run:

```bash
movement move compile --named-addresses hello_blockchain=default
```

### Option 2: By Editing `Move.toml`

To simplify future commands, you can add your account address to `Move.toml`.

1. **Open `Move.toml`** and add:

   ```toml
   [addresses]
   hello_blockchain = "0xYOUR_ACCOUNT_ADDRESS"
   ```

2. **Compile without Extra Flags**

   Now, you can compile with:

   ```bash
   movement move compile
   ```

### Expected Output

If the compilation is successful, you'll see something like:

```json
{
  "Result": [
    "a345dbfb0c94416589721360f207dcc92ecfe4f06d8ddc1c286f569d59721e5a::message"
  ]
}

```

---

## Step 7: Test the Module

Your module includes unit tests. Let's run them to ensure everything works as expected.

### Run Tests

```bash
movement move test
```

> **Note:** If you didn't edit `Move.toml`, add the `--named-addresses` flag:

```bash
movement move test --named-addresses hello_blockchain=default
```

### Expected Output

You should see output similar to:

```
Running Move unit tests
[ PASS    ] 0x4bb138fa05ea42faa44268b30872ed6e5a84f25f8718bcac981a6de36a090e3a::message::sender_can_set_message
[ PASS    ] 0x4bb138fa05ea42faa44268b30872ed6e5a84f25f8718bcac981a6de36a090e3a::message::signature_okay
Test result: OK. Total tests: 2; passed: 2; failed: 0
{
  "Result": "Success"
}
```

---

## Step 8: Publish the Module

Now it's time to deploy your module to the Movement Labs Testnet.

### Publish Command

If you edited `Move.toml`:

```bash
movement move publish
```

If you didn't edit `Move.toml`:

```bash
movement move publish --named-addresses hello_blockchain=default
```

### Confirm Deployment Cost

You'll be prompted to confirm the transaction and spend a small amount of testnet tokens:

```
Do you want to submit this transaction? [Y/n]
```

Type `Y` and press **Enter**.

> **Ensure you have sufficient testnet tokens from the faucet before proceeding.**

### Expected Output

Upon successful deployment, you'll receive a confirmation:

```
Transaction submitted: https://explorer.movementlabs.xyz/txn/0xTRANSACTION_HASH?network=testnet
{
  "Result": {
    "transaction_hash": "0xTRANSACTION_HASH",
    "gas_used": 1696,
    "gas_unit_price": 100,
    "sender": "0xYOUR_ACCOUNT_ADDRESS",
    "sequence_number": 0,
    "success": true,
    "timestamp_us": 1726483247259754,
    "version": 183468408,
    "vm_status": "Executed successfully"
  }
}
```

---

## Step 9: Interact with Your Contract

Congratulations! You've successfully deployed your first Move module on the Movement Labs Testnet.

- **View Your Module**: Visit the provided transaction link to see details on the explorer.
- **Interact**: Use the Movement CLI or write scripts to interact with your deployed module.

---

## Recap

In this tutorial, you've:

- Installed and initialized the Movement CLI.
- Funded your testnet account.
- Scaffolded a new Move project.
- Written and compiled a Move module.
- Ran unit tests to ensure functionality.
- Deployed your module to the testnet.

---

We're excited to see you continue on journey into the Move language!

**Happy coding!**
