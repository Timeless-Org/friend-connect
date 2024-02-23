'use client'

import { useEffect, useState } from 'react'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faBookmark as registerBookmark } from '@fortawesome/free-regular-svg-icons'
import { faAngleLeft, faBell, faBookmark, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Input } from '@components/ui/input'
import { IMessage, IUser, IUserInfo } from '@utils/types'

const ChatRoom = () => {
  const [inputMessage, setInputMessage] = useState<string>('')
  const [currentUser, setCurrentUser] = useState<IUser>()
  const [userInfo, setUserInfo] = useState<IUserInfo>({})
  const [messageHistory, setMessageHistory] = useState<IMessage[]>([])

  const router = useRouter()
  const changePrePage = () => {
    router.push('/chat')
  }

  const sendMessage = async () => {
    setMessageHistory((prevMessages) => [
      ...prevMessages,
      {
        userIcon: currentUser?.icon || '',
        userName: currentUser?.name || '',
        timestamp: '12:00',
        message: inputMessage
      }
    ])
    setInputMessage('')
  }

  useEffect(() => {
    setUserInfo({
      objectUserIcon: 'Cardene',
      objectUserName: 'Cardene',
      objectTwitterUrl: 'http://twitter.com/cardene777',
      objectHolderCount: 5,
      objectHoldKeyNftCount: 3,
      objectWatchListCount: 2,
      objectKeyPrice: 0.01,
      userOwnKeyCount: 1,
      userIsRegisterWatchlist: true,
      objectIsOnline: true
    })
    setMessageHistory([
      {
        userIcon: '/static/img/user/user1.png',
        userName: 'Cardene',
        timestamp: '12:00',
        message: 'Hello'
      },
      {
        userIcon: '/static/img/user/user1.png',
        userName: 'Cardene',
        timestamp: '12:00',
        message: 'Hello'
      },
      {
        userIcon: '/static/img/user/user1.png',
        userName: 'Metamon',
        timestamp: '12:00',
        message: 'Hello'
      }
    ])
    setCurrentUser({
      name: 'Cardene',
      biography: "I'm a developer",
      icon: '/static/img/user/user2.png',
      key_img: '/static/img/user/user2.png',
      address: '0x1234567890',
      key_price: 0.01,
      ranking: 1,
      point: 100,
      is_online: true,
      last_login: '2021-10-01',
      created_at: new Date()
    })
  }, [])

  return (
    <div className="my-4 flex w-full flex-col items-center justify-center">
      <div className="inline-flex w-full flex-col items-stretch justify-between border-b border-gray24 px-4 pb-3">
        <div className="flex items-center justify-between space-x-3">
          <div className="inline-flex items-center justify-center space-x-3">
            <button type="button" className="inline-flex items-center" onClick={changePrePage}>
              <FontAwesomeIcon icon={faAngleLeft} className="h-5" />
            </button>
            <Image
              src="/static/img/user/user1.png"
              alt="user"
              className="left-12 rounded-full"
              width={40}
              height={40}
            />
            <div className="inline-flex flex-col">
              <p className="font-semibold">{userInfo.objectUserName}</p>
              <div className="flex items-center space-x-1 text-gray20">
                <p className={`${userInfo.objectIsOnline ? 'bg-green' : 'bg-red'} block size-2 rounded-full`} />
                <p className="text-sm">{userInfo.objectIsOnline ? 'Online now' : 'Offline'}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray60">
            <FontAwesomeIcon icon={faTwitter} className="h-4 rounded-full bg-squareGray p-2" />
            <FontAwesomeIcon icon={faShareNodes} className="h-4 rounded-full bg-squareGray p-2" />
            <FontAwesomeIcon
              icon={userInfo.userIsRegisterWatchlist ? registerBookmark : faBookmark}
              className="h-4 rounded-full bg-squareGray p-2"
            />
            <FontAwesomeIcon icon={faBell} className="h-4 rounded-full bg-squareGray p-2" />
          </div>
        </div>
        <div className="mt-6 flex justify-around text-sm font-semibold">
          <p>{userInfo.objectHolderCount} holders</p>
          <p>{userInfo.objectHoldKeyNftCount} holdings</p>
          <p>{userInfo.objectWatchListCount} watchlists</p>
        </div>
        <div className="mt-6 inline-flex flex-col space-y-2 rounded-lg  bg-squareGray px-4 py-2 text-sm font-semibold text-gray60">
          <div className="inline-flex items-center justify-between">
            <p>Key price:</p>
            <p>
              <span className="text-black">{userInfo.objectKeyPrice}</span> ETH
            </p>
          </div>
          <div className="inline-flex items-center justify-between">
            <p>You own:</p>
            <p>
              <span className="text-black">{userInfo.userOwnKeyCount}</span> key
            </p>
          </div>
        </div>
        <div className="mt-6 flex w-full items-center justify-between space-x-4 text-sm font-semibold">
          <p className=" w-1/2 rounded-full bg-redThin py-2 text-center text-red">SELL</p>
          <p className=" w-1/2 rounded-full bg-greenThin py-2 text-center text-green">BUY</p>
        </div>
      </div>
      <div className="flex w-full flex-col">
        {messageHistory.map((message, index) => (
          <div
            key={index}
            className={`mx-4 mt-2 ${
              currentUser?.name === message.userName
                ? 'self-end'
                : 'flex items-center justify-between space-x-3 self-start'
            }`}
          >
            <Image
              src={message.userIcon}
              alt="user"
              className={`w-full rounded-full ${currentUser?.name === message.userName ? 'hidden' : 'block'}`}
              width={44}
              height={44}
            />
            <p className="rounded-lg bg-grayThin p-2">{message.message}</p>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 mx-4 flex w-full justify-center border-t border-gray24 py-4 ">
        <div className="flex w-full max-w-sm items-center justify-center space-x-2 rounded-lg border border-gray24 pr-3">
          <Input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="mr-3 flex-1 rounded-lg border-none bg-white px-4 py-2 text-zinc-700 ring-0 focus:border-0 focus:ring-0 active:border-0 active:ring-0"
          />
          <button type="button" onClick={sendMessage}>
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
