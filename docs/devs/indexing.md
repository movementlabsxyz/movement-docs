---
sidebar_position: 6
---

# Indexers

The Movement Indexer is a GraphQL API you can use to retrive aggregate data, historical data, and data that might be hard to get from the simpler full node API. 

| Service          | URL                                                                    |
|------------------|------------------------------------------------------------------------|
| API Explorer     | [https://cloud.hasura.io/public/graphiql?endpoint=https://indexer.testnet.porto.movementnetwork.xyz/v1/graphql](https://cloud.hasura.io/public/graphiql?endpoint=https://indexer.testnet.porto.movementnetwork.xyz/v1/graphql)     |
| GraphQl Endpoint | [https://indexer.testnet.porto.movementnetwork.xyz/v1/graphql](https://indexer.testnet.porto.movementnetwork.xyz/v1/graphql)|


## Architecture

There are three main components to indexing with the Movement Network. We first have the Movement full node which provides a gRPC stream of transactions. The gRPC stream of transactions is consumed by the Transaction Streaming Service which includes the following components:

- [**Cache Worker**](https://github.com/aptos-labs/aptos-core/tree/main/ecosystem/indexer-grpc/indexer-grpc-cache-worker): Pulls transactions from the node and stores them in Redis.


- [**File Store**](https://github.com/aptos-labs/aptos-core/tree/main/ecosystem/indexer-grpc/indexer-grpc-file-store): Fetches transactions from Redis and stores them in a filesystem.

- [**Indexer API**](https://github.com/aptos-labs/aptos-indexer-processors): Consumes the data-service providing a GraphQL API to dApps and other clients wishing to query the network.


The Indexer API also allows the development of customized processors.

## Running the Transaction Streaming Service

The following guides from Aptos are provided: [Aptos Documentation](https://aptos.dev/en/build/indexer/txn-stream/local-development)


## Indexing Movement - Future Plans

Movement Labs plans to provide a hosted Transaction Stream Service in the near future. In the meantime, anyone wishing to index the Movement network would need to self-host their own Transaction Streaming Service.


## Providing a GraphQL API

With the Data Service running, the Indexer API can be configured to consume it as per the following [repository](https://github.com/aptos-labs/aptos-indexer-processors/) to provide a GraphQL API to downstream clients:

[**Data Service**](https://github.com/aptos-labs/aptos-core/tree/main/ecosystem/indexer-grpc/indexer-grpc-data-service): Serves transactions via a gRPC stream to downstream clients. It pulls from either the cache or the file store depending on the age of the transaction.  


## Example Queries

### NFT Queries

#### 1. Get all NFTs owned by an address with their collection info
```
query GetUserNFTs {
  current_token_ownerships_v2(
    where: {
      owner_address: {_eq: "0x123..."},
      amount: {_gt: 0},
      is_fungible_v2: {_eq: false}
    }
  ) {
    token_data_id
    amount
    current_token_data: current_token_data {
      token_name
      token_uri
      token_properties
      collection_id
      current_collection: current_collection {
        collection_name
        creator_address
        description
        uri
      }
    }
  }
}
```

#### 2. Get Recent NFT Sales/Transfers with Price Info
```
query GetRecentNFTSales {
  token_activities_v2(
    where: {
      type: {_in: ["0x3::token::DepositEvent", "0x3::token::WithdrawEvent"]},
      is_fungible_v2: {_eq: false}
    },
    order_by: {transaction_timestamp: desc},
    limit: 50
  ) {
    transaction_version
    transaction_timestamp
    from_address
    to_address
    token_amount
    current_token_data {
      token_name
      collection_id
      current_collection {
        collection_name
      }
    }
  }
}
```

#### 3. Get Collection Statistics
```
query GetCollectionStats {
  current_collections_v2(
    where: {
      collection_id: {_eq: "0x123..."}
    }
  ) {
    collection_name
    creator_address
    current_supply
    max_supply
    description
    uri
    # Get ownership distribution
    current_token_ownerships_v2_aggregate(
      where: {
        amount: {_gt: 0}
      }
    ) {
      aggregate {
        count(distinct: true)
      }
    }
  }
}
```

### DeFi Queries

#### 1. Get User's Token Balances
```
query GetUserTokenBalances {
  current_fungible_asset_balances(
    where: {
      owner_address: {_eq: "0x123..."},
      amount: {_gt: 0}
    }
  ) {
    asset_type
    amount
    last_transaction_timestamp
    metadata
  }
}
```

#### 2. Track Large Token Transfers
```
query GetLargeTokenTransfers {
  fungible_asset_activities(
    where: {
      amount: {_gt: "1000000000"}, # Adjust threshold as needed
      type: {_in: ["0x1::coin::WithdrawEvent", "0x1::coin::DepositEvent"]}
    },
    order_by: {transaction_timestamp: desc},
    limit: 100
  ) {
    transaction_version
    transaction_timestamp
    amount
    asset_type
    type
    owner_address
    is_transaction_success
  }
}
```

#### 3. Get Token Activity History for an Address
```
query GetAddressTokenHistory {
  account_transactions(
    where: {
      account_address: {_eq: "0x123..."}
    },
    order_by: {transaction_version: desc}
  ) {
    transaction_version
    fungible_asset_activities {
      amount
      asset_type
      type
      transaction_timestamp
    }
  }
}
```