import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IIconCircle {
    icon: any;
}

const IconCircle = ({ icon }: IIconCircle) => {
  return (
    <FontAwesomeIcon icon={icon} className="rounded-full w-5 h-5 p-3 bg-white" />
  );
};

export default IconCircle;
