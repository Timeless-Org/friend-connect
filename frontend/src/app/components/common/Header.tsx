import { useEffect, useState } from 'react'
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePrivy } from '@privy-io/react-auth'
import Image from 'next/image'
import { IUser } from '@/utils/types'
import SideMenu from '@components/common/SideMenu'
import { getUser } from '@utils/api'

const Header = () => {
  const { user } = usePrivy()

  const [isMenuOpen, setMenuOpen] = useState(false)
  const [userData, setUserData] = useState<IUser>()

  useEffect(() => {
    const getUserData = async (address: string) => {
      const user = await getUser(address)
      setUserData(user)
    }
    if (user?.wallet?.address && !userData) {
      getUserData(user?.wallet?.address)
    }
  }, [user, userData])

  return (
    <>
      <SideMenu
        isOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
        userName={userData?.name || ''}
        address={user?.wallet?.address || ''}
      />
      <header className="fixed inset-x-0 top-0 flex h-24 items-center justify-between bg-black px-6">
        <div className="flex items-center justify-center space-x-3">
          <Image src="/static/img/banner/long_star_yellow.jpg" alt="long_star" width={170} height={80} />
        </div>
        <div className="flex items-center justify-center space-x-5">
          <FontAwesomeIcon icon={faBell} className="h-6 text-white" />
          <button type="button" onClick={() => setMenuOpen(!isMenuOpen)}>
            {userData && userData?.icon ? (
              <Image src={userData.icon} alt="user_icon" width={40} height={40} className="rounded-full" />
            ) : (
              <FontAwesomeIcon icon={faUser} className="h-4 rounded-full bg-grayThin p-3 text-white" />
            )}
          </button>
        </div>
      </header>
    </>
  )
}

export default Header
