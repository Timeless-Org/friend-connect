'use client'

import { ChangeEvent, useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import ErrorModal from '@components/Modal/ErrorModal'
import LoadingModal from '@components/Modal/LoadingModal'
import Navigation from '@components/common/Navigation'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { codeVerify } from '@utils/api'

export default function LoginLoginCode() {
  const router = useRouter()
  const { user, logout } = usePrivy()

  const [code, setCode] = useState<string>('')
  const [isModalDisplay, setIsModalDisplay] = useState<boolean>(false)
  const [isLoadingModalDisplay, setIsLoadingModalDisplay] = useState<boolean>(false)

  const verifyCode = async (code: string) => {
    try {
      setIsLoadingModalDisplay(true)
      if (user?.wallet && user.wallet.address) {
        const result = await codeVerify(code, user.wallet.address)
        if (result) {
          setIsLoadingModalDisplay(false)
          router.push('/login/twitter')
          return
        }
      }
      // setIsLoadingModalDisplay(false);
      setIsModalDisplay(true)
    } catch (err: any) {
      setIsLoadingModalDisplay(false)
      setIsModalDisplay(true)
    }
  }

  const handleSetCode = (event: ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value)
  }

  const closeErrorModal = () => {
    setIsModalDisplay(false)
    setIsLoadingModalDisplay(false)
  }

  const changePrePage = () => {
    router.push('/login/wallet')
  }

  return (
    <div className="container flex w-full flex-col items-center justify-center">
      <ErrorModal message={'Invalid code'} isModalDisplay={isModalDisplay} closeModal={closeErrorModal} />
      <LoadingModal isModalDisplay={isLoadingModalDisplay} />
      <div className="flex h-screen w-full flex-col justify-between pb-5 pt-10">
        <div>
          <Navigation changePrePage={changePrePage} progressValue={14.3} pageNum={1} />
          <div className="mt-10 flex w-full flex-col items-start justify-center">
            <p className="text-lg font-semibold">Got an invite code?</p>
            <p className="mt-4 text-gray60">
              LongStar is currently in beta. Get an invite code from an existing user to sign up
            </p>
          </div>
          <div className="mt-10 flex w-full flex-col items-start justify-center">
            <p className="text-gray">Invite Code</p>
            <Input type="text" placeholder="Code" className="mt-2" onChange={handleSetCode} />
          </div>
        </div>

        <div className="flex w-full flex-col px-5">
          <Button
            variant={code ? 'default' : 'roundedBtn'}
            className="h-12 w-full"
            onClick={() => verifyCode(code)}
            disabled={!code}
          >
            Proceed
          </Button>
          <Button variant="bgWhite" className="mt-2 h-12 w-full" onClick={logout}>
            Log out
          </Button>
        </div>
      </div>
    </div>
  )
}
