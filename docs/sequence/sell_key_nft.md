# Sell Key NFT

```mermaid
sequenceDiagram
    actor user as User
    participant front as Frontend
    participant bridge as Bridge Site
    participant back as Backend
    participant contract as Contract
    participant blockchain as Blockchain

    Note over user,blockchain: Sell User Key NFT
    user->>front: Click Sell Key NFT Btn
    front->>contract: sell Key NFT Price
    contract-->>front: return Key NFT Price
    front->>front: Privy Request
    front->>front: Key NFT Sell Transaction Signed
    front->>contract: Sell Key Nft
    contract->>contract: Key NFT Price Update
    contract-->>user: Send ETH
```
