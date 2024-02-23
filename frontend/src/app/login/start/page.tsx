'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import Navigation from '@components/common/Navigation'
import OrangeButton from '@components/common/OrangeButton'
import { Checkbox } from '@components/ui/checkbox'
import { changeUserRegister } from '@utils/api'

export default function LoginStart() {
  const { user } = usePrivy()
  const router = useRouter()

  const changePrePage = () => {
    router.push('/login/profile')
  }

  const changeKeysPage = async () => {
    if (user?.wallet?.address) {
      await changeUserRegister(user?.wallet?.address)
      router.push('/keys')
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="flex h-screen w-full flex-col justify-between pb-5 pt-10">
        <div>
          <Navigation changePrePage={changePrePage} progressValue={100} pageNum={7} />
          <div className="mt-10 flex w-full flex-col items-start justify-center">
            <p className="text-lg font-semibold">Long Star is in beta!</p>
            <p className="mt-4 text-gray60">
              Thanks for being an early supporter and helping us test the app.
              <br />
              <br />
              We&rsquo;ve given you invite code to share with friends. You can find it in the Airdrop tab. <br />
              <br />
              If you have any feedback, please let us know on Twitter at @longstar_social.
              <br />
              <br />
              By using this app, you confirm our terms of service
            </p>
          </div>
        </div>

        <div className="mb-10 flex flex-col px-5">
          <div className="mb-3 flex items-center justify-start space-x-2">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm">
              Post a Tweet to let your friends know you joined
            </label>
          </div>
          <OrangeButton text={'Start using the app'} buttonAction={changeKeysPage} />
        </div>
      </div>
    </div>
  )
}
