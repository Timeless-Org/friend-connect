import { ethers, BigNumber } from "ethers";

export const formatEther = (value: BigNumber) => {
    return Number(ethers.utils.formatEther(value));
}
