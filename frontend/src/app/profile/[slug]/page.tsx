'use client'

import React, { useEffect, useState } from 'react'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import { faShareNodes, faAngleLeft, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWallets, usePrivy } from '@privy-io/react-auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { blastSepolia } from '@/lib/chain'
import { ethersContract } from '@/lib/ethersContract'
import { getUser } from '@/utils/api'
import { SHARE_TEXT } from '@/utils/config'
import { IAddress, IUser } from '@/utils/types'
import EditBioModal from '@components/Modal/EditBioModal'
import KeyTradeModal from '@components/Modal/KeyTradeModal'
import SideMenuTab from '@components/SideMenu/SideMenuTab'

const Profile = () => {
  const { user } = usePrivy()
  const { wallets } = useWallets()
  const wallet = wallets[0]
  const router = useRouter()
  const pathname = usePathname()
  const address = String(pathname.split('/')[2])

  const [isKeyTradeModalDisplay, setIsKeyTradeModalDisplay] = useState<boolean>(false)
  const [isEditBioModalDisplay, setIsEditBioModalDisplay] = useState<boolean>(false)
  const [isBuy, setIsBuy] = useState<boolean>(false)
  const [userData, setUserData] = useState<IUser>()
  const [holderAmount, setHolderAmount] = useState<number>(0)
  const [holdingAmount, setHoldingAmount] = useState<number>(0)
  const [isPendingHolder, setIsPendingHolder] = useState<boolean>(false)

  const openTradeModal = async (isBuy: boolean) => {
    setIsBuy(isBuy)
    setIsKeyTradeModalDisplay(true)
  }

  const closeModal = () => {
    setIsKeyTradeModalDisplay(false)
    setIsEditBioModalDisplay(false)
  }

  useEffect(() => {
    const getUserData = async (address: string) => {
      const user = await getUser(address)
      setUserData(user)
    }
    if (address && !userData) {
      getUserData(address)
    }
  }, [address, user, userData])

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

  return (
    <div className="fixed left-0 top-0 z-50 size-full bg-white transition-transform duration-300">
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
      <EditBioModal address={address} isModalDisplay={isEditBioModalDisplay} closeModal={closeModal} />
      <div className="flex h-16 w-full items-center justify-between bg-black px-4">
        <button type="button" onClick={() => router.back()}>
          <FontAwesomeIcon icon={faAngleLeft} className="h-6 text-white" />
        </button>
        <p className="mr-2 text-lg font-semibold text-white">@ {userData?.twitter_id}</p>
        <p />
      </div>
      <div className="mt-6 flex flex-col items-start justify-center px-4">
        <div className="flex w-full justify-between space-x-3">
          <div className="inline-flex items-center justify-center">
            <Image src={userData?.icon || ''} alt="user" className="left-12 rounded-full" width={50} height={50} />
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray60">
            <Link
              className="flex h-4 items-center justify-center"
              href={`twitter://user?screen_name=${userData?.twitter_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} className="h-4 rounded-full bg-squareGray p-3" />
            </Link>
            <Link
              className="flex h-4 items-center justify-center"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faShareNodes} className="h-4 rounded-full bg-squareGray p-3" />
            </Link>
            <button
              type="button"
              className="flex h-4 items-center justify-center"
              onClick={() => setIsEditBioModalDisplay(true)}
            >
              <FontAwesomeIcon icon={faPen} className="h-4 rounded-full bg-squareGray p-3" />
            </button>
            <FontAwesomeIcon
              icon={faMessage}
              className={`${userData?.register ? 'hidden' : 'block'} h-4 rounded-full bg-squareGray p-3`}
            />
          </div>
        </div>
        <div className="mt-4 inline-flex items-center justify-start space-x-3">
          <p className="font-semibold text-gray60">{userData?.name}</p>
          <p className="rounded-md bg-squareGray px-3 py-1 text-xs text-gray60">#{userData?.ranking}</p>
          <div className="flex items-center space-x-1 text-gray60">
            <p className={`${true ? 'bg-green' : 'bg-red'} block size-2 rounded-full`} />
            <p className="text-sm">{userData?.is_online ? 'Online now' : 'Offline'}</p>
          </div>
        </div>
        <div className="mt-2 inline-flex items-center justify-start">
          <p className="text-gray60">{userData?.biography}</p>
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
      <SideMenuTab address={address} isMenuContentOpen={true} userData={userData} />
    </div>
  )
}

export default Profile
