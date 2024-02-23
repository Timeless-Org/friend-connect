import { useEffect, useState } from 'react'
import { getTimeAgo } from '@/utils/common'
import Ranking from '@components/explorer/Ranking'
import { getLatestChat } from '@utils/api'
import { IChatUser } from '@utils/types'

const NewChatTab = () => {
  const [userInfo, setUserInfo] = useState<IChatUser[]>([])

  useEffect(() => {
    const getTopUsersData = async () => {
      const user = await getLatestChat()
      setUserInfo(user.user)
    }
    getTopUsersData()
  }, [])

  return (
    <div className=" mx-3 flex flex-col items-center justify-center">
      {userInfo &&
        userInfo.map((user, index) => (
          <Ranking
            address={user.User.address}
            key={index}
            ranking={index + 1}
            name={user.User.name || ''}
            icon={user.User.icon || ''}
            description={
              <p className="text-sm text-gray60">
                {getTimeAgo(user.User.created_at)} holders・Price: {user.User.key_price} ETH
              </p>
            }
          />
        ))}
    </div>
  )
}

export default NewChatTab
