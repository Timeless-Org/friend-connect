import { useEffect, useState } from 'react'
import { getAllUserTrade } from '@/utils/api'
import { getTimeAgo } from '@/utils/common'
import Trade from '@components/keys/Trade'
import { IUserList } from '@utils/types'

const GlobalTab = () => {
  const [userInfo, setUserInfo] = useState<IUserList[]>([])

  useEffect(() => {
    const getUserTradeData = async () => {
      const data = await getAllUserTrade()
      setUserInfo(data)
    }
    getUserTradeData()
  }, [])

  return (
    <div className=" mx-3 flex flex-col items-center justify-center">
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

export default GlobalTab
