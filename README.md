# Merkle Airdrop DApp

[](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#merkle-airdrop-dapp)

This repository contains the implementation of a Merkle-based airdrop DApp. The project allows eligible users to claim tokens from an airdrop if their address is part of a pre-generated Merkle tree. The DApp is built using Solidity for smart contracts and JavaScript (Node.js) for Merkle tree generation and testing.

## Table of Contents

[](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#table-of-contents)

1.  [Setup](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#setup)
2.  [Running the Merkle Script](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#running-the-merkle-script)
3.  [Configuring the Hardhat](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#configuring-the-hardhat)
4.  [Deploying the Contracts](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#deploying-the-contracts)
5.  [Generating Proofs for Airdrop Claims](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#generating-proofs-for-airdrop-claims)
6.  [Testing](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#testing)
7.  [Assumptions and Limitations](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#assumptions-and-limitations)

## Setup

[](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#setup)

### Prerequisites

[](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#prerequisites)

Ensure you have the following installed on your machine:

-   [Node.js](https://nodejs.org/en/download/) (v14 or higher)
-   [Hardhat](https://hardhat.org/getting-started/) (installed as a dev dependency in this project)
-   [TypeScript](https://www.typescriptlang.org/download) (optional, for type safety)
-   [Ethers.js](https://docs.ethers.io/v6/) (used for interacting with the Ethereum blockchain)
-   [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/4.x/) (for ERC20 token implementation)

### Installation

[](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#installation)

-   **Clone the Repository**:
git clone https://github.com/yusufroqib/merkle-airdrop-dapp.git
cd merkle-airdrop-dapp

**Install Dependencies**:

npm install

## Running the Merkle Script

[](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#running-the-merkle-script)

The Merkle script is used to generate a Merkle tree from a list of eligible addresses and their corresponding airdrop amounts stored in a CSV file. This script outputs the Merkle root and proof needed to claim the airdrop.

### Step-by-Step Instructions

[](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#step-by-step-instructions)

-   **Prepare the Airdrop CSV File**:
    
    -   Create a CSV file named `airdrop.csv` under the `airdrop` directory (create the directory if it does not exist).
    -   The CSV file should have two columns: `address` and `amount`. Example:
        
        ```
        address,amount
        0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,100
        0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db,150
        0x787dDcAF9cC2b1c3C1A095f23297B24F5cF9bE6c,200
        
        ```
        

**Run the Merkle Script**:

-   Execute the script to generate the Merkle root and proofs:

npx hardhat run scripts/merkle.ts

1.  -   The output will display the Merkle root and proofs for each address.

## Configuring the Hardhat

[](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#configuring-the-hardhat)

-   Here, I am using Lisk Sepolia. Configure your `hardhat.config.ts` based on the network you are using.

1.  **Set ACCOUNT_PRIVATE_KEY**:
    
    -   Run the following command to set account private key for hardhat config.
    
    npx hardhat vars set ACCOUNT_PRIVATE_KEY 
    

-   Then follow the prompt and input your private key
-   **Set LISK_RPC_URL**:
    
    -   Run the following command to set rpc url for hardhat config.
    
    npx hardhat vars set LISK_RPC_URL 
    

1.  Then follow the prompt and input your rpc url

## Deploying the Contracts

[](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#deploying-the-contracts)

-   There two files named `Rocco.ts` and `TokenAirdrop.ts` under the `ignition/modules` directory (create the directory if it does not exist).

### 1. Deploying the Mock ERC20 Token

[](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#1-deploying-the-mock-erc20-token)

The mock ERC20 token contract `Rocco` is deployed first. It represents the token to be airdropped.

1.  **Deploy Rocco Token**:
    
    -   Run the following Hardhat command to deploy the `Rocco` token:
    
    npx hardhat ignition deploy ignition/modules/Rocco.ts --network <your-network> --verify
    

-   Replace `<your-network>` with your desired network (e.g., `localhost`, `ropsten`, `lisk-sepolia`).
    
-   **Deploy TokenAirdrop Contract**:
    
    -   After deploying the token, deploy the `TokenAirdrop` contract with the Merkle root:
    
    npx hardhat ignition deploy ignition/modules/TokenAirdrop.ts --network <your-network> --verify
    

1.  Ensure you update the deployment script with the correct constructor arguments (the token contract address and the Merkle root).
    

### Example Deployment Script (`Rocco.ts`)

[](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#example-deployment-script-roccots)

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const RoccoModule = buildModule("RoccoModule", (m) => {
	const rocco = m.contract("Rocco");

	return { rocco };
});

export default RoccoModule;

### Example Deployment Script (`TokenAirdrop.ts`)

[](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#example-deployment-script-tokenairdropts)

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
const tokenAddress = "0xYourTokenAddress"; // Replace with actual deployed token address
const merkleRoot = "0xYourMerkleRoot"; // Replace with generated Merkle root

const TokenAirdropModule = buildModule("TokenAirdropModule", (m) => {
	const save = m.contract("TokenAirdrop", [tokenAddress, merkleRoot]);

	return { save };
});

export default TokenAirdropModule;

## Generating Proofs for Airdrop Claims

[](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#generating-proofs-for-airdrop-claims)

To claim an airdrop, a user must provide a valid Merkle proof that verifies their eligibility.

1.  **Run the Merkle Script**: The Merkle script (`merkle.ts`) generates proofs for eligible addresses. To get a proof for a specific address, run:
    
    npx hardhat run scripts/merkle.ts
    

-   -   The script will output the proof for each address in the CSV file.
-   **Use the Proof in the Claim Function**:
    
    -   Users will use the proof generated to call the `claim` function on the `TokenAirdrop` contract:
    
    function claim(bytes32[] calldata _merkleProof, uint256 _amount) external {
        // Function implementation
    }
    

1.  -   The `_merkleProof` is the array of hashes that need to be provided to prove the user's claim.

## Testing

[](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#testing)

### Running Tests

[](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#running-tests)

The repository includes a suite of Hardhat tests to verify the functionality of the contracts.

1.  **Run Tests**:
    
    npx hardhat test
    

### Explanation of Tests

[](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#explanation-of-tests)

-   **Deployment Tests**: Verifies that contracts are deployed correctly with the expected parameters (token address, Merkle root).
-   **Claim Tests**: Tests that eligible addresses can claim the airdrop successfully and ineligible addresses cannot.
-   **Double Claim Tests**: Ensures that addresses cannot claim more than once.
-   **Admin Functions**: Verifies that only the owner can withdraw leftover tokens.

## Assumptions and Limitations

[](https://github.com/yusufroqib/merkle-airdrop-dapp/blob/main/README.md#assumptions-and-limitations)

1.  **CSV Input Format**: Assumes that the CSV file is formatted correctly with two columns: `address` and `amount`.
2.  **Single Airdrop Per Address**: Each address is limited to a single airdrop claim based on the initial configuration.
3.  **Token Supply**: The `Rocco` token supply is assumed to be sufficient to cover all airdrop claims.
4.  **Merkle Tree Integrity**: Assumes the Merkle tree is generated and managed correctly without manipulation. The Merkle root should be securely deployed to the contract.
5.  **Network Configuration**: Deployment scripts and tests are configured for specific networks. Make sure to set up the correct network configuration in `hardhat.config.ts`.