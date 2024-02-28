import { Web3Provider } from '@ethersproject/providers'
import { BigNumber, Contract, ethers } from 'ethers'
import longStarKeyAbi from '@utils/abi/longStarKey.json'
import longStarShareAbi from '@utils/abi/longStarShare.json'
import { LONG_STAR_SHARE_CONTRACT_ADDRESS, NEXT_PUBLIC_LONG_STAR_KEY_CONTRACT_ADDRESS } from '@utils/config'

export const ethersContract = async (provider: Web3Provider) => {
  const signer = provider.getSigner()
  const gasPrice = await provider.getGasPrice()

  const keyNftShareContract = new ethers.Contract(LONG_STAR_SHARE_CONTRACT_ADDRESS, longStarShareAbi, signer)

  const keyNftContract = new ethers.Contract(NEXT_PUBLIC_LONG_STAR_KEY_CONTRACT_ADDRESS, longStarKeyAbi, signer)

  return { keyNftShareContract, keyNftContract, gasPrice }
}

export const estimateGas = async (
  contract: Contract,
  parameters: { address: string; num: number },
  gasPrice: BigNumber
) => {
  const estimatedGas = await contract.estimateGas.buyShares(parameters.address, parameters.num)

  const estimatedGasCost = estimatedGas.mul(gasPrice)

  return estimatedGasCost
}
