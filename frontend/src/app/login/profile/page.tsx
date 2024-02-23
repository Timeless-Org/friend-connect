'use client'

import { ChangeEvent, useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import Navigation from '@components/common/Navigation'
import OrangeButton from '@components/common/OrangeButton'
import { Textarea } from '@components/ui/textarea'
import { addUserBiography } from '@utils/api'
import { IAddress } from '@utils/types'

export default function LoginNotification() {
  const router = useRouter()
  const { user } = usePrivy()
  const address = (user?.wallet?.address as IAddress) || '0x'

  const [biography, setBiography] = useState<string>('')

  const changePrePage = () => {
    router.push('/login/notification')
  }

  const handleSetBiography = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBiography(event.target.value)
  }

  const updateBiography = async () => {
    const result = await addUserBiography(address, biography)
    if (result) {
      router.push('/login/start')
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="flex h-screen w-full flex-col justify-between pb-5 pt-10">
        <div>
          <Navigation changePrePage={changePrePage} progressValue={85.8} pageNum={6} />
          <div className="mt-10 flex w-full flex-col items-start justify-center">
            <p className="text-lg font-semibold">Create your account</p>
            {/* <p className="text-gray mt-4">User name</p>
            <Input
              type="text"
              placeholder="User name"
              className="mt-2"
              onChange={handleSetUserName}
            /> */}
            {/* <div className="mt-6">
          <p className="text-gray">Profile picture</p>
          <div className="flex items-center justify-center mt-2">
            <FontAwesomeIcon
              icon={faCircleUser}
              className="rounded-full text-gray20 w-5 h-5 p-3 bg-squareGray mr-3"
            />
            <InputFile />
          </div>
        </div>
        <div className="mt-6">
          <p>Key NFT picture</p>
          <div className="flex items-center justify-center mt-2">
            <FontAwesomeIcon
              icon={faCircleUser}
              className="rounded-full text-gray20 w-5 h-5 p-3 bg-squareGray mr-3"
            />
            <InputFile />
          </div>
        </div> */}
            <div className="mt-6 w-full">
              <p>Bio</p>
              <Textarea placeholder="Bio." onChange={handleSetBiography} className="w-full" />
            </div>
          </div>
        </div>

        <div className="mb-10 flex flex-col px-5">
          <OrangeButton text={'Proceed'} buttonAction={updateBiography} disabled={!biography} />
        </div>
      </div>
    </div>
  )
}
