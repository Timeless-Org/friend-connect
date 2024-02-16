import { ethers, upgrades } from "hardhat";

async function main() {
  const baseUri = "https://example.com/";

  const longStarKeyContract = await ethers.deployContract("LongStarKey", [
    baseUri,
  ]);
  await longStarKeyContract.waitForDeployment();

  const longStarKeyContractAddress = await longStarKeyContract.getAddress();

  console.log("🚀 LongStarKey deployed to:", longStarKeyContractAddress);

  const LongStarShareFactory = await ethers.getContractFactory(
    "LongStarShareV1"
  );

  const longStarShareContract = await upgrades.deployProxy(
    LongStarShareFactory,
    [{ keyNft: longStarKeyContractAddress }],
    { initializer: "initialize" },
  );

  await longStarShareContract.waitForDeployment();

  console.log(
    "🚀 longStarShareContract(Proxy) deployed to:",
    await longStarShareContract.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
