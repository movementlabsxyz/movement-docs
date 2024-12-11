---
sidebar_position: 5
description: Maintain applications without wallet-specific modifications
---

# Move-VM Wallet Standard

## 1. Overview
### 1.1. Purpose
The Aptos Wallet Standard is designed to:
- Ensure interoperability between different wallet types
- Allow dapp developers to maintain applications without wallet-specific modifications
- Provide a unified interface for all dapp developers
- Enable users to choose their preferred wallet without compatibility concerns

### 1.2. Core Requirements
To ensure interoperability, the standard requires three main components:
1. Mnemonics
2. dapp API
3. Key rotation

## 2. Mnemonics
### 2.1. Definition
- Mnemonics are sets of words used to derive account private keys
- Recommendation: One mnemonic per account for better key rotation management
- Uses [Bitcoin Improvement Proposal (BIP44)](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) to derive paths from mnemonics to account addresses

### 2.2. Creating an Aptos Account
Standard account creation process:
1. Generate mnemonic phrase using BIP39
2. Get master seed from the mnemonic phrase
3. Use BIP44-derived path to retrieve account address (e.g., `m/44'/637'/0'/0'/0'`)
   - See the [Aptos TypeScript SDK's implementation for the derive path](https://github.com/aptos-labs/aptos-ts-sdk/blob/main/src/account/Account.ts#L181-L202)

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

   const { key } = derivePath(path, bytesToHex(bip39.mnemonicToSeedSync(normalizeMnemonics)));

   return new AptosAccount(new Uint8Array(key));
}
```

### 2.3. Supporting Multiple Accounts from One Mnemonic
Though not recommended, some wallets support this model:
1. Generate mnemonic phrase with BIP39
2. Get master seed
3. Use BIP44-derived path with account index: `m/44'/637'/i'/0'/0'`
   - See the [Aptos TypeScript SDK's implementation for the derive path](https://github.com/aptos-labs/aptos-core/blob/1bc5fd1f5eeaebd2ef291ac741c0f5d6f75ddaef/ecosystem/typescript/sdk/src/aptos_account.ts#L49-L69)
4. Increment `i` until all desired accounts are found

## 3. Wallet and dapp Communication
### 3.1. Standard Wallet Interface
[Following AIP-62](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-62.md), wallets must implement the [AptosWallet interface](https://github.com/aptos-labs/wallet-standard/blob/main/src/wallet.ts):

```typescript
class MyWallet implements AptosWallet {
  url: string;
  version: "1.0.0";
  name: string;
  icon: string;
  chains: AptosChain;
  features: AptosFeatures;
  accounts: readonly AptosWalletAccount[];
}
```

### 3.2. Wallet Account Interface
A wallet must implement a [AptosWalletAccount interface](https://github.com/aptos-labs/wallet-standard/blob/main/src/account.ts):

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
  chains: AptosChain;
  features: AptosFeatures;
  variant: AptosAccountVariant;
  label?: string;
  icon?: string;
}
```

### 3.3. Error Handling
Wallets must use [AptosWalletError](https://github.com/aptos-labs/wallet-standard/blob/main/src/errors.ts):
```typescript
// Using default message
if (error) {
  throw new AptosWalletError(AptosWalletErrorCode.Unauthorized);
}
// Using custom message
if (error) {
  throw new AptosWalletError(
    AptosWalletErrorCode.Unauthorized,
    "My custom unauthorized message"
  );
}
```

## 4. dapp API
### 4.1. Wallet Integration
For a dapp to easily integrate with a wallet, it is encouraged to use the  Wallet Adapter Standard

### 4.2. Custom Integration
A dapp uses the [getAptosWallets()](https://github.com/aptos-labs/wallet-standard/blob/main/src/detect.ts#L40) function:

```typescript
import { getAptosWallets } from "@aptos-labs/wallet-standard";

let { aptosWallets, on } = getAptosWallets();

// Listen for new wallet registrations
const removeRegisterListener = on("register", function () {
  let { aptosWallets } = getAptosWallets();
});

// Listen for wallet unregistrations
const removeUnregisterListener = on("unregister", function () {
  let { aptosWallets } = getAptosWallets();
});
```

## 5. Key Rotation
### 5.1. Current Status
- Not yet implemented in wallets
- Mapping of rotated keys has been [implemented](https://github.com/aptos-labs/aptos-core/pull/2972)
- SDK integration in progress

### 5.2. Process for Wallets Importing Private Keys
1. Derive authentication key
2. Look up authentication key on-chain in Account origination table
   - If account doesn't exist: New account, use authentication key as address
   - If account exists: Rotated key account, use address from table
