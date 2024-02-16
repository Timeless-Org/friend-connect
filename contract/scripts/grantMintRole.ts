import { ContractFactory } from "ethers";
import { ethers } from "hardhat";
import { LongStarKey } from "../types/contracts/";

const main = async () => {
  try {

    const longStarKeyShareContractAddress =
      "0xD688acB676771F6aA01114c78A39E594564d3944";
    const longStarKeyContractAddress = "0x107b6346D6ce20585F2eD129797cB5EF7129cd17";

    const contractFactory: ContractFactory = await ethers.getContractFactory(
      "LongStarKey"
    );
    const longStarKeyContract: LongStarKey = <LongStarKey>(
      contractFactory.attach(longStarKeyContractAddress)
    );

    const transaction = await longStarKeyContract.grantMintRole(
      longStarKeyShareContractAddress
    );
    await transaction.wait();
    console.log(
      `🚀 Grant Role Transaction Hash: ${transaction.hash}`
    );

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
