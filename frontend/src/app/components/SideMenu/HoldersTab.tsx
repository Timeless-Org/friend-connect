import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { getHolders } from '@utils/api'
import { IUser } from '@utils/types'

interface IHoldersTab {
  address: string
}

const HoldersTab = ({ address }: IHoldersTab) => {
  const router = useRouter()

  const [holders, setHolders] = useState<IUser[]>([])

  useEffect(() => {
    const getUserData = async (_address: string) => {
      const holdersData = await getHolders(_address)
      if (holdersData) {
        setHolders(holdersData)
      }
    }
    if (address) {
      getUserData(address)
    }
  }, [address])

  return (
    <div className="flex w-full flex-col items-start justify-center space-y-4">
      {holders.map((user, index) => (
        <div className="flex items-center justify-start space-x-4" key={index}>
          <button type="button" onClick={() => router.push(`profile/${address}`)}>
            <Image src={user.icon || ''} alt="user" className="rounded-full" width={48} height={48} />
          </button>
          <p className="font-semibold">{user.name}</p>
        </div>
      ))}
    </div>
  )
}

export default HoldersTab
