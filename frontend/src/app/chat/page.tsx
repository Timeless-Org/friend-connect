'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Footer from '@components/common/Footer'
import Header from '@components/common/Header'
import { IChat } from '@utils/types'

export default function Keys() {
  const [chats, setChats] = useState<IChat[]>([])

  const router = useRouter()

  useEffect(() => {
    const data = []
    for (let i = 0; i < 10; i++) {
      data.push({
        userIcon: 'Cardene',
        userName: 'Cardene',
        timestamp: '12:00',
        latestMessage: 'Hello',
        keyPrice: 0.01,
        value: 0.002,
        unReadMessage: 2,
        kingMark: true
      })
    }
    setChats(data)
  }, [])
  return (
    <>
      <Header />
      <div className="mb-16 mt-28 flex size-full flex-col items-center justify-center px-4">
        {chats.map((chat, index) => (
          <button
            type="button"
            className="flex w-full items-center justify-between py-2"
            key={index}
            onClick={() => router.push(`/chat/${chat.userName}`)}
          >
            <div className="flex h-full space-x-3">
              <div className="flex items-center">
                <Image
                  src="/static/img/user/user1.png"
                  alt="user"
                  className="left-12 rounded-full"
                  width={48}
                  height={48}
                />
              </div>
              <div className="flex flex-col items-start justify-center space-y-1">
                <div className="inline-flex items-center justify-center space-x-2">
                  <p className="font-semibold">{chat.userName}</p>
                  <p className="rounded-lg bg-squareGray p-1 text-sm text-gray80">
                    <span className="font-semibold">{chat.keyPrice} ETH</span> ($0.00)
                  </p>
                </div>
                <div className="flex space-x-3">
                  <p>{chat.latestMessage}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end justify-center space-y-1">
              <p className="text-gray80">{chat.timestamp}</p>
              <p className="size-6 items-center rounded-full bg-black text-center text-orange">{chat.unReadMessage}</p>
            </div>
          </button>
        ))}
        {/* <p className="h-full flex justify-center items-center">Comming soon ...</p> */}
      </div>
      <Footer />
    </>
  )
}
