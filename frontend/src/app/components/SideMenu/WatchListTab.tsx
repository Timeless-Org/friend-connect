import { useEffect, useState } from 'react'
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { getWatchlist } from '@/utils/api'
import { IUser } from '@utils/types'

interface IWatchListTab {
  address: string
}

const WatchListTab = ({ address }: IWatchListTab) => {
  const router = useRouter()

  const [userInfo, setUserInfo] = useState<IUser[]>([])

  useEffect(() => {
    const getWatchlistUserData = async (_address: string) => {
      const watchlistUserData = await getWatchlist(_address)
      setUserInfo(watchlistUserData)
    }
    getWatchlistUserData(address)
  }, [address])
  return (
    <div className="flex flex-col justify-center space-y-4 w-full items-start">
      {userInfo.map((user, index) => (
        <div className="flex w-full items-center justify-between space-x-4" key={index}>
          <div className="inline-flex items-center space-x-2">
            <button type="button" onClick={() => router.push(`profile/${address}`)}>
              <Image src={user.icon} alt="user" className="rounded-full" width={48} height={48} />
            </button>
            <div className="inline-flex flex-col items-start justify-center">
              <p className="font-semibold">{user.name}</p>
              <p className="text-gray60">#{user.ranking}</p>
            </div>
          </div>
          <div className="bg-squareGray px-2 py-1 rounded-lg">
            <p className="text-gray60 text-sm">
              <span className="font-semibold">{user.key_price} ETH</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default WatchListTab
