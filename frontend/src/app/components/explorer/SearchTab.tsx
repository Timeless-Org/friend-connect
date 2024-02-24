import { useEffect, useState } from 'react'
import Ranking from '@components/explorer/Ranking'
import { searchUser } from '@utils/api'
import { IUser } from '@utils/types'

interface ISearchTab {
  word: string
}

const SearchTab = ({ word }: ISearchTab) => {
  const [userInfo, setUserInfo] = useState<IUser[]>([])

  useEffect(() => {
    const search = async (_word: string) => {
      const _user = await searchUser(_word)
      setUserInfo(_user)
    }
    search(word)
  }, [word])

  return (
    <div className=" mx-3 flex flex-col items-center justify-center">
      {userInfo &&
        userInfo.map((user, index) => (
          <Ranking address={user.address} key={index} ranking={index + 1} name={user.name} icon={user.icon} />
        ))}
    </div>
  )
}

export default SearchTab
