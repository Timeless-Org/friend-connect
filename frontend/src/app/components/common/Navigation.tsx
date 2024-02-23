import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Progress } from '@components/ui/progress'

interface INavigation {
  changePrePage: () => void
  progressValue: number
  pageNum: number
}

const Navigation = ({ changePrePage, progressValue, pageNum }: INavigation) => {
  return (
    <div className="flex w-full items-center justify-center space-x-3">
      <button type="button" className="inline-flex items-center" onClick={changePrePage}>
        <FontAwesomeIcon icon={faAngleLeft} className="h-5" />
      </button>
      <Progress value={progressValue} className="w-full" />
      <p className="text-sm">
        {pageNum}
        <span className="px-1">/</span>7
      </p>
    </div>
  )
}

export default Navigation
