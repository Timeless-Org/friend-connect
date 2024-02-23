import { useEffect, useState } from 'react'
import Ranking from '@components/explorer/Ranking'
import { getTopUsers } from '@utils/api'
import { ITop } from '@utils/types'

const TrendTab = () => {
  const [userInfo, setUserInfo] = useState<ITop[]>([])

  useEffect(() => {
    const getTopUsersData = async () => {
      const user = await getTopUsers()
      setUserInfo(user)
    }
    getTopUsersData()
  }, [])

  return (
    <div className=" mx-3 flex flex-col items-center justify-center">
      {userInfo &&
        userInfo.map((user, index) => (
          <Ranking
            address={user.address}
            key={index}
            ranking={'-'}
            name={user.name}
            icon={user.icon}
            description={
              <p className="text-sm text-gray60">
                {user._count.Holders} holders・Price: {user.key_price} ETH
              </p>
            }
          />
        ))}
    </div>
  )
}

export default TrendTab
