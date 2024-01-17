# FriendConnectShareV1

## Overview

Friend.tech contract with Key as NFT.

## Storage

### keyNft

Key NFT contract address.

### protocolFeeDestination

The address of the operation that will receive the commission.

### protocolFeePercent

Percentage of commission received by the operation.

### subjectFeePercent

Percentage of commission received by the Key owner.

### sharesBalance

An array that manages how much of each Key NFT is held by a particular address.

### sharesSupply

An array that manages how many of each Key NFT have been issued.

## INITIALIZER

Initialization functions.
Upgradable contract assumptions.
Arguments are defined in interface.

## EXTERNAL WRTIE FUNCTIONS

### buyShares

Function to purchase a Key NFT.
Issue one Key NFT if you do not already hold your own Key NFT.
Otherwise, mints the Key NFTs you wish to purchase.
Finally, the proceeds are sent to the management and the owner of the Key NFT.

### sellShares

Function to sell a Key NFT.
The sold Key NFT is assumed to burn, so approveForAll is executed.
The sold amount is sent to the management, the owner of the Key NFT, and the selling user.
