---
sidebar_position: 8
---

# Follower node installation

This guide will help you to sync a follower node. This procedure cover Mainnet and Testnet network.
If you don't already have a follower node instance created, follows the Ansible script installation of this [guide](./followerNode_create_instance.md).

The created follower node should have been run once at least to create all configuration files in the .movement folder.
If there's some issue during this first start, don't worry about it. The only container that is important is the `setup` that should run fully.

Stop the follower node before processing this script.

```bash
systemctl stop movement-full-follower.service 

```

## Update only from a Bardock version before commit `d963665`

To update from the Bardock version prior commit `d963665` the process is:
 - edit the rev in the  `/etc/systemd/system/suzuka-full-follower.service` see Configurations files updates .
 - rename `.movement` folder in `.movement.save` .
 - start then stop the node to create a new `.movement` folder and configuration file.
 - edit the new .movement/config.json file and verify that the following entries are set as follow:
   * `"movement_da_light_node_connection_protocol": "https"`,
   * `"da_db_path": "/.movement/suzuka-da-db"`
 - do a db restoration as defined later in Restoration script.
 - Start the node that should sync.
 - Remove the `.movement.save` folder.

## Configurations files updates

Verify the Systemd service file `/etc/systemd/system/movement-full-follower.yml`: 
Validate that the `CONTAINER_REV`  var is correctly set as follow:

```Environment="CONTAINER_REV=d963665"```

Verify in the `$HOME/.movement/config.json` file that:
 * the field `movement_da_light_node_connection_protocol` is set to `https`
 * the field `movement_da_light_node_connection_hostname` is set to
   - Mainnet: `m1-da-light-node.mainnet.movementnetwork.xyz`
   - Testnet: `"m1-da-light-node.testnet.bardock.movementnetwork.xyz"`
 * the field `da_db_path` is set to :
   - Mainnet: `"da_db_path": "/.movement/movement-da-db"`
   - Testnet: `"da_db_path": "/.movement/suzuka-da-db"`

If not, update them with the right value.

## Update the docker files

Go in the directory `$HOME/movement` and type:

```
git checkout d963665c8d6b9bb2b14b06f1ad0c7fce1ae9a0b7
```

## Restoration script
Verify the `$HOME` variable is set correctly defined and point to the folder where the `.movement` folder is installed.
In the Home directory create a new script file call `restore.sh` and copy / paste this content using `nano` or `vi`.

For Mainnet:

```
#!/bin/bash -e

# Stop the node if needed.
systemctl stop  movement-full-follower.service

export DOT_MOVEMENT_PATH=$HOME/.movement
export CONTAINER_REV=d963665
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


For Testnet:

```
#!/bin/bash -e

# Stop the node if needed.
systemctl stop  movement-full-follower.service

export DOT_MOVEMENT_PATH=$HOME/.movement
export CONTAINER_REV=d963665
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

The restoration should start. It can take around 1 hour and even more, depending on the speed of the hard drive and network.

At the end of the restoration the script will restart the node.

The node should sync with the leader node.

After a few minutes, to verify, use these commands:

To get the current leader state:

- For Mainnet:

```
curl https://mainnet.movementnetwork.xyz/v1
```

- For Testnet:

```
curl https://aptos.testnet.bardock.movementlabs.xyz/v1
```

To get your follower state:

```
curl 127.0.0.1:30731/v1
```

Both `ledger_version` and `block_height` state should be near or the same.

## Run Locally Testnet

To test restoration against a local node and not a real work, do the following:

From the initial [guide](followerNode_from_genesis.md) use this commit to checkout:  ```7e8d9b6``` .

To restore the db, you can use docker and the same  `restoration.sh` script created in the `movement` directory.

Or use these commands in the `movement` directory:

```
cargo build -p movement-full-node

DOT_MOVEMENT_PATH="$(pwd)/.movement" AWS_REGION=us-west-1 AWS_ACCESS_KEY_ID="<access key>" AWS_SECRET_ACCESS_KEY="<secret key>" target/debug/movement-full-node backup restore "mtnet-l-sync-bucket-sync" "{maptos,maptos-storage,suzuka-da-db}/**"
```

Replace the value of access key and secret key with the one on the follower node instance.

After you can start the local node that should sync from the Bardock leader.
