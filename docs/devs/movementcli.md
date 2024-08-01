---
sidebar_position: 3
---

# Movement CLI

Movement CLI supports Aptos Move natively. Here are the instructions to install and use Movement CLI:

## Install Movement CLI

1. `git clone https://github.com/movementlabsxyz/aptos-core/ && cd aptos-core`

2. `cargo build -p movement` (generates the `target/debug/movement` executable)

3. Copy `movement` into your `bin` or add it to your `PATH` depending on your system config. 

For example, to copy `movement` to `bin` on Mac or Linux:

```
sudo cp target/debug/movement /usr/local/bin/
```

## Use Movement CLI

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