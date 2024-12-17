---
sidebar_position: 4
title: Browser Extension Wallets
description: Implementing a wallet adapter plugin that allows dapps to interact with your browser extension wallet
---

# Crafting a Wallet Adapter Plugin for Your Browser Extension

So, you've built a fantastic Aptos Move wallet extension and want to make it play nicely with the ever-growing world of dApps? This guide will walk you through creating a "wallet adapter plugin" – the magic ingredient that lets decentralized applications (dApps) discover and interact with your creation. By following the [AIP-62](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-62.md) Wallet Standard, you ensure that your wallet becomes a seamless part of the Move ecosystem.

**The Mission:**

Our goal is twofold:

1. **Forge the Plugin:** Implement the adapter plugin within your extension.
2. **Spread the Word:**  Register your wallet with the `aptos-wallet-adapter` so dApps can find it.

## 1. Forging Your Wallet Adapter Plugin

This is where the core development happens. We'll be using the `wallet-standard` repository's example code as a solid foundation, but you'll need to tailor it to your wallet's unique features.

> **Handy Tip:**  You can see a real-world example of a plugin implementation in the [Wallet Adapter Demo dapp](https://github.com/aptos-labs/aptos-wallet-adapter/tree/main/apps/nextjs-example) repository. Check out [`standardWallet.ts`](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/apps/nextjs-example/src/utils/standardWallet.ts) for the plugin code and [`page.tsx`](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/apps/nextjs-example/src/app/page.tsx) to see how `registerWallet` is used.

**Action Plan:**

1. **Get the Blueprint:** Clone the `wallet-standard` repository and copy the [example code](https://github.com/aptos-labs/wallet-standard/blob/main/example/wallet.ts) into your extension's codebase. Think of this as your starting template.
2. **Customize the Template:**  Modify the example code to work seamlessly with your wallet's specific functionalities. This is where you bridge the gap between the standard and your wallet's unique way of doing things. Make absolutely sure you've implemented all the required AIP-62 functions.

    > **Need a Checklist?** Here's the [complete list of required functions](https://github.com/aptos-labs/wallet-standard/blob/38defe159b8641ff1763c4db61827c78ab448dab/src/detect.ts#L16) for AIP-62 compliant wallets. Don't miss any!
3. **Sound the Alarm:** Integrate the `registerWallet` call into your extension's startup sequence. This is like your wallet announcing, "Hey dApps, I'm here and ready to connect!" as soon as the page loads.

    ```tsx
    // Example: Within your extension's initialization code (e.g., background.ts)
    (function () {
        if (typeof window === "undefined") return; // Skip if not in a browser context
        const myWallet = new MyWallet(); //  Replace 'MyWallet' with your wallet's class
        registerWallet(myWallet);
    })();
    ```
4. **Rigorous Testing:** Put your plugin through its paces using the [Wallet Adapter Demo dapp](https://github.com/aptos-labs/aptos-wallet-adapter/tree/main/apps/nextjs-example).
    1. **Discovery Test:** After your extension calls `registerWallet`, your wallet should magically appear as an option when you click "Connect a Wallet" in the demo dapp.
    2. **Functionality Test:**  Use the demo dapp's features to thoroughly test all your wallet's functions. Make sure everything works exactly as expected. **This simulates a real dApp interacting with your extension, so don't skip this step!**
    3. **Local Debugging (Optional):** If you need to dig deeper, you can temporarily replace the `MyWallet` code in [`standardWallet.ts`](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/apps/nextjs-example/src/utils/standardWallet.ts) with your wallet's implementation and run the demo dapp locally.
        1. The demo dapp's [README.md](https://github.com/aptos-labs/aptos-wallet-adapter/tree/main/apps/nextjs-example) has instructions on how to get it running locally.
        2. Keep in mind that in the demo, `registerWallet` is called from [`page.tsx`](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/apps/nextjs-example/src/app/page.tsx). *In the real world, your extension should be the one calling `registerWallet`.*
5. **Release It!** Once you're confident in your plugin, publish the updated version of your browser extension to the world.

## 2. Spreading the Word: Registering with `wallet-adapter-core`

Now that your plugin is ready, let's make sure dApps can easily find your wallet. We do this by adding your wallet's details to the `wallet-adapter-core` package. This is like putting your wallet on the map!

**Here's the Plan:**

1. **Fork the Repo:** Fork the `aptos-wallet-adapter` repository to your own GitHub account. ([Use this fork link](https://github.com/aptos-labs/aptos-wallet-adapter/fork))
2. **Clone Your Fork:**  Clone your newly forked repository to your local machine so you can make changes.
3. **Branch Out:** Create a new branch specifically for your wallet integration. A descriptive name is always good:

    ```bash
    git checkout -b add-my-awesome-wallet
    ```
4. **Navigate to the Registry:**  Head over to the `packages/wallet-adapter-core/src/AIP62StandardWallets` directory. This is where the magic happens.
5. **Add Your Wallet's Details:** Open up `registry.ts` and add your wallet's information, following the `AptosStandardSupportedWallet` structure.

    ```tsx
    export interface AptosStandardSupportedWallet<Name extends string = string> {
      // Your wallet's name (e.g., "MyAwesomeWallet" as WalletName<"MyAwesomeWallet">)
      name: WalletName<Name>;
      // The URL to your wallet's website or its Chrome Web Store page.
      url: string;
      // Your wallet's icon, encoded as a data URI. Stick to the format!
      icon: `data:image/${"svg+xml" | "webp" | "png" | "gif"};base64,${string}`;
      // Use this value as is
      readyState: WalletReadyState.NotDetected;
      // Use this value as is
      isAIP62Standard: true;
    }
    ```

    **Example:**

    ```tsx
    {
      name: "MyAwesomeWallet" as WalletName<"MyAwesomeWallet">,
      url: "https://chrome.google.com/webstore/detail/myawesomewallet/...", // Your extension's URL
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...", // Your wallet's icon data
      readyState: WalletReadyState.NotDetected,
      isAIP62Standard: true,
    }
    ```
6. **Update the Type:**  Add your wallet's name to the `AvailableWallets` type in `types.ts`.

    ```tsx
    export type AvailableWallets = "Nightly" | "Petra" | "T wallet" | "MyAwesomeWallet"; // Add your wallet here
    ```
7. **Update the README:**  Add your wallet to the list of AIP-62 compatible wallets in the main `README.md` of the `aptos-wallet-adapter` repository. Show it off!
8. **Commit and Push:** Commit your changes with a clear message and push them to your forked repository.
9. **Create a Pull Request:** Finally, create a pull request from your fork to the main `aptos-wallet-adapter` repository. Follow the guidelines in [CONTRIBUTING.md](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/CONTRIBUTING.md) to ensure a smooth review process.

## You've Done It!

By following these steps, you've successfully created and registered a wallet adapter plugin. Your Aptos Move wallet extension is now ready to connect with the exciting world of dApps.

**Need More?**

*   **Wallet Adapter Demo App:**
    *   [Live Site](https://aptos-labs.github.io/aptos-wallet-adapter)
    *   [Source Code](https://github.com/aptos-labs/aptos-wallet-adapter/tree/main/apps/nextjs-example)
    *   [`standardWallet.ts`](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/apps/nextjs-example/src/utils/standardWallet.ts) (Example Plugin Implementation)
*   [`wallet-standard`](https://github.com/aptos-labs/wallet-standard) Source Code - Dive into the nitty-gritty.
*   [`wallet-adapter-core`](https://github.com/aptos-labs/aptos-wallet-adapter/tree/main/packages/wallet-adapter-core) Source Code - See how the adapter works under the hood.
*   [AIP-62 Standard](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-62.md) - The definitive guide to the wallet standard.

This improved guide provides a more conversational and less robotic tone, making it more engaging and easier to understand. It breaks down the process into clear steps and provides helpful analogies to clarify technical concepts. Remember to replace the placeholder values with your wallet's actual information. Good luck building!
