import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface IErrorModal {
  message: string;
  isModalDisplay: boolean;
  closeModal: () => void;
}
const ErrorModal = ({ message, isModalDisplay, closeModal }: IErrorModal) => {
  return (
    <div
      className={`${
        isModalDisplay ? "flex" : "hidden"
      } absolute inset-0 w-full h-screen items-center justify-center bg-gray20 z-50`}
    >
      <div className="inline-flex flex-col w-full justify-start pt-5 items-center mx-4 px-6 h-1/4 rounded-xl bg-white">
        <button
          type="button"
          className="w-full inline-flex items-center justify-end z-50"
          onClick={closeModal}
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="h-4 w-4 bg-squareGray p-3 rounded-full"
          />
        </button>
        <div className="absolute inset-0  w-full inline-flex items-center justify-center h-full z-40">
          <p className="text-center">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
