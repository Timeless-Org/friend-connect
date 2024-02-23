'use client'

import { useState } from 'react'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import ErrorModal from '@components/Modal/ErrorModal'
import Navigation from '@components/common/Navigation'
import { Button } from '@components/ui/button'
import { addUserTwitterProfile } from '@utils/api'

export default function LoginConnectTwitter() {
  const { user, linkTwitter, authenticated } = usePrivy()
  const router = useRouter()

  const [isModalDisplay, setIsmModalDisplay] = useState<boolean>(false)

  const changePrePage = () => {
    router.push('/login/code')
  }

  const changeNextPage = async () => {
    if (user && user.wallet?.address && user.twitter?.name) {
      await addUserTwitterProfile(
        user.wallet.address,
        user.twitter.name,
        user.twitter.profilePictureUrl || '',
        user.twitter.username || ''
      )
    }
    router.push('/login/deposit')
  }

  const connectTwitter = async () => {
    // if (user?.wallet?.address) {
    //   const url = await getTwitterAuthLink(user?.wallet?.address);
    //   if (url) router.push(url);
    // }
    if (!authenticated) return
    if (user && user.twitter?.name) {
      setIsmModalDisplay(true)
    } else {
      linkTwitter()
    }
  }

  const closeErrorModal = () => {
    setIsmModalDisplay(false)
  }
  return (
    <div className="container flex flex-col items-center justify-center">
      <ErrorModal message={'Already linked to Twitter'} isModalDisplay={isModalDisplay} closeModal={closeErrorModal} />
      <div className="flex h-screen w-full flex-col justify-between pb-5 pt-10">
        <div>
          <Navigation changePrePage={changePrePage} progressValue={28.6} pageNum={2} />
          <div className="mt-10 flex w-full flex-col items-start justify-center">
            <p className="text-lg font-semibold">Link your socials</p>
            <p className="mt-4 text-gray60">
              Connect your X account to verify your identity and make it easier for friends to discover and trade your
              token.
            </p>
          </div>
          <div className="mt-10 flex w-full flex-col items-start justify-center">
            <div className="flex w-full items-center justify-between rounded-xl bg-squareGray px-4 py-6">
              <div className="flex items-center justify-center space-x-3">
                <FontAwesomeIcon icon={faXTwitter} className="h-6 rounded-full  bg-white p-2" />
                <p className="text-lg font-semibold">Link your Twitter</p>
              </div>
              <Button variant="linkButton" className="py-5 font-semibold" onClick={connectTwitter}>
                Link
              </Button>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col px-5">
          <Button
            variant={user?.twitter?.name ? 'default' : 'roundedBtn'}
            className="h-12 w-full"
            onClick={changeNextPage}
            disabled={!user?.twitter?.name}
          >
            Proceed
          </Button>
          <Button variant="bgWhite" className="h-12 w-full">
            Log out
          </Button>
        </div>
      </div>
    </div>
  )
}
