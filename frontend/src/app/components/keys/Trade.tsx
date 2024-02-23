import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { truncateString } from '@utils/common'

interface ITrade {
  tradeUserAddress: string
  objectUserAddress: string
  key: number
  tradeUser: string
  objectUser: string
  tradeUserName: string
  objectUserName: string
  timestamp: string
  amount: number
  value: number
  kingMark: boolean
  isBuy: boolean
}

const Trade = ({
  tradeUserAddress,
  objectUserAddress,
  key,
  tradeUser,
  objectUser,
  tradeUserName,
  objectUserName,
  timestamp,
  amount,
  value,
  kingMark,
  isBuy
}: ITrade) => {
  const router = useRouter()
  return (
    <div className="my-3 flex w-full items-center justify-start space-x-12" key={key}>
      <div className="flex items-center">
        <button type="button" onClick={() => router.push(`profile/${tradeUserAddress}`)} className="relative">
          <Image src={tradeUser} alt="user" className="rounded-full" width={48} height={48} />
        </button>
        <button type="button" onClick={() => router.push(`profile/${objectUserAddress}`)} className="absolute left-12">
          <Image src={objectUser} alt="user" className="rounded-full" width={48} height={48} />
        </button>
      </div>
      <div className="flex flex-col items-start justify-center space-y-1">
        <div className="inline-flex items-center justify-center space-x-2">
          <p className="font-semibold text-gray80">{truncateString(tradeUserName, 6)}</p>
          <p className="text-gray80">sold</p>
          <p className="font-semibold text-gray80">{amount}</p>
          <p className="text-gray80">{truncateString(objectUserName, 6)}</p>
        </div>
        <div className="flex space-x-3">
          <p className={`${isBuy ? 'bg-greenThin text-green' : 'bg-redThin text-red'} rounded-md px-2 font-semibold`}>
            {value} ETH
          </p>
          <p className="text-gray80">{timestamp}</p>
        </div>
      </div>
    </div>
  )
}

export default Trade
