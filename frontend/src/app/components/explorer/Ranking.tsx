import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface IRanking {
  address: string
  ranking: string | number
  icon: string
  name: string
  description?: React.ReactNode
}

const Ranking = ({ address, ranking, icon, name, description }: IRanking) => {
  const router = useRouter()
  return (
    <div className="my-3 flex w-full items-center justify-start space-x-6">
      <div className="flex items-center space-x-3">
        <p className="font-semibold">{ranking}</p>
        <button type="button" onClick={() => router.push(`profile/${address}`)} className="relative">
          <Image src={icon} alt="user" className="rounded-full" width={48} height={48} />
        </button>
      </div>
      <div className="flex flex-col items-start justify-center space-y-1">
        <p className="font-semibold">{name}</p>
        {description}
      </div>
    </div>
  )
}

export default Ranking
