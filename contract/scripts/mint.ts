import { ContractFactory } from "ethers";
import { ethers } from "hardhat";
import { LongStarShareV1 } from "../types/contracts/";

const main = async () => {
  try {
    const shareSubject = "0x4fc7b40cd8757bD279A848293501dc0695321399";
    const contractAddress = "0xD688acB676771F6aA01114c78A39E594564d3944"; // テスト環境

    const contractFactory: ContractFactory = await ethers.getContractFactory(
      "LongStarShareV1"
    );
    const contract: LongStarShareV1 = <LongStarShareV1>(
      contractFactory.attach(contractAddress)
    );
    const transaction = await contract.buyShares(shareSubject, 1, { gasLimit: 2000000 });
    await transaction.wait();
    console.log(`🚀 Mint Transaction Hash: ${transaction.hash}`);
  } catch (error) {
    console.error(error);
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
