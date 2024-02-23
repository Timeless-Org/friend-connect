import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IIconCircle {
  icon: any
}

const IconCircle = ({ icon }: IIconCircle) => {
  return <FontAwesomeIcon icon={icon} className="size-5 rounded-full bg-white p-3" />
}

export default IconCircle
