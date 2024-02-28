'use client'

import { useEffect, useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Footer from '@components/common/Footer'
import Header from '@components/common/Header'
import { getUserChats } from '@utils/api'
import { formatTime } from '@utils/common'
import { IChat } from '@utils/types'

export default function Keys() {
  const { user } = usePrivy()

  const [chats, setChats] = useState<IChat[]>([])

  const router = useRouter()

  const changeMessagePage = (address: string) => {
    router.push(`/chat/${address}`)
  }

  useEffect(() => {
    const getChats = async (_address: string) => {
      const data = await getUserChats(_address)
      setChats(data)
    }
    if (user?.wallet?.address) getChats(user.wallet.address)
  }, [user?.wallet?.address])

  return (
    <>
      <Header />
      <div className="mb-16 mt-28 flex size-full flex-col items-center justify-start px-4">
        {chats.map((chat, index) => (
          <button
            type="button"
            className="flex w-full items-center justify-between py-2"
            key={index}
            onClick={() => changeMessagePage(chat.User.address)}
          >
            <div className="flex h-full space-x-3">
              <div className="flex items-center">
                <Image src={chat.User.icon} alt="user" className="left-12 rounded-full" width={48} height={48} />
              </div>
              <div className="flex flex-col items-start justify-center space-y-1">
                <div className="inline-flex items-center justify-center space-x-2">
                  <p className="font-semibold">{chat.User.name}</p>
                  <p className="rounded-lg bg-squareGray p-1 text-sm text-gray80">
                    <span className="font-semibold">{chat.User.key_price} ETH</span> ($0.00)
                  </p>
                </div>
                <div className="flex space-x-3">
                  <p>{chat.Messages[0]?.text || ''}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end justify-start space-y-1 h-full">
              <p className="text-gray80">{formatTime(chat.Messages[0]?.created_at || '')}</p>
              <p className="bg-white "> </p>
            </div>
          </button>
        ))}
      </div>
      <Footer />
    </>
  )
}
