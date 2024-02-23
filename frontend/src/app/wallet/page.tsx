'use client'

import { useCallback, useEffect, useState } from 'react'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { faArrowsRotate, faCheck, faDownload, faPiggyBank } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import Image from 'next/image'
import { blastSepolia } from '@/lib/chain'
import { formatEther } from '@/lib/common'
import { ethersContract } from '@/lib/ethersContract'
import { getUser } from '@/utils/api'
import { truncateString } from '@/utils/common'
import MessageModal from '@components/Modal/MessageModal'
import WithdrawModal from '@components/Modal/withdrawModal'
import Copy from '@components/common/Copy'
import Footer from '@components/common/Footer'
import Header from '@components/common/Header'
import OrangeButton from '@components/common/OrangeButton'
import { IAddress, IUser } from '@utils/types'

export default function Wallet() {
  const { wallets } = useWallets()
  const embeddedWallet = wallets[0]
  const { user, ready, authenticated, exportWallet } = usePrivy()
  const address = (user?.wallet?.address as IAddress) || '0x'

  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [balance, setBalance] = useState<number | null>(0)
  const [keyNftPrice, setKeyNftPrice] = useState<number>(0)
  const [isWithdrawModalDisplay, setIsWithdrawModalDisplay] = useState<boolean>(false)
  const [isErrorModalDisplay, setIsErrorModalDisplay] = useState<boolean>(false)
  const [userData, setUserData] = useState<IUser>()

  const isAuthenticated = ready && authenticated

  const hasEmbeddedWallet = !!user?.linkedAccounts.find(
    (account) => account.type === 'wallet' && account.walletClient === 'privy'
  )

  const getBalance = useCallback(async () => {
    if (embeddedWallet) {
      await embeddedWallet.switchChain(blastSepolia.id)
      const provider = await embeddedWallet.getEthersProvider()
      const currentBalance = await provider.getBalance(address)
      const formatBalance = Math.floor(formatEther(currentBalance) * 100000) / 100000
      setBalance(formatBalance)
    }
  }, [address, embeddedWallet])

  const getKeyNftPrice = useCallback(async () => {
    if (embeddedWallet) {
      await embeddedWallet.switchChain(blastSepolia.id)
      const provider = await embeddedWallet.getEthersProvider()
      const { keyNftShareContract } = await ethersContract(provider)
      const keyNftPrice = await keyNftShareContract.getBuyPrice(address, 1)
      const formatPrice = Math.floor(formatEther(keyNftPrice) * 10000) / 10000
      setKeyNftPrice(formatPrice)
    }
  }, [address, embeddedWallet])

  const closeModal = () => {
    setIsErrorModalDisplay(false)
    setIsWithdrawModalDisplay(false)
  }

  useEffect(() => {
    if (balance === 0) {
      getBalance()
    }
    if (keyNftPrice === 0) {
      getKeyNftPrice()
    }
  }, [address, balance, getBalance, getKeyNftPrice, keyNftPrice, wallets])

  useEffect(() => {
    const getUserData = async (address: string) => {
      const user = await getUser(address)
      setUserData(user)
    }
    if (user?.wallet?.address && !userData?.icon) {
      getUserData(user?.wallet?.address)
    }
  }, [user, userData])

  return (
    <>
      <Header />
      <div className="mt-24 flex w-full flex-col items-center justify-center space-y-6 px-4">
        <MessageModal message={address} isModalDisplay={isErrorModalDisplay} closeModal={closeModal} />
        <WithdrawModal isModalDisplay={isWithdrawModalDisplay} closeModal={closeModal} />
        <div className="mt-6 flex w-full items-center justify-between">
          <div className="inline-flex items-center justify-center space-x-3">
            <Image src={userData?.icon || ''} alt="user" className="rounded-full" width={48} height={48} />
            <div className="inline-flex flex-col items-start justify-center">
              <p className="font-semibold">{userData?.name}</p>
              <div className="inline-flex items-center space-x-3">
                <p>{truncateString(address || '', 10)}</p>
                <Copy
                  copyText={address || ''}
                  content={
                    <FontAwesomeIcon
                      icon={isCopied ? faCheck : faCopy}
                      className="h-4 rounded-full bg-squareGray p-2 text-gray60"
                    />
                  }
                  setIsCopied={setIsCopied}
                />
              </div>
            </div>
          </div>
          <div className="inline-flex items-center space-x-3 rounded-full border px-3 py-1">
            <FontAwesomeIcon icon={faArrowsRotate} className="h-4" />
            <p>Sync</p>
          </div>
        </div>
        <div className="inline-flex w-full flex-col">
          <p className="font-semibold">Assets</p>
          <div className="inline-flex w-full space-x-2">
            <div className="inline-flex w-1/2 flex-col items-center justify-center space-y-2 rounded-xl bg-squareGray p-2 text-gray60">
              <p className="font-semibold">Wallet balance</p>
              <div className="inline-flex items-center space-x-3">
                <FontAwesomeIcon icon={faEthereum} className="size-4 rounded-full bg-black p-2 text-orange" />
                <p>
                  <span className="font-semibold text-black">{balance}</span> ETH
                </p>
              </div>
            </div>
            <div className="inline-flex w-1/2 flex-col items-center justify-center space-y-2 rounded-xl bg-squareGray p-2 text-gray60">
              <p className="font-semibold">Portfolio value</p>
              <div className="inline-flex items-center space-x-3">
                <FontAwesomeIcon icon={faPiggyBank} className="size-4 rounded-full bg-black p-2 text-orange" />
                <p>
                  <span className="font-semibold text-black">{keyNftPrice}</span> ETH
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-around">
          <div className="inline-flex flex-col items-center justify-center space-y-3">
            <button type="button" onClick={() => setIsErrorModalDisplay(true)}>
              <FontAwesomeIcon icon={faDownload} className="h-4 rounded-full border p-4" />
            </button>
            <p className="font-semibold">Deposit on chain</p>
          </div>
          <div className="inline-flex flex-col items-center justify-center space-y-3">
            <button
              type="button"
              className="flex items-center justify-center rounded-full border p-3"
              onClick={() => setIsWithdrawModalDisplay(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 24 24"
                className="pl-1 text-center text-gray80"
              >
                <path fill="currentColor" d="M3 20v-6l8-2l-8-2V4l19 8z" />
              </svg>
            </button>
            <p className="font-semibold">Withdraw</p>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <OrangeButton
            text={'Export Private Key'}
            buttonAction={exportWallet}
            disabled={!isAuthenticated || !hasEmbeddedWallet}
          />
        </div>
      </div>
      <Footer />
    </>
  )
}
