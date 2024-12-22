---
sidebar_position: 5
title: "SDK Wallet Builders"
description: This guide will show you how to craft a "wallet adapter plugin"
---

# Creating a Wallet Adapter Plugin for Your Aptos SDK Wallet

> You've built a fantastic Aptos SDK wallet, and now you want to make it a first-class citizen in the vibrant dApp ecosystem. This guide will show you how to craft a "wallet adapter plugin" – the essential component that allows dApps to seamlessly integrate with your SDK wallet.
> By adhering to the [AIP-62](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-62.md) Wallet Standard, your wallet will be readily discoverable by any dApp using the `aptos-wallet-adapter`.

**Our Three-Part Strategy:**

1. **Craft the Plugin:** Implement the adapter plugin tailored to your SDK wallet.
2. **Go Public on npm:** Publish your plugin as an npm package for easy integration.
3. **Join the Adapter Registry:** Update the `aptos-wallet-adapter` to put your wallet on the dApp map.

## 1. Crafting Your Wallet Adapter Plugin

This is where you'll build the bridge between your SDK wallet and the dApp world. We'll use the `wallet-standard` repository's example code as our blueprint.

> **Helpful Hint:** For a practical example, look at the [Wallet Adapter Demo dapp](https://github.com/aptos-labs/aptos-wallet-adapter/tree/main/apps/nextjs-example). The [`standardWallet.ts`](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/apps/nextjs-example/src/utils/standardWallet.ts) file is where the plugin magic happens, and [`page.tsx`](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/apps/nextjs-example/src/app/page.tsx) provides React component examples.

**Development Steps:**

1. **New TypeScript Project:** Start fresh by creating a new TypeScript repository to house your adapter plugin.
2. **Copy the Blueprint:** Copy the [example code](https://github.com/aptos-labs/wallet-standard/blob/main/example/wallet.ts) from the `wallet-standard` repository into your new project. This provides a solid foundation.
3. **Tailor to Your Wallet:** Now, adapt the example code to interact with your SDK wallet's specific functions. Ensure that you implement every single required AIP-62 function.

    > **Checklist Reminder:**  The full list of mandatory functions for AIP-62 compatible wallets is right [here](https://github.com/aptos-labs/wallet-standard/blob/38defe159b8641ff1763c4db61827c78ab448dab/src/detect.ts#L16). Don't miss any!

## Testing Your Plugin

Thorough testing is crucial. Here's how to put your plugin through its paces:

1. **Clone the Adapter Repo:** Clone the `aptos-wallet-adapter` repository to your local machine.
2. **Locate the Example:** Navigate to `aptos-wallet-adapter/apps/nextjs-example/src/utils/standardWallet.ts` within the example dapp.
3. **Swap the Code:** Replace the contents of `standardWallet.ts` with your plugin implementation.
    1. You'll need to update the import statement in `aptos-wallet-adapter/apps/nextjs-example/src/app/page.tsx` to use your wallet's class instead of `MyWallet`.
    2. For local testing, you can temporarily keep the `registerWallet` code, but remember that SDK wallets don't need this after being added to the `aptos-wallet-standard` core package.
4. **Fire Up the Demo:** Run a local instance of the demo dapp by following the instructions in its [README.md](https://github.com/aptos-labs/aptos-wallet-adapter/tree/main/apps/nextjs-example).
5. **Connect and Test:** Click "Connect a Wallet." Your wallet should now be proudly displayed in the list. Connect to it and thoroughly test all features using the demo dapp. **This simulates how a real-world dApp will interact with your wallet, so be thorough!**

## 2. Publishing Your Plugin to npm

Once your plugin is polished and tested, it's time to share it with the world! Publish it as an npm package for easy integration by dApp developers.

**Publishing Steps:**

1. **Follow the Guide:**  This comprehensive npm guide will walk you through creating and publishing your package: [Creating and Publishing Scoped Public Packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages).
2. **Example:** You can see how the [AptosConnect](https://www.npmjs.com/package/@aptos-connect/wallet-adapter-plugin) package is published as an example.

## 3. Joining the `wallet-adapter-core` Family

To make your wallet easily discoverable by dApp users, you need to add it to the `wallet-adapter-core` registry.

**Integration Steps:**

1. **Fork the Adapter Repo:** Fork the `aptos-wallet-adapter` monorepo to your GitHub account. ([Fork it here](https://github.com/aptos-labs/aptos-wallet-adapter/fork))
2. **Clone Your Fork:** Clone your forked repository to your local machine.
3. **Create a New Branch:**  Create a branch for your changes:

    ```bash
    git checkout -b add-my-sdk-wallet
    ```
4. **Navigate to the Registry:** Go to `packages/wallet-adapter-core/src/AIP62StandardWallets`.
5. **Install Your Package:** Add your newly published npm package as a dependency:

    ```bash
    pnpm i @your-package-name
    ```
6. **Import Your Wallet:** Import your wallet into `sdkWallets.ts`:

    ```tsx
    // Example:
    import { YourWallet } from "@your-package-name/wallet-adapter-plugin";
    ```
7. **Register Your Wallet:** Inside the `getSDKWallets` function (in `sdkWallets.ts`), add an instance of your wallet to the `sdkWallets` array:

    ```tsx
    sdkWallets.push(new YourWallet(dappConfig));
    ```

    > **Important Note:** Some wallets may require special handling during the connection process. For instance, T Wallet has separate plugins for mainnet and devnet. Make sure you account for any such requirements.
8. **Update the `AvailableWallets` Type:**  Modify the `AvailableWallets` type in `types.ts` to include your wallet's name:

    ```tsx
    export type AvailableWallets = "Nightly" | "Petra" | "T wallet" | "YourWalletName";
    ```
9. **Update the README:** Add your wallet to the list of AIP-62 compatible wallets in the main `README.md` of the `aptos-wallet-adapter` repository.
10. **Commit and Push:** Commit your changes with a descriptive message and push them to your forked repository.
11. **Create a Pull Request:** Open a pull request from your fork to the main `aptos-wallet-adapter` repository, following the guidelines in [CONTRIBUTING.md](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/CONTRIBUTING.md).

> **Success!** Once your pull request is merged, dApps that update their `aptos-wallet-adapter` package will automatically discover and be able to connect to your wallet.

## Resources

*   **Wallet Adapter Demo App:**
    *   [Live Site](https://aptos-labs.github.io/aptos-wallet-adapter)
    *   [Source Code](https://github.com/aptos-labs/aptos-wallet-adapter/tree/main/apps/nextjs-example)
    *   [`standardWallet.ts`](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/apps/nextjs-example/src/utils/standardWallet.ts) (Example Plugin Implementation)
*   [`wallet-standard`](https://github.com/aptos-labs/wallet-standard) Source Code
*   [`wallet-adapter-core`](https://github.com/aptos-labs/aptos-wallet-adapter/tree/main/packages/wallet-adapter-core) Source Code
*   [AIP-62 Standard](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-62.md)

This revised guide provides a more natural and engaging approach to creating wallet adapter plugins for SDK wallets. It emphasizes clarity, provides concrete examples, and guides the reader through each step with precision. Remember to replace placeholder values with your wallet's specific information. Good luck, and welcome to the Move dApp ecosystem!
