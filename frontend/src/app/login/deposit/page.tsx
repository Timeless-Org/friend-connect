'use client'

import { useCallback, useEffect, useState } from 'react'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { faArrowsRotate, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import LoadingModal from '@components/Modal/LoadingModal'
import IconCircle from '@components/common/IconCircle'
import Navigation from '@components/common/Navigation'
import { Button } from '@components/ui/button'
import { blastSepolia } from '@lib/chain'
import { formatEther } from '@lib/common'
import { copyClipboard } from '@utils/common'
import { IAddress } from '@utils/types'

export default function LoginDeposit() {
  const { user } = usePrivy()
  const address = (user?.wallet?.address as IAddress) || '0x'
  const { wallets } = useWallets()

  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [balance, setBalance] = useState<number | null>(0)
  const [isLoadingModalDisplay, setIsLoadingModalDisplay] = useState<boolean>(false)

  const router = useRouter()
  const changePrePage = () => {
    router.push('/login/twitter')
  }

  const handleCopy = async (copyText: string) => {
    try {
      await copyClipboard(copyText)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 1500)
    } catch (err) {}
  }

  const getBalance = useCallback(async () => {
    const embeddedWallet = wallets[0]
    if (embeddedWallet) {
      setIsLoadingModalDisplay(true)
      await embeddedWallet.switchChain(blastSepolia.id)
      const provider = await embeddedWallet.getEthersProvider()
      const currentBalance = await provider.getBalance(address)
      const formatBalance = Math.floor(formatEther(currentBalance) * 100000) / 100000
      setBalance(formatBalance)
      setIsLoadingModalDisplay(false)
    }
  }, [address, wallets])

  const closeErrorModal = () => {
    setIsLoadingModalDisplay(false)
  }

  useEffect(() => {
    if (balance === 0) {
      getBalance()
    }
  }, [address, balance, getBalance, wallets])

  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="flex h-screen w-full flex-col justify-between pb-5 pt-10">
        <LoadingModal isModalDisplay={isLoadingModalDisplay} />
        <div>
          <Navigation changePrePage={changePrePage} progressValue={42.9} pageNum={3} />
          <div className="mt-10 flex w-full flex-col items-start justify-center">
            <p className="text-lg font-semibold">Get Some ETH on Blast</p>
            <p className="mt-4 text-gray60">
              You&apos;ll use ETH, the official currency of Base, when you buy and sell your friends&apos; keys.
            </p>
          </div>
          <div className="mt-10 flex w-full flex-col items-start justify-center space-y-4">
            {/* <div className="w-full flex justify-between bg-squareGray py-6 px-4 rounded-xl items-center">
              <div className="flex items-center justify-center space-x-3">
                <IconCircle icon={faEthereum} />
                <div className="inline-flex flex-col items-start justify-center">
                  <p className="font-semibold text-gray">Deposit on mainnet</p>
                  <p className="text-sm">Can use another device</p>
                </div>
              </div>
              <Button variant="linkButton" className="font-semibold py-5">
                Deposit
              </Button>
            </div> */}
            <div className="flex w-full items-center justify-between rounded-xl bg-squareGray px-4 py-6">
              <div className="flex items-center justify-center space-x-3">
                <IconCircle icon={faCopy} />
                <div className="inline-flex flex-col items-start justify-center">
                  <p className="font-semibold text-gray">Receive on Blast</p>
                  <p className="text-sm">{`${address.substring(0, 8)}...${address.substring(address.length - 8)}`}</p>
                </div>
              </div>
              <Button
                variant="linkButton"
                className={`font-semibold ${isCopied ? 'p-3' : 'py-5'}`}
                onClick={() => handleCopy(address)}
              >
                {isCopied ? <FontAwesomeIcon icon={faCheck} className="h-4" /> : 'Copy'}
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-10 flex w-full flex-col px-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-semibold text-gray60">Wallet Balance:</p>
            <div className="flex items-center justify-center">
              <p className="mr-3 font-semibold">
                {balance || 0} <span className="text-gray60">ETH</span>
              </p>
              <button type="button" onClick={getBalance}>
                <FontAwesomeIcon icon={faArrowsRotate} className="h-4" />
              </button>
            </div>
          </div>
          <Button
            variant={balance !== null && balance >= 0.01 ? 'default' : 'roundedBtn'}
            className="h-12 w-full"
            onClick={() => router.push('/login/key')}
            disabled={!(balance !== null && balance >= 0.01)}
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  )
}
