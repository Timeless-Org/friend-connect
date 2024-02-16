import { BigNumber, Contract, ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import longStarShareAbi from "@utils/abi/longStarShare.json";
import { LONG_STAR_SHARE_CONTRACT_ADDRESS } from "@utils/config";

export const ethersContract = async (provider: Web3Provider) => {
  const signer = provider.getSigner();
  const gasPrice = await provider.getGasPrice();

  const keyNftShareContract = new ethers.Contract(
    LONG_STAR_SHARE_CONTRACT_ADDRESS,
    longStarShareAbi,
    signer
  );

  return { keyNftShareContract, gasPrice };
};

export const estimateGas = async (
  contract: Contract,
  parameters: { address: string; num: number },
  gasPrice: BigNumber
) => {
  const estimatedGas = await contract.estimateGas.buyShares(parameters.address, parameters.num);

  const estimatedGasCost = estimatedGas.mul(gasPrice);

  return estimatedGasCost;
};
