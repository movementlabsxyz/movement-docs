---
sidebar_position: 1
---

# Aptos Module

🚀 Your First Aptos Module on M1 using Movement CLI

## Requirements

Make sure to have the [Aptos CLI]((https://aptos.dev/tools/aptos-cli/install-cli/)) installed.

## Initialize your Environment

Initialize your Aptos profile for your package development and add Movement as a custom network.

```bash

aptos init --network custom --rest-url https://aptos.testnet.suzuka.movementlabs.xyz/v1

```

Initialize your movement profile for your package development.

```bash

aptos move init --name hello_blockchain

```

If you generated your project using the [movementdev/movement-hack template](https://github.com/movementlabsxyz/movement-hack-temp), you should have a project with the following structure.

```
.gitignore
/.movement
    config.yaml
/ sources
    hello_blockchain.move
    hello_blockchain_test.move
Move.toml

```

`hello_blockchain.move` contains a simple module for setting the value of a message resource. Else, you can copy the following into a new file inside sources directory called `hello_blockchain.move`.

```rust

module hello_blockchain::message {
    use std::error;
    use std::signer;
    use std::string::{utf8, String};
    use aptos_framework::account;
    use aptos_framework::event;

    //:!:>resource
    struct MessageHolder has key {
        message: String,
        message_change_events: event::EventHandle<MessageChangeEvent>,
    }
    //<:!:resource
    struct MessageChangeEvent has drop, store {
        from_message: String,
        to_message: String,
    }

    /// There is no message present
    const ENO_MESSAGE: u64 = 0;

    #[view]
    public fun signature() : address {
        @<address>
    }

    #[view]
    public fun get_message(addr: address): String acquires MessageHolder {
        assert!(exists<MessageHolder>(addr), error::not_found(ENO_MESSAGE));
        borrow_global<MessageHolder>(addr).message
    }

    public entry fun set_message(account: signer, message: String)
    acquires MessageHolder {
        let account_addr = signer::address_of(&account);
        if (!exists<MessageHolder>(account_addr)) {
            move_to(&account, MessageHolder {
                message,
                message_change_events: account::new_event_handle<MessageChangeEvent>(&account),
            })
        } else {
            let old_message_holder = borrow_global_mut<MessageHolder>(account_addr);
            let from_message = old_message_holder.message;
            event::emit_event(&mut old_message_holder.message_change_events, MessageChangeEvent {
                from_message,
                to_message: copy message,
            });
            old_message_holder.message = message;
        }
    }

    #[test(account = @0x1)]
    public entry fun sender_can_set_message(account: signer) acquires MessageHolder {
        let addr = signer::address_of(&account);
        aptos_framework::account::create_account_for_test(addr);
        set_message(account,  utf8(b"Hello, Blockchain"));

        assert!(
          get_message(addr) == utf8(b"Hello, Blockchain"),
          ENO_MESSAGE
        );
    }

    #[test]
    public fun signature_okay() {
        assert!(signature() == @<address>, ENO_MESSAGE)
    }


}

```

You will also need to add the following to `Move.toml`.

```yaml

[package]
name = "{{ crate_name }}"
version = "0.0.0"

[dependencies]
AptosFramework = {git = "https://github.com/aptos-labs/aptos-core.git", subdir = "aptos-move/framework/aptos-framework", rev = "main"}

[addresses]
# hello_blockchain = "_"
std = "0x1"

```

Now you need to setup your `config.yaml` file. This will setup a private key for your environment. Choose testnet during setup!


```

aptos init

```

Run the tests with the aptos CLI

```bash
aptos move test --named-addresses hello_blockchain=default
```

If your test has passed, you can now publish your module to the testnet.

```bash
aptos move publish --named-addresses hello_blockchain=default
```

Make sure to accept the transaction in the prompt. You can now check the status of your transaction using the Movement CLI.

Afterwards, you can run the module on the testnet. You are going to set the message to "hello!".

```bash
aptos move run --function-id default::message::set_message --args string:hello!
```

Make sure to check the resources of the account you used to publish the module. You should see a MessageHolder resource.

```bash
aptos account list --query resources --account default
```

You can now check the message of the account.

```bash
aptos move run --function-id default::message::get_message --args address:default
```

Congratulations! You have just written, published, and executed your first Move module on the testnet!
