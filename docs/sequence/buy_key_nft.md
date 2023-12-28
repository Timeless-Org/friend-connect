# Buy Key NFT

```mermaid
sequenceDiagram
    actor user as User
    participant front as Frontend
    participant bridge as Bridge Site
    participant back as Backend
    participant contract as Contract
    participant blockchain as Blockchain

    Note over user,blockchain: Buy User Key NFT
    user->>front: Click Buy Key NFT Btn
    front->>contract: get Key NFT Price
    contract-->>front: return Key NFT Price
    front->>front: Privy Request
    front->>front: Key NFT Buy Transaction Signed
    front->>contract: Buy Key Nft
    contract->>contract: Key NFT Price Update
    contract-->>user: Mint Key Nft
```
