# LongStarKey

## Overview

Contracts that manage NFTs for the ERC1155 standard.

## Storage

### maxSupply

The maximum amount of each tokenId to be issued.

### \_tokenIdCounter

The value that currently manages how many tokenId minted.

### baseUri

Default metadata URI for each tokenId.

### keyOwners

An array that manages the tokenId of which the address is the owner.

## Constructor

Set initial values.

## External Write Functions

### setBaseURI

Function to update baseUri.

### setTokenURI

Function to set tokenUri for each tokenId.
Only the token owner can execute this function.

### updateMaxSupply

Function to update the maximum issuance amount for each tokenId.
Only addresses with DEFAULT_ADMIN_ROLE can execute this function.

### mint

Function to issue NFT.
Mint with tokenId incremented if executed from an address that is not the token owner.
Only NFTs of your own address can be issued.
Default metadata is set.
If you are already the owner of one of the tokenId, Mint the NFT for the specified amount.
Only addresses with MINTER_ROLE can execute.
This address is a proxy contract for LongStarShareV1.

### grantMintRole

Function to grant MINTER_ROLE.
Assumed to be executed after deploying LongStarShareV1 contract.

### setTokenRoyalty

Function to set the royalty per tokenId.
Only the owner address of tokenId can execute this function.
