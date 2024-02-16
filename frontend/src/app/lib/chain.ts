import { type Chain } from "viem";

export const blastSepolia = {
  id: 168587773,
  name: "Blast Sepolia",
  nativeCurrency: { name: "Blast ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://sepolia.blast.io"] },
  },
  blockExplorers: {
    default: { name: "testnet.Blastscan", url: "https://etherscan.io" },
  },
} as const satisfies Chain;
