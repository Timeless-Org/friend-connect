# Friend Connect Key

## Test

### LongStarKey

```sh
forge test --match-path test/foundry/LongStarKey.t.sol -vvvv
```

### LongStarShareV1

```bash
forge test --match-contract LongStarShareV1 -vvvv
```

## Deploy

### Testnet

```bash
npx hardhat run scripts/deploy.ts --network blast_sepolia
```

## Verify

```bash
npx hardhat verify --network blast_sepolia
```

or

```bash
npx hardhat verify --network blast_sepolia <contract address> "https://example.com/"
```

## Script

### Mint

```bash
npx hardhat run scripts/mint.ts --network blast_sepolia_sub
```

### GrantRole

```bash
npx hardhat run scripts/grantMintRole.ts --network blast_sepolia
```

| Contract Name | Network | Address |
| --- | --- | --- |
| LongStarKey | Blast Sepolia | `0x107b6346D6ce20585F2eD129797cB5EF7129cd17` |
| LongStarShareV1 | Blast Sepolia | `0xD688acB676771F6aA01114c78A39E594564d3944` |
