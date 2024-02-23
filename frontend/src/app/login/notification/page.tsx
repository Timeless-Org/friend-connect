'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import Navigation from '@components/common/Navigation'
import OrangeButton from '@components/common/OrangeButton'
import { Button } from '@components/ui/button'
import { addUserNotification } from '@utils/api'
import { IAddress } from '@utils/types'

export default function LoginNotification() {
  const router = useRouter()
  const { user } = usePrivy()
  const address = (user?.wallet?.address as IAddress) || '0x'

  const changePrePage = () => {
    router.push('/login/key')
  }
  const changeNextPage = async (notification: boolean = false) => {
    if (notification) await addUserNotification(address, notification)
    router.push('/login/profile')
  }

  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="flex h-screen w-full flex-col justify-between pb-5 pt-10">
        <div>
          <Navigation changePrePage={changePrePage} progressValue={71.5} pageNum={5} />
          <div className="mt-10 flex w-full flex-col items-start justify-center">
            <p className="text-lg font-semibold">Exclusive chats</p>
            <p className="mt-4 text-gray60">
              Keys give you access to exclusive one-to-many chats with your friends.
              <br />
              <br />
              Turn on notifications to find out when new messages come in.
            </p>
          </div>
        </div>

        <div className="flex flex-col px-5">
          <OrangeButton text={'Enable notifications'} buttonAction={() => changeNextPage(true)} />
          <Button variant="none" className="mt-2 h-12 w-full" onClick={() => changeNextPage(false)}>
            No notifications
          </Button>
        </div>
      </div>
    </div>
  )
}
