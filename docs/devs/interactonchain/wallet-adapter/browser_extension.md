---
sidebar_position: 4
title: Browser Extension Wallets
description: Implementing a wallet adapter plugin that allows dapps to interact with your browser extension wallet
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Title from '@site/src/components/Title'
import InstallIcon from '../../../assets/terminal.svg'

# Movement Networks Wallet Adapter for Browser Extension Wallets

This guide walks you through implementing a wallet adapter plugin that allows dapps to interact with your browser extension wallet on Move Networks.
Using the AIP-62 Wallet standard, dapps can seamlessly connect to your wallet by updating their `move-wallet-adapter` package.

## Prerequisites
Before starting, ensure you have:
- A working browser extension wallet
- Node.js and npm/yarn installed
- Basic knowledge of TypeScript and React
- Git installed and configured
- A code editor (VSCode recommended)

## Implementation Steps

### Part 1: Implementing the Wallet Adapter Plugin

#### Step 1: Set Up Development Environment
1. Clone the wallet-standard example:
```bash
git clone https://github.com/aptos-labs/wallet-standard
cd wallet-standard
```

2. Install dependencies:
<Tabs groupId="package-management">
  <TabItem value="npm" label="npm" default>
    <Title icon={<InstallIcon />} textSize="2xl">Install Dependencies</Title>
    ```bash
    npm install
    ```
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    <Title icon={<InstallIcon />} textSize="2xl">Install Dependencies</Title>
    ```bash
    pnpm install
    ```
  </TabItem>
  <TabItem value="yarn" label="yarn">
    <Title icon={<InstallIcon />} textSize="2xl">Install Dependencies</Title>
    ```bash
    yarn install
    ```
  </TabItem>
  <TabItem value="bun" label="bun">
    <Title icon={<InstallIcon />} textSize="2xl">Install Dependencies</Title>
    ```bash
    bun install
    ```
  </TabItem>
</Tabs>

#### Step 2: Copy Example Implementation
1. Navigate to the example wallet implementation at [`wallet-standard/example/wallet.ts`](https://github.com/aptos-labs/wallet-standard/blob/main/example/wallet.ts)
2. Copy this file into your browser extension's codebase
3. Review the [full list of required AIP-62 functions](https://github.com/aptos-labs/wallet-standard/blob/38defe159b8641ff1763c4db61827c78ab448dab/src/detect.ts#L16)
> For a complete implementation example, see [standardWallet.ts](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/apps/nextjs-example/src/utils/standardWallet.ts)

#### Step 3: Implement Required Functions
Follow the AIP-62 standard to implement these core functions:

```typescript title="WalletStandard.ts"
class MyWallet {
    // Required properties
    readonly name = 'MyWallet';
    readonly icon = '...'; // Your wallet's icon
    readonly version = '1.0.0';

    // Required methods
    async connect(): Promise<void> {
        // Your connection logic
    }

    async disconnect(): Promise<void> {
        // Your disconnection logic
    }

    async signTransaction(transaction: any): Promise<any> {
        // Your signing logic
    }

    async signAndSubmitTransaction(transaction: any): Promise<{ hash: string }> {
        // Your submission logic
    }
}
```

#### Step 4: Register Your Wallet
Add the registration code to initialize your wallet:

```typescript
(function () {
    if (typeof window === "undefined") return;
    const myWallet = new MyWallet();
    registerWallet(myWallet);
})();
```

#### Step 5: Testing Your Implementation
1. Start the demo dapp:
```bash
git clone https://github.com/move-networks/move-wallet-adapter
cd move-wallet-adapter/apps/nextjs-example
npm install
npm run dev
```

2. Test these features in order:
   - Wallet connection
   - Account display
   - Transaction signing
   - Error handling
   - Disconnection

:::tip
**Testing Tip**: Use the [Wallet Adapter Demo dapp](https://github.com/aptos-labs/aptos-wallet-adapter/tree/main/apps/nextjs-example) to verify your implementation. Check [`standardWallet.ts`](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/apps/nextjs-example/src/utils/standardWallet.ts) for reference implementation.
See the Wallet Adapter Demo dapp [README.md](https://github.com/aptos-labs/aptos-wallet-adapter/tree/main/apps/nextjs-example) for instructions on how to run the demo locally.
In the demo, `registerWallet` is called from [page.tsx](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/apps/nextjs-example/src/app/page.tsx). This is less realistic, as in practice your browser extension should be calling `registerWallet`.
:::

### Part 2: Registering Your Wallet with Move Networks

#### Step 1: Fork and Clone
1. Fork the [`move-wallet-adapter`](https://github.com/move-networks/move-wallet-adapter) repository
2. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/move-wallet-adapter
cd move-wallet-adapter
```

#### Step 2: Create Branch
```bash
git checkout -b feature/add-my-wallet
```

#### Step 3: Add Wallet Details
1. Navigate to `packages/wallet-adapter-core/src/StandardWallets/`
2. Update `registry.ts` with your wallet details:

```typescript
export interface MoveStandardSupportedWallet<Name extends string = string> {
    name: WalletName<Name>;
    url: string;
    icon: `data:image/${"svg+xml" | "webp" | "png" | "gif"};base64,${string}`;
    readyState: WalletReadyState.NotDetected;
    isStandard: true;
}

// Add your wallet config
{
    name: "MyWallet" as WalletName<"MyWallet">,
    url: "https://chromewebstore.google.com/detail/your-wallet-id",
    icon: "data:image/png;base64,...",
    readyState: WalletReadyState.NotDetected,
    isStandard: true,
}
```

#### Step 4: Update Type Definitions
In `type.ts`, add your wallet:
```typescript
export type AvailableWallets = "WalletOne" | "WalletTwo" | "MyWallet";
```

#### Step 5: Submit Changes
1. Update README.md with your wallet
2. Commit changes:
```bash
git add .
git commit -m "feat: add MyWallet adapter"
git push origin feature/add-my-wallet
```
3. Create PR following the
- Commit and push your changes to your fork.

:::info
If you’ve pushed your changes to your fork, a green button should appear at the top of the [`aptos-wallet-adapter`](https://github.com/aptos-labs/aptos-wallet-adapter) repo asking if you would like to create a pull request.
:::

- Follow [this guide](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/CONTRIBUTING.md#creating-a-pull-request) to open a pull request for the [`aptos-wallet-adapter`](https://github.com/aptos-labs/aptos-wallet-adapter) repo.

## Troubleshooting

### Common Issues
1. Wallet not appearing in dapp
   - Check if `registerWallet` is called
   - Verify wallet registration timing

2. Transaction signing fails
   - Validate transaction format
   - Check error handling

3. Connection issues
   - Verify network configuration
   - Check wallet state management

## Resources

- Wallet Adapter Demo App
    - [Live site](https://aptos-labs.github.io/aptos-wallet-adapter)
    - [Source code](https://github.com/aptos-labs/aptos-wallet-adapter/tree/main/apps/nextjs-example)
    - See [`standardWallet.ts`](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/apps/nextjs-example/src/utils/standardWallet.ts) for an example implementation of an AIP-62 compatible wallet-adapter plugin.
- [`wallet-standard`](https://github.com/aptos-labs/wallet-standard) source code.
- [`wallet-adapter-core`](https://github.com/aptos-labs/aptos-wallet-adapter/tree/main/packages/wallet-adapter-core) source code.
- [AIP-62 standard](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-62.md).
