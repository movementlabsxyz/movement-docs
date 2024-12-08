---
sidebar_position: 4
title: "SDK Wallet Builders"
---

# Wallet Adapter Plugin for SDK Wallets

## 1. Overview
### 1.1. Purpose
A wallet adapter plugin enables dapps to use your wallet. With the [AIP-62 Wallet standard](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-62.md), dapps can simply update their version of `aptos-wallet-adapter` to connect to newly added Wallet plugins.

### 1.2. Implementation Process
The implementation consists of three main steps:
1. Implement a wallet adapter plugin for your SDK wallet
2. Publish your plugin on npm
3. Update the `aptos-wallet-adapter` package

## 2. Implementing the Wallet Adapter Plugin
### 2.1. Initial Setup
1. Create a new typescript repository
2. Copy the [`wallet-standard` example](https://github.com/aptos-labs/wallet-standard/blob/main/example/wallet.ts) into your repo
3. Implement AIP-62 functions using your wallet

> **Note**: The complete list of required functions for AIP-62 compatible wallets can be found [here](https://github.com/aptos-labs/wallet-standard/blob/38defe159b8641ff1763c4db61827c78ab448dab/src/detect.ts#L16).

> **Reference**: For implementation examples, see the [Wallet Adapter Demo dapp](https://github.com/aptos-labs/aptos-wallet-adapter/tree/main/apps/nextjs-example), specifically [`standardWallet.ts`](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/apps/nextjs-example/src/utils/standardWallet.ts) and [`page.tsx`](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/apps/nextjs-example/src/app/page.tsx).

### 2.2. Testing Process
1. Clone the [`aptos-wallet-adapter`](https://github.com/aptos-labs/aptos-wallet-adapter/tree/main) repository
2. Navigate to the example dapp at [`aptos-wallet-adapter/apps/nextjs-example/src/utils/standardWallet.ts`](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/apps/nextjs-example/src/utils/standardWallet.ts)
3. Replace standardWallet.ts with your implementation:
   - Update import in page.tsx to use your Wallet
   - Keep registerWallet code for local testing
4. Run local dapp version following [README.md](https://github.com/aptos-labs/aptos-wallet-adapter/tree/main/apps/nextjs-example)
5. Test functionality:
   - Verify wallet appears in connection list
   - Test connection process
   - Verify all wallet features work as expected

## 3. Publishing the Plugin
### 3.1. Creating npm Package
Follow the [npm package publishing guide](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages) to publish your SDK wallet code.
Example: [AptosConnect](https://www.npmjs.com/package/@aptos-connect/wallet-adapter-plugin)

## 4. Updating Wallet Adapter Core
### 4.1. Setup Process
1. Fork the [`aptos-wallet-adapter`](https://github.com/aptos-labs/aptos-wallet-adapter) monorepo
2. Create new branch:
```bash
git checkout -b your-wallet
```

### 4.2. Implementation Steps
1. Navigate to [`packages/wallet-adapter-core/src/AIP62StandardWallets`](https://github.com/aptos-labs/aptos-wallet-adapter/tree/main/packages/wallet-adapter-core/src/AIP62StandardWallets)
2. Install your package:
```bash
pnpm i @yourpackage
```
3. Import wallet in `sdkWallets.ts`:
```typescript
import { YourWallet } from "@your-package/wallet-adapter-plugin";
```
4. Add wallet instance to sdkWallets:
```typescript
sdkWallets.push(new YourWallet(dappConfig));
```

> **Warning**: Some wallets may require custom logic for proper connection handling (e.g., T Wallet has different plugins for mainnet and devnet).

### 4.3. Type Updates
Update `AvailableWallets` in `type.ts`:
```typescript
export type AvailableWallets = "Nightly" | "Petra" | "T wallet" | "Your Wallet's Name";
```

### 4.4. Documentation Updates
1. Update the [README.md](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/README.md) to include your wallet
2. Create pull request following the [contribution guide](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/CONTRIBUTING.md#creating-a-pull-request)

## 5. Resources
### 5.1. Demo and Examples
- Wallet Adapter Demo App:
  - [Live site](https://aptos-labs.github.io/aptos-wallet-adapter)
  - [Source code](https://github.com/aptos-labs/aptos-wallet-adapter/tree/main/apps/nextjs-example)
  - [Example implementation](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/apps/nextjs-example/src/utils/standardWallet.ts)

### 5.2. Reference Documentation
- [`wallet-standard`](https://github.com/aptos-labs/wallet-standard) source code
- [`wallet-adapter-core`](https://github.com/aptos-labs/aptos-wallet-adapter/tree/main/packages/wallet-adapter-core) source code
- [AIP-62 standard](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-62.md)
