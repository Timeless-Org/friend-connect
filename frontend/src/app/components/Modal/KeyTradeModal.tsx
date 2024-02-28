import { useEffect, useState } from 'react'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { faQuestion, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ConnectedWallet } from '@privy-io/react-auth'
import Image from 'next/image'
import { blastSepolia } from '@lib/chain'
import { formatEther } from '@lib/common'
import { ethersContract } from '@lib/ethersContract'
import { createTrade } from '@utils/api'
import { LONG_STAR_SHARE_CONTRACT_ADDRESS } from '@utils/config'
import { IAddress } from '@utils/types'

interface IKeyTradeModal {
  address: IAddress
  shareObject: IAddress
  isModalDisplay: boolean
  closeModal: () => void
  isBuy: boolean
  name: string
  icon: string
  ownKey: number
  wallet: ConnectedWallet
}
const KeyTradeModal = ({
  address,
  shareObject,
  isModalDisplay,
  closeModal,
  isBuy,
  name,
  icon,
  ownKey,
  wallet
}: IKeyTradeModal) => {
  const [displayKeyPrice, setDisplayKeyPrice] = useState<number>(0)
  const [isDoneTradeKeyNft, setIsDoneTradeKeyNft] = useState<boolean>(false)
  const [isPending, setIsPending] = useState<boolean>(false)
  const [isFailed, setIsFailed] = useState<boolean>(false)
  const [isPendingSetKeyPrice, setIsPendingSetKeyPrice] = useState<boolean>(false)

  const handleContainerClick = () => {
    closeModal()
  }

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  const tradeKey = async (_address: IAddress, _isBuy: boolean) => {
    try {
      if (wallet) {
        await wallet.switchChain(blastSepolia.id)
        const provider = await wallet.getEthersProvider()
        const { keyNftShareContract, keyNftContract, gasPrice } = await ethersContract(provider)
        let transaction
        setIsPending(true)
        const buyPrice = await keyNftShareContract.getBuyPrice(_address, 1)

        console.log(`buyPrice: ${buyPrice}`)

        if (_isBuy) {
          const estimateGas = await keyNftShareContract.estimateGas.buyShares(_address, 1, { value: buyPrice })

          const gasLimit = estimateGas.mul(120).div(100) // 20% more than estimated gas
          transaction = await keyNftShareContract.buyShares(_address, 1, {
            gasPrice,
            gasLimit,
            value: buyPrice
          } as any)
        } else {
          await keyNftContract.setApprovalForAll(LONG_STAR_SHARE_CONTRACT_ADDRESS, true)
          const estimateGas = await keyNftShareContract.estimateGas.sellShares(_address, 1)

          const gasLimit = estimateGas.mul(120).div(100) // 20% more than estimated gas
          transaction = await keyNftShareContract.sellShares(_address, 1, {
            gasPrice,
            gasLimit
          } as any)
        }
        await transaction.wait()
        const formatBalance = Math.floor(formatEther(buyPrice) * 100000) / 100000
        await createTrade(address, _address, formatBalance, 1, _isBuy)
        setIsPending(false)
        setIsDoneTradeKeyNft(true)
        setTimeout(() => {
          closeModal()
          setIsDoneTradeKeyNft(false)
        }, 1000)
      }
    } catch (err: any) {
      setIsPending(false)
      setIsFailed(true)
      setTimeout(() => {
        closeModal()
        setIsFailed(false)
      }, 1000)
    }
  }

  useEffect(() => {
    const getKeyNftPrice = async () => {
      try {
        setIsPendingSetKeyPrice(true)
        await wallet.switchChain(blastSepolia.id)
        const provider = await wallet.getEthersProvider()
        const { keyNftShareContract } = await ethersContract(provider)
        let keyNftPrice
        if (isBuy) {
          keyNftPrice = await keyNftShareContract.getBuyPrice(shareObject, 1)
        } else {
          keyNftPrice = await keyNftShareContract.getSellPrice(shareObject, 1)
        }
        const formatPrice = Math.floor(formatEther(keyNftPrice) * 100000) / 100000
        setDisplayKeyPrice(formatPrice)
        setIsPendingSetKeyPrice(false)
      } catch (err: any) {}
    }

    if (wallet && displayKeyPrice === 0) getKeyNftPrice()
  }, [displayKeyPrice, isBuy, shareObject, wallet])

  return (
    <div
      className={`${
        isModalDisplay ? 'flex' : 'hidden'
      } absolute inset-0 z-50 h-screen w-full items-center justify-center bg-gray20`}
      onClick={handleContainerClick}
    >
      <div
        className="mx-4 inline-flex h-1/3 w-full flex-col items-center justify-center rounded-xl bg-white px-6"
        onClick={handleContentClick}
      >
        {isDoneTradeKeyNft ? (
          <FontAwesomeIcon icon={faCircleCheck} className="size-20 text-gray60" />
        ) : isPending ? (
          <div className="inline-flex flex-col items-center justify-center space-y-4">
            <p className="size-16 animate-spin rounded-full border-4 border-orange border-t-transparent" />
            <p>Processing...</p>
          </div>
        ) : isFailed ? (
          <div className="inline-flex flex-col items-center justify-center space-y-6">
            <FontAwesomeIcon icon={faCircleExclamation} className="size-20 text-red" />
            <p className="text-lg font-semibold text-red">Fail Transaction ...</p>
          </div>
        ) : (
          <>
            <p className="text-2xl font-semibold ">Trade Keys</p>
            <div className="mt-8 flex w-full items-center justify-between space-x-4">
              <div className="inline-flex items-center space-x-2">
                <Image src={icon} alt="user" className="rounded-full" width={48} height={48} />
                <div className="inline-flex flex-col items-start justify-center">
                  <p className="font-semibold">{name}</p>
                  <p className="text-gray60">You own {ownKey} key</p>
                </div>
              </div>
              <div className={`${isPendingSetKeyPrice ? '' : 'bg-squareGray'} rounded-lg px-2 py-1`}>
                {isPendingSetKeyPrice ? (
                  <p className="size-6 animate-spin rounded-full border-4 border-orange border-t-transparent" />
                ) : (
                  <p className={`${isBuy ? 'text-green' : 'text-red'} text-sm font-semibold text-gray60`}>
                    {displayKeyPrice} ETH
                  </p>
                )}
              </div>
            </div>
            <div className="mt-6 flex w-full items-center justify-start space-x-2 font-semibold text-gray60">
              <FontAwesomeIcon icon={faQuestion} className="size-3 rounded-full border-2 border-gray60 p-1" />
              <p>Key Price</p>
            </div>
            <button
              type="button"
              className={`${
                isBuy ? 'bg-greenThin text-green' : 'bg-redThin text-red'
              } mt-6 w-full rounded-full py-3 font-semibold`}
              onClick={() => tradeKey(shareObject, isBuy)}
            >
              {isBuy ? 'Buy' : 'Sell'} a key
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default KeyTradeModal
