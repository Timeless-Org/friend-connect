'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import {
  faAngleLeft,
  faBell,
  faBookmark,
  faShareNodes,
  faBookmark as faBookmarkRegister
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { blastSepolia } from '@/lib/chain'
import { ethersContract } from '@/lib/ethersContract'
import KeyTradeModal from '@components/Modal/KeyTradeModal'
import { Input } from '@components/ui/input'
import { createMessage, getUser, getUserChat, getWatchlist, updateWatchlist } from '@utils/api'
import { SHARE_TEXT } from '@utils/config'
import { IAddress, IUser, IUserAddress, IUserMessage } from '@utils/types'

const ChatRoom = () => {
  const { user } = usePrivy()
  const { wallets } = useWallets()
  const wallet = wallets[0]
  const router = useRouter()
  const pathname = usePathname()
  const address = String(pathname.split('/')[2])
  const currentAddress: string = user?.wallet?.address || ''

  const [isKeyTradeModalDisplay, setIsKeyTradeModalDisplay] = useState<boolean>(false)
  const [inputMessage, setInputMessage] = useState<string>('')
  const [userData, setUserData] = useState<IUser>()
  const [isRegisterBookmark, setIsRegisterBookmark] = useState<boolean>(false)
  const [holderAmount, setHolderAmount] = useState<number>(0)
  const [holdingAmount, setHoldingAmount] = useState<number>(0)
  const [isPendingHolder, setIsPendingHolder] = useState<boolean>(false)
  const [isBuy, setIsBuy] = useState<boolean>(false)
  const [chats, setChats] = useState<IUserMessage>()

  const changePrePage = () => {
    router.push('/chat')
  }

  const updateBookmark = async () => {
    try {
      if (currentAddress) {
        await updateWatchlist(currentAddress, address)
        await getWatchlistUserData(address)
      }
    } catch (e) {}
  }

  const getWatchlistUserData = useCallback(
    async (_address: string) => {
      if (address) {
        const watchlistUserData = await getWatchlist(address)
        const isAddressRegister = watchlistUserData.some((userAddress: IUserAddress) => {
          return userAddress.address.toLowerCase() === _address.toLowerCase()
        })
        setIsRegisterBookmark(isAddressRegister)
      }
    },
    [address]
  )

  const getChat = async (_address: string) => {
    const data = await getUserChat(_address)
    setChats(data)
  }

  const sendMessage = async (objectAddress: string, message: string) => {
    await createMessage(currentAddress, objectAddress, message)
    setInputMessage('')
    await getChat(address)
  }

  const openTradeModal = async (isBuy: boolean) => {
    setIsBuy(isBuy)
    setIsKeyTradeModalDisplay(true)
  }

  const closeModal = () => {
    setIsKeyTradeModalDisplay(false)
  }

  const endOfMessagesRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (endOfMessagesRef.current) {
        endOfMessagesRef.current.scrollIntoView({ behavior: 'instant' })
      }
    }, 100) // 100ミリ秒後に実行

    return () => clearTimeout(timer) // クリーンアップ関数でタイマーをクリア
  }, [chats])

  useEffect(() => {
    const getUserData = async (address: string) => {
      const user = await getUser(address)
      setUserData(user)
    }
    if (address && !userData) {
      getUserData(address)
    }
  }, [address, userData])

  useEffect(() => {
    const getHolder = async () => {
      try {
        setIsPendingHolder(true)
        await wallet.switchChain(blastSepolia.id)
        const provider = await wallet.getEthersProvider()
        const { keyNftShareContract } = await ethersContract(provider)
        const holders: bigint = await keyNftShareContract.sharesSupply(address)
        const hold: bigint = await keyNftShareContract.sharesBalance(address, address)
        setHolderAmount(Number(holders))
        setHoldingAmount(Number(hold))
        setIsPendingHolder(false)
      } catch (e) {}
    }

    if (wallet && holdingAmount === 0 && holderAmount === 0) getHolder()
  }, [address, holderAmount, holdingAmount, wallet])

  useEffect(() => {
    if (address) getChat(address)
  }, [address])

  return (
    <div className="my-4 flex w-full flex-col items-center justify-between h-full">
      <KeyTradeModal
        address={address as IAddress}
        shareObject={address as IAddress}
        isModalDisplay={isKeyTradeModalDisplay}
        closeModal={closeModal}
        isBuy={isBuy}
        name={userData?.name || ''}
        icon={userData?.icon || ''}
        ownKey={1}
        wallet={wallet}
      />
      <div className="inline-flex w-full flex-col items-stretch justify-between border-b border-gray24 px-4 pb-3 z-10 bg-white fixed top-0 pt-4">
        <div className="flex items-center justify-between space-x-3">
          <div className="inline-flex items-center justify-center space-x-3">
            <button type="button" className="inline-flex items-center" onClick={changePrePage}>
              <FontAwesomeIcon icon={faAngleLeft} className="h-5" />
            </button>
            <Image src={userData?.icon || ''} alt="user" className="left-12 rounded-full" width={40} height={40} />
            <div className="inline-flex flex-col">
              <p className="font-semibold">{userData?.name}</p>
              <div className="flex items-center space-x-1 text-gray20">
                <p className={`${userData?.is_online ? 'bg-green' : 'bg-red'} block size-2 rounded-full`} />
                <p className="text-sm">{userData?.is_online ? 'Online now' : 'Offline'}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray60">
            <Link
              className="flex w-10 h-10 items-center justify-center p-2 rounded-full bg-squareGray"
              href={`twitter://user?screen_name=${userData?.twitter_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} className="h-5" />
            </Link>
            <Link
              className="flex w-10 h-10 items-center justify-center p-2 rounded-full bg-squareGray"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faShareNodes} className="h-5" />
            </Link>
            <button
              type="button"
              className={`${currentAddress.toLowerCase() === address.toLowerCase() ? 'hidden' : 'flex'} w-10 h-10 items-center justify-center p-2 rounded-full bg-squareGray`}
              onClick={
                currentAddress.toLowerCase() === userData?.address.toLowerCase() ? () => {} : () => updateBookmark()
              }
            >
              <FontAwesomeIcon icon={isRegisterBookmark ? faBookmarkRegister : faBookmark} className="h-5" />
            </button>
          </div>
        </div>
        <div className="mt-6 flex w-full justify-around text-sm font-semibold">
          {isPendingHolder ? (
            <p className="size-4 animate-spin rounded-full border-4 border-orange border-t-transparent" />
          ) : (
            <p>{holderAmount} holders</p>
          )}
          {isPendingHolder ? (
            <p className="size-4 animate-spin rounded-full border-4 border-orange border-t-transparent" />
          ) : (
            <p>{holdingAmount} holdings</p>
          )}
          <p>1 watchlists</p>
        </div>
        <div className="mt-6 inline-flex w-full flex-col space-y-2 rounded-lg bg-squareGray p-4 text-sm font-semibold text-gray60">
          <div className="inline-flex items-center justify-between">
            <p>Key price:</p>
            <p>
              <span className="text-black">{userData?.key_price}</span> ETH
            </p>
          </div>
          <div className={`${userData?.register ? 'hidden' : 'block'} inline-flex items-center justify-between`}>
            <p>You own:</p>
            {isPendingHolder ? (
              <p className="size-4 animate-spin rounded-full border-4 border-orange border-t-transparent" />
            ) : (
              <p>
                <span className="text-black">{holdingAmount}</span> Key
              </p>
            )}
          </div>
        </div>
        <div className="mt-6 flex w-full items-center justify-between space-x-4 text-sm font-semibold">
          <button
            type="button"
            className=" w-1/2 rounded-full bg-redThin py-2 text-center text-red"
            onClick={() => openTradeModal(false)}
          >
            SELL
          </button>
          <button
            type="button"
            className=" w-1/2 rounded-full bg-greenThin py-2 text-center text-green"
            onClick={() => openTradeModal(true)}
          >
            BUY
          </button>
        </div>
      </div>
      <div className="flex w-full flex-col justify-end mt-64 pb-20">
        {chats?.Messages?.map((message, index) => (
          <div
            key={index}
            className={`mx-4 flex items-center justify-between mt-2 ${
              currentAddress.toLowerCase() === message.User.address.toLowerCase()
                ? 'self-end flex-row-reverse'
                : 'self-start'
            }`}
          >
            <Image
              src={message.User.icon}
              alt="user"
              className={`w-full rounded-full ${currentAddress.toLowerCase() === message.User.address.toLowerCase() ? 'hidden' : 'block mr-2'}`}
              width={50}
              height={50}
            />
            <p className="rounded-lg bg-grayThin p-2">{message.text}</p>
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>
      <div className="fixed bottom-0 mx-4 flex w-full justify-center border-t border-gray24 py-4 bg-white">
        <div className="flex w-full max-w-sm items-center justify-center space-x-2 rounded-lg border border-gray24 pr-3 h-full">
          <Input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="mr-3 flex-1 rounded-lg border-none bg-white px-4 py-2 text-zinc-700 ring-0 focus:border-0 focus:ring-0 active:border-0 active:ring-0"
          />
          <button type="button" onClick={() => sendMessage(userData?.address || '', inputMessage)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 24 24"
              className="text-gray80"
            >
              <path fill="currentColor" d="M3 20v-6l8-2l-8-2V4l19 8z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom
