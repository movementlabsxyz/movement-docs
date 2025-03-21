---
sidebar_position: 9
---

# Follower Node Installation

This guide will help you sync a follower node. This will cover both mainnet and testnet.
If you don't already have a follower node instance created, follows the Ansible script installation of the Create a Follower Node guide [here](./followerNode_create_instance.md).

The follower node should have been run at least once to create all configuration files in the `.movement` folder.
It's not an issue if there's a problem furing the first pass. The only container that is important is the `setup` that should run completely.

Stop the follower node before processing this script.

```bash
systemctl stop movement-full-follower.service 
```

## Update only from a testnet version before commit `0.3.4-amd64`

To update from the testnet version prior commit `0.3.4-amd64` the process is:
 - Edit the rev in the  `/etc/systemd/system/suzuka-full-follower.service` see Configurations files updates.
 - Rename the `.movement` folder in `.movement.save`.
 - Start, then stop the node to create a new `.movement` folder and configuration file.
 - Edit the new .movement/config.json file and verify that the following entries are set as follows:
   * `"movement_da_light_node_connection_protocol": "https"`,
   * `"da_db_path": "/.movement/suzuka-da-db"`
 - Do a db restoration as defined later in the Restoration script.
 - Start the node which should sync now.
 - Remove the `.movement.save` folder.

## Configurations files updates

Verify the Systemd service file `/etc/systemd/system/movement-full-follower.yml`: 
Validate that the `CONTAINER_REV`  var is set correctly as follows:

```Environment="CONTAINER_REV=0.3.4-amd64"```

Verify in the `$HOME/.movement/config.json` file that:
 * the field `movement_da_light_node_connection_protocol` is set to `https`
 * the field `movement_da_light_node_connection_hostname` is set to
   - Mainnet: `m1-da-light-node.mainnet.movementnetwork.xyz`
   - Testnet: `"m1-da-light-node.testnet.bardock.movementnetwork.xyz"`
 * the field `da_db_path` is set to :
   - Mainnet: `"da_db_path": "/.movement/movement-da-db"`
   - Testnet: `"da_db_path": "/.movement/suzuka-da-db"`

## Update the docker files

Go in the `$HOME/movement` directory and enter:

```
git checkout d963665
```

## Restoration script
Verify the `$HOME` variable is set correctly and points to the folder where `.movement` is installed.
In the Home directory create a new script file, call `restore.sh` and copy and paste the following using `nano` or `vi`.

### Mainnet

```
#!/bin/bash -e

# Stop the node if needed.
systemctl stop  movement-full-follower.service

export DOT_MOVEMENT_PATH=$HOME/.movement
export CONTAINER_REV=0.3.4-amd64
export AWS_DEFAULT_REGION=us-west-1
export AWS_REGION=us-west-1
export MAPTOS_CHAIN_ID=126
export AWS_ACCESS_KEY_ID="<access key>"
export AWS_SECRET_ACCESS_KEY="<secret key>"
export SYNC_PATTERN="{default_signer_address_whitelist,maptos,maptos-storage,movement-da-db}/**"
export SYNC_BUCKET="move-main-rec-l-sb-sync"

# Restore the DB.
/usr/bin/docker compose --env-file $HOME/movement/.env -f $HOME/movement/docker/compose/movement-full-node/snapshot/docker-compose.restore.yml up --force-recreate

# Start the node.
systemctl start  movement-full-follower.service

```


### Testnet

```
#!/bin/bash -e

# Stop the node if needed.
systemctl stop  movement-full-follower.service

export DOT_MOVEMENT_PATH=$HOME/.movement
export CONTAINER_REV=0.3.4-amd64
export AWS_DEFAULT_REGION=us-west-1
export AWS_REGION=us-west-1
export MAPTOS_CHAIN_ID=250
export AWS_ACCESS_KEY_ID="<access key>"
export AWS_SECRET_ACCESS_KEY="<secret key>"
export SYNC_PATTERN="{default_signer_address_whitelist,maptos,maptos-storage,suzuka-da-db}/**"
export SYNC_BUCKET="mtnet-l-sync-bucket-sync"

# Restore the DB.
/usr/bin/docker compose --env-file $HOME/movement/.env -f $HOME/movement/docker/compose/movement-full-node/snapshot/docker-compose.restore.yml up --force-recreate

# Start the node.
systemctl start  movement-full-follower.service

```


Update the `<access key>` and `<secret key>` provided by movement.

Set the script executable with: ```chmod +x restoration.sh```

## Start the node restoration

To start the node db restoration from a recent snapshot execute the new script:

```
./restoration.sh
```

The restoration should start. It can take around 1 hour, depending on the speed of the hard drive and network.

At the end of the restoration the script will restart the node.

The follower node should sync with the leader node.

After a few minutes, to verify, use the following commands:

To get the current leader state:

### Mainnet

```
curl https://mainnet.movementnetwork.xyz/v1
```

### Testnet

```
curl https://aptos.testnet.bardock.movementlabs.xyz/v1
```

To get the follower state:

```
curl 127.0.0.1:30731/v1
```

Both `ledger_version` and `block_height` state should be near or the same.

## Run Local Environment

To test restoration against a local node, do the following:

From the initial [guide](followerNode_from_genesis.md) use this commit to checkout:  `0.3.4-amd64` .

To restore the db, you can use docker and the same  `restoration.sh` script created in the `movement` directory.

Or use these commands in the `movement` directory:

```
cargo build -p movement-full-node

DOT_MOVEMENT_PATH="$(pwd)/.movement" AWS_REGION=us-west-1 AWS_ACCESS_KEY_ID="<access key>" AWS_SECRET_ACCESS_KEY="<secret key>" target/debug/movement-full-node backup restore "mtnet-l-sync-bucket-sync" "{maptos,maptos-storage,suzuka-da-db}/**"
```

Replace the value of access key and secret key with the one on the follower node instance.

Once this is done you can start the local node which should sync from the testnet leader.
