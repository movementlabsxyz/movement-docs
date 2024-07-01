---
sidebar_position: 1
---

# Sui Module

🚀 Your First Sui Module on Devnet

:::info

You may see Sui devnet referred to as m2. Note that this is a legacy devnet and as we work to move away from devnet this naming convention will no longer be used. 

:::

## Requirements

Make sure to have [Sui CLI](/) installed.

## Initialize your Environment

Initialize your Sui profile for your package development and add M2 as a custom network. M2 is our current blockchain that supports Sui deployments.

```bash
sui client new-env --rpc https://sui.devnet.m2.movementlabs.xyz:443 --alias m2
```

Now switch to the M2 environment: 

```bash
sui client switch --env m2
```

You can now create a new sui move project with the following command:

```bash
sui move new hello_world
```

This will give you a folder to access into:

```bash
cd hello_world
```

Open it in your favorite editor:

```bash
code .
```

Create your move file:

```bash
touch sources/hello_world.move
```

Now you have the following folder structure:

```
/ sources
    hello_world.move
Move.toml

```

Inside `hello_world.move` you can paste the following code:

```rust

#[lint_allow(self_transfer)]

module hello_world::hello_world {

    use std::string;
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    struct HelloWorldObject has key, store {
        id: UID,
        text: string::String
    }
    
    public fun signature() : address {
        @<address>
    }

    public fun mint(ctx: &mut TxContext) {
        let object = HelloWorldObject {
            id: object::new(ctx),
            text: string::utf8(b"Hello World!")
        };
        transfer::public_transfer(object, tx_context::sender(ctx));
    }

}

```

After building your project, you can deploy it to the devnet:

```bash
sui client publish --gas-budget 20000000
```

The object ID under the `Published Objects` section is the ID of your module. You can now call the mint function on your module with that object ID:

```bash
sui client call --function mint --module hello_world --package <package object ID> --gas-budget 10000000
```

Don't forget to replace `<package object ID>` with the object ID of your module from previous console output!

Congratulations! You have just written, published, and executed your first SuiMove module on the testnet!