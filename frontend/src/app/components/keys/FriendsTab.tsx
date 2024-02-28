import { useEffect, useState } from 'react'
import { getWatchlistTrade } from '@/utils/api'
import Trade from '@components/keys/Trade'
import { getTimeAgo } from '@utils/common'
import { IUserList } from '@utils/types'

interface IFriendsTab {
  address: string
}

const FriendsTab = ({ address }: IFriendsTab) => {
  const [userInfo, setUserInfo] = useState<IUserList[]>([])

  useEffect(() => {
    const getWatchlistUserData = async () => {
      const watchlistUserData = await getWatchlistTrade(address)
      setUserInfo(watchlistUserData)
    }
    getWatchlistUserData()
  }, [address])
  return (
    <div className=" flex flex-col justify-center items-center mx-3">
      {userInfo.map((user, index) => (
        <Trade
          key={index}
          tradeUserAddress={user.Buyer.address}
          objectUserAddress={user.Seller.address}
          tradeUser={user.Buyer.icon}
          objectUser={user.Seller.icon}
          tradeUserName={user.Buyer.name}
          objectUserName={user.Seller.name}
          timestamp={getTimeAgo(user.created_at)}
          amount={user.amount}
          value={user.key_price}
          kingMark={false}
          isBuy={user.is_buy}
        />
      ))}
    </div>
  )
}

export default FriendsTab
