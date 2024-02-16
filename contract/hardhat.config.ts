import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-foundry";
import "@openzeppelin/hardhat-upgrades";
import "dotenv/config";
import "@nomiclabs/hardhat-solhint";
import "@typechain/hardhat";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
if (!PRIVATE_KEY) {
  throw new Error("Please set your PRIVATE_KEY in a .env file");
}
const SUB_PRIVATE_KEY = process.env.SUB_PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    blast_sepolia: {
      url: "https://sepolia.blast.io",
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 168587773,
    },
    blast_sepolia_sub: {
      url: "https://sepolia.blast.io",
      accounts: [`0x${SUB_PRIVATE_KEY}`],
      chainId: 168587773,
    },
    // blast: {
    //   url: POLYGON_RPC_URL,
    //   accounts: [`0x${process.env.PRIVATE_KEY}`],
    //   chainId: 137,
    // },
  },
  etherscan: {
    apiKey: {
      blast_sepolia: "blast_sepolia", // apiKey is not required, just set a placeholder
    },
    customChains: [
      {
        network: "blast_sepolia",
        chainId: 168587773,
        urls: {
          apiURL:
            "https://api.routescan.io/v2/network/testnet/evm/168587773/etherscan",
          browserURL: "https://testnet.blastscan.io",
        },
      },
    ],
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
    alwaysGenerateOverloads: true,
    externalArtifacts: ["externalArtifacts/*.json"],
    dontOverrideCompile: false,
  },
};

export default config;
