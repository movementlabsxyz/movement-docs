---
sidebar_position: 7
---

# Indexers

There are three main components to indexing with the Movement Network. We first have the Suzuka full node which provides a gRPC stream of transactions. The gRPC stream of transactions are consumed by the Transaction Streaming Service which includes the following components:

- [**Cache Worker**](https://github.com/aptos-labs/aptos-core/tree/main/ecosystem/indexer-grpc/indexer-grpc-cache-worker): Pulls transactions from the node and stores them in Redis.  
  

- [**File Store**](https://github.com/aptos-labs/aptos-core/tree/main/ecosystem/indexer-grpc/indexer-grpc-file-store): Fetches transactions from Redis and stores them in a filesystem. 

- [**Indexer API**](https://github.com/aptos-labs/aptos-indexer-processors): Consumes the data-service providing a GraphQL API to dApps and other clients wishing to query the network.  


The Indexer API also allows the development of customised processors.

## Running the Transaction Streaming Service

The following guides from Aptos are provided: [Aptos Documentation](https://aptos.dev/en/build/indexer/txn-stream/local-development)

## Indexing Suzuka - Future Plans

Movement Labs plans to provide a hosted Transaction Stream Service in the near future. In the meantime, anyone wishing to index the Movement network would need to self-host their own Transaction Streaming Service.

## Providing a GraphQL API

With the Data Service running, the Indexer API can be configured to consume it as per the following [repository](https://github.com/aptos-labs/aptos-indexer-processors/) to provide a GraphQL API to downstream clients:  


Movement Labs plans to provide GraphQL APIs for all of its networks in the near future.

[**Data Service**](https://github.com/aptos-labs/aptos-core/tree/main/ecosystem/indexer-grpc/indexer-grpc-data-service): Serves transactions via a gRPC stream to downstream clients. It pulls from either the cache or the file store depending on the age of the transaction.  

