---
title: Move-VM Wallet Standard
sidebar_position: 6
description: Maintain applications without wallet-specific modifications
---

# A Developer's Guide to Seamless Integration

## Introduction: Building Bridges Between Wallets and dApps

Imagine a world where every online store only accepted one type of credit card. Frustrating, right? That's the kind of problem we're solving in the blockchain world. This tutorial will guide you through the MoveVM Wallet Standard, a crucial set of guidelines that ensures different crypto wallets can seamlessly interact with decentralized applications (dApps) on the MoveVM blockchain.

**Why is this important?**

*   **For Users:** It means you're free to use your favorite Aptos Move wallet with any dApp without worrying about compatibility headaches.
*   **For Developers:** You can focus on building amazing dApps, knowing that your application will work smoothly with a wide range of wallets.
*   **For the Move Ecosystem:** A unified standard fosters growth and innovation by removing barriers to entry.

**Let's break down the key ingredients of this standard.**

## 1. Mnemonics: Your Master Key to the Aptos Universe

### 1.1 What are Mnemonics?

Think of a mnemonic phrase as a super-secure, human-readable password that unlocks your digital assets. Instead of a random string of characters, it's a list of 12 or 24 words that you can write down and store safely. This phrase is the foundation of your account's security, so guard it carefully!

**Best Practice:** Each account should have its own unique mnemonic. This enhances security and makes key rotation (which we'll discuss later) much easier to manage. It's like having separate keys for your house, your car, and your safe deposit box – much safer than using the same key for everything. While some wallets, especially those migrating from other ecosystems, might use a single mnemonic for multiple accounts, the Aptos standard strongly recommends a one-to-one relationship between mnemonics and accounts.

### 1.2 Creating Your First Move Account

> Let's walk through the process of generating a new Aptos account:

1. **Generate Your Mnemonic Phrase:** We use a widely adopted standard called BIP39 to generate a cryptographically secure mnemonic. Many wallet applications and libraries will handle this for you automatically.
2. **From Phrase to Seed:** Your mnemonic isn't directly used as a key. Instead, it's converted into a "master seed" – a long string of random bits that serves as the starting point for generating your account keys.
3. **Deriving Your Account Address:** Here's where BIP44 comes in. It defines a standard way to create a "path" from your master seed to your Aptos account address. This path looks like this: `m/44'/637'/0'/0'/0'`. Each number represents a specific level of derivation, ensuring that your Aptos address is unique and securely generated. The `637` in the path specifically designates Aptos within the broader cryptocurrency landscape.

```typescript
/**
  * Creates new account with bip44 path and mnemonics,
  * @param path. (e.g. m/44'/637'/0'/0'/0')
  * Detailed description: {@link https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki}
  * @param mnemonics.
  * @returns AptosAccount
  */
static fromDerivePath(path: string, mnemonics: string): AptosAccount {
   if (!AptosAccount.isValidPath(path)) {
     throw new Error("Invalid derivation path");
   }

   const normalizeMnemonics = mnemonics
     .trim()
     .split(/\s+/)
     .map((part) => part.toLowerCase())
     .join(" ");

   const { key } = derivePath(bytesToHex(bip39.mnemonicToSeedSync(normalizeMnemonics)), path);

   return new AptosAccount(new Uint8Array(key));
}
```

### 1.3 Supporting Multiple Accounts (The Advanced Route)

While not recommended for most users, some wallets allow you to manage multiple Aptos accounts from a single mnemonic. This is like having a master key that can open multiple doors in a building.

**How it Works:**

1. Steps 1 and 2 are the same: Generate the mnemonic and master seed.
2. **Account Index:** Instead of a fixed path, we introduce an "account index" (`i`) into the derivation path: `m/44'/637'/i'/0'/0'`.
3. **Finding Your Accounts:** The wallet will increment `i` (starting from 0, then 1, 2, and so on) to generate multiple account addresses from your single mnemonic.

**Searching with a Gap Limit:** To avoid searching endlessly for accounts, wallets use a "gap limit." This limit (usually set to 10) defines how many empty addresses the wallet will check before giving up. So, if the wallet finds 10 consecutive addresses with no associated accounts, it will stop searching.

```typescript
const gapLimit = 10; // Standard gap limit
let currentGap = 0;

for (let i = 0; currentGap < gapLimit; i += 1) {
  const derivationPath = `m/44'/637'/${i}'/0'/0'`;
  const account = AptosAccount.fromDerivePath(derivationPath, mnemonics);
  try {
    const resources = await account.getResources(); // Try fetching resources for the account
    wallet.addAccount(account); // Account exists, add it to the wallet
    currentGap = 0; // Reset the gap
  } catch (error) {
    if (error.status === 404) {
      currentGap += 1; // Increment the gap if account not found
    } else {
      throw new AptosWalletError(AptosWalletErrorCode.InternalError, error);
    }
  }
}
```

**Caution:** Managing multiple accounts from one mnemonic can be more complex and may have security implications if not handled carefully. It also makes key rotation more difficult, as rotating one account derived from the mnemonic might affect others.

## 2. Bridging the Gap: How Wallets and dApps Communicate

### 2.1 The Universal Language: The AptosWallet Interface

To ensure smooth communication, wallets must speak a common language. This is defined by the `AptosWallet` interface, as specified in [AIP-62](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-62.md). Think of it as a contract that all wallets must adhere to.

```typescript
class MyWallet implements AptosWallet {
  url: string;
  version: "1.0.0";
  name: string;
  icon: `data:image/svg+xml;base64,${string}` | `data:image/webp;base64,${string}` | `data:image/png;base64,${string}` | `data:image/gif;base64,${string}`;
  chains: AptosChain[];
  features: AptosFeatures;
  accounts: readonly AptosWalletAccount[];
}
```

**What does this mean?**

Every Aptos-compatible wallet will have properties like:

*   `url`: The URL of the wallet.
*   `version`: The wallet's version number.
*   `name`: The wallet's name (e.g., "Petra," "Martian").
*   `icon`: An icon representing the wallet.
*   `chains`: The Aptos chains it supports (e.g., mainnet, testnet).
*   `features`: The capabilities of the wallet (e.g., connecting, signing transactions).
*   `accounts`: A list of the user's accounts managed by the wallet.

### 2.2. Inside the Wallet: The AptosWalletAccount Interface

Each account within a wallet also has a standard interface: `AptosWalletAccount`.

```typescript
enum AptosAccountVariant {
  Ed25519,
  MultiEd25519,
  SingleKey,
  MultiKey,
}

class AptosWalletAccount implements WalletAccount {
  address: string;
  publicKey: Uint8Array;
  chains: AptosChain[];
  features: AptosFeatures;
  variant: AptosAccountVariant;
  label?: string;
  icon?: `data:image/svg+xml;base64,${string}` | `data:image/webp;base64,${string}` | `data:image/png;base64,${string}` | `data:image/gif;base64,${string}`;
}
```

**Key Properties:**

*   `address`: The account's public address on the Aptos blockchain.
*   `publicKey`: The public key associated with the account.
*   `chains`: The Aptos chains this account is valid on.
*   `features`: The capabilities of this specific account.
*   `variant`: The type of cryptographic scheme used by the account (e.g., Ed25519, MultiEd25519).
*   `label` and `icon`: Optional properties to help users identify and manage their accounts.

**Wallet Registration:** Web extension wallets (like those installed from the Chrome Web Store) need to actively register themselves using a `registerWallet` function. This lets dApps know that the wallet is installed and ready to be used.

```typescript
const myWallet = new MyWallet();
registerWallet(myWallet);
```

### 2.3 Handling Errors Gracefully: The AptosWalletError

When things go wrong (and they sometimes do), wallets need a consistent way to report errors. The `AptosWalletError` class provides a standardized approach. Wallets can throw predefined errors like `Unauthorized` or `InternalError`, or they can create custom errors with specific error codes and messages.

```typescript
// Using the default message
if (error) {
  throw new AptosWalletError(AptosWalletErrorCode.Unauthorized);
}

// Using a custom message
if (error) {
  throw new AptosWalletError(
    AptosWalletErrorCode.Unauthorized,
    "My custom unauthorized message"
  );
}

// Using a custom error code
if (error) {
  throw new AptosWalletError(-32000, "Invalid Input");
}
```

**Why is this important?**

*   **dApp developers** can easily handle different error scenarios without writing wallet-specific code.
*   **Users** get clear and consistent error messages, regardless of which wallet they're using.

## 3. Integrating with Wallets: A dApp Developer's Toolkit

### 3.1 The Easy Route: The Wallet Adapter Standard

For a seamless integration experience, dApp developers are encouraged to use the Aptos Wallet Adapter Standard. This standard provides a set of tools and libraries that simplify the process of connecting to multiple wallets. The Wallet Adapter Standard is designed to work across different blockchain ecosystems, making it a versatile solution.

**Think of the Wallet Adapter as a universal remote control for your TV. You don't need a separate remote for each device; the universal remote handles it all.**

### 3.2. The Custom Path: Rolling Your Own Integration

If you need more control or want to build a custom integration, you can use the `getAptosWallets()` function. This function retrieves a list of all currently registered Aptos wallets that comply with the standard.

```typescript
import { getAptosWallets } from "@aptos-labs/wallet-standard";

let { aptosWallets, on } = getAptosWallets();
```

**Dynamic Wallet Discovery:** dApps can listen for events when new wallets are registered or unregistered. This allows them to dynamically update their UI and provide users with the most up-to-date list of available wallets.

```typescript
const removeRegisterListener = on("register", () => {
  let { aptosWallets } = getAptosWallets();
  // Update the UI with the newly registered wallets
});

const removeUnregisterListener = on("unregister", () => {
  let { aptosWallets } = getAptosWallets();
  // Update the UI to remove unregistered wallets
});
```

When a user wants to connect, the dApp can simply call the appropriate function offered by the wallet (e.g., `connect()`).

```typescript
const onConnect = async () => {
  try {
    const response = await wallet.features["aptos:connect"].connect();
    console.log("Wallet connected:", response);
    // Handle successful connection
  } catch (error) {
    console.error("Connection error:", error);
    // Handle connection error, display error message, etc.
  }
};
```

**Example Scenario:** A dApp might have a "Connect Wallet" button. When clicked, the dApp calls `getAptosWallets()`, displays the available wallets to the user, and then, upon user selection, calls the selected wallet's `connect()` function to initiate the connection.

## 4. Key Rotation: Upgrading Your Security

### 4.1. What is Key Rotation?

Imagine you lose your house keys. You wouldn't just keep using the same locks, right? You'd change them. Key rotation is a similar concept in the blockchain world. It's the process of updating your account's authentication key to a new one, enhancing security in case your old key is compromised.

### 4.2 The Future of Aptos Key Rotation

-   **Implementation Status:** While the on-chain mechanism for mapping rotated keys is already implemented, wallet support is still under development. SDK integration is also actively being worked on.
-   **How It Will Work (for Wallets Importing Private Keys):**

1. **Derive the Authentication Key:** The wallet derives the authentication key from the imported private key.
2. **On-Chain Lookup:** The wallet checks the Aptos blockchain's account origination table to see if an account with this authentication key already exists.

    *   **New Account:** If no matching account is found, it means it's a brand-new account, and the authentication key will be used as the account address.
    *   **Rotated Key:** If a matching account is found, it indicates that the key has been rotated. The wallet will then use the actual account address stored in the table.

**Why is Key Rotation Important?**

*   **Enhanced Security:** Regularly rotating your keys reduces the risk of unauthorized access if a key is compromised.
*   **Account Recovery:** In some scenarios, key rotation can be used as a mechanism for account recovery.

## Conclusion: Towards a Seamless Aptos Ecosystem

The Aptos Wallet Standard is a vital step toward creating a user-friendly and developer-friendly Aptos ecosystem. By establishing clear guidelines for wallet development and dApp integration, we're paving the way for a future where users can seamlessly interact with the Aptos blockchain using their preferred wallets, and developers can focus on building innovative dApps without worrying about compatibility issues. As the Aptos ecosystem continues to grow and evolve, these standards will play a crucial role in ensuring its long-term success. Stay tuned for further updates and get ready to build the future of decentralized applications on Move!
