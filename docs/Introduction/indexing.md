---
sidebar_position: 7
---

# Indexers

There are three main components to indexing with the Movement Network. We first have the Suzuka full node which provides a gRPC stream of transactions. The gRPC stream of transactions are consumed by the Transaction Streaming Service which includes the following components:

- **Cache Worker**: Pulls transactions from the node and stores them in Redis.  
  [GitHub Repository](https://github.com/aptos-labs/aptos-core/tree/main/ecosystem/indexer-grpc/indexer-grpc-cache-worker)

- **File Store**: Fetches transactions from Redis and stores them in a filesystem.  
  [GitHub Repository](https://github.com/aptos-labs/aptos-core/tree/main/ecosystem/indexer-grpc/indexer-grpc-file-store)

The third component is the **Indexer API** which consumes the data-service providing a GraphQL API to dApps and other clients wishing to query the network.  
[GitHub Repository](https://github.com/aptos-labs/aptos-indexer-processors)

The Indexer API also allows the development of customised processors.

## Running the Transaction Streaming Service

A guide from Aptos is provided:  
[Aptos Documentation](https://aptos.dev/en/build/indexer/txn-stream/local-development)

- [Cache Worker](https://github.com/aptos-labs/aptos-core/tree/main/ecosystem/indexer-grpc/indexer-grpc-cache-worker)
- [File Store](https://github.com/aptos-labs/aptos-core/tree/main/ecosystem/indexer-grpc/indexer-grpc-file-store)
- [Indexer API](https://github.com/aptos-labs/aptos-indexer-processors)
- [Aptos Development Guide](https://aptos.dev/en/build/indexer/txn-stream/local-development)

## Indexing Suzuka - Future Plans

Movement Labs plans to provide a hosted Transaction Stream Service in the near future. In the meantime, anyone wishing to index the Movement network would need to self-host their own Transaction Streaming Service.

## Providing a GraphQL API

With the Data Service running, the Indexer API can be configured to consume it as per the following repository to provide a GraphQL API to downstream clients:  
[GitHub Repository](https://github.com/aptos-labs/aptos-indexer-processors/)

Movement Labs plans to provide GraphQL APIs for all of its networks in the near future.

- **Data Service**: Serves transactions via a gRPC stream to downstream clients. It pulls from either the cache or the file store depending on the age of the transaction.  
  [GitHub Repository](https://github.com/aptos-labs/aptos-core/tree/main/ecosystem/indexer-grpc/indexer-grpc-data-service)

- [GitHub Repository](https://github.com/aptos-labs/aptos-indexer-processors/)
- [Data Service](https://github.com/aptos-labs/aptos-core/tree/main/ecosystem/indexer-grpc/indexer-grpc-data-service)
