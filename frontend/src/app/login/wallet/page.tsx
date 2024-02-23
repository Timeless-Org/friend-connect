'use client'

import { usePrivy } from '@privy-io/react-auth'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { getUser } from '@/utils/api'
import { Button } from '@components/ui/button'

export default function LoginLoginWallet() {
  const router = useRouter()
  const { login, authenticated, logout, user } = usePrivy()

  const changeNextPage = async () => {
    if (user?.wallet && user.wallet.address) {
      const userData = await getUser(user.wallet.address)
      if (userData.register) {
        router.push('/keys')
        return
      }
      router.push('/login/code')
      return
    }
  }

  return (
    <div className="container flex h-screen w-full items-center justify-center bg-black">
      <div className="flex h-screen w-full flex-col justify-between">
        <div></div>
        <div className="flex flex-col items-center justify-center ">
          <Image src="/static/img/banner/long_star_yellow.jpg" alt="long star" width={300} height={300} />
          <p className="mt-5 w-full px-5 text-center text-white">
            LongStar is a Social Fi platform that enables creators to get native yield from their followers via social
            tokens.
          </p>
        </div>
        <div className="mb-10 flex w-full flex-col px-5">
          <Button
            variant="bgYellow"
            className="h-12 w-full rounded-full"
            onClick={authenticated ? changeNextPage : login}
          >
            {authenticated ? 'Proceed' : 'Create a wallet'}
          </Button>
          <Button
            variant="bgBlack"
            className={`${authenticated ? 'flex' : 'hidden'} mt-4 h-12 w-full`}
            onClick={logout}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  )
}
