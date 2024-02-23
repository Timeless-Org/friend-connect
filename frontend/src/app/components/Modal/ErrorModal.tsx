import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IErrorModal {
  message: string
  isModalDisplay: boolean
  closeModal: () => void
}
const ErrorModal = ({ message, isModalDisplay, closeModal }: IErrorModal) => {
  return (
    <div
      className={`${
        isModalDisplay ? 'flex' : 'hidden'
      } absolute inset-0 z-50 h-screen w-full items-center justify-center bg-gray20`}
    >
      <div className="mx-4 inline-flex h-1/4 w-full flex-col items-center justify-start rounded-xl bg-white px-6 pt-5">
        <button type="button" className="z-50 inline-flex w-full items-center justify-end" onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} className="size-4 rounded-full bg-squareGray p-3" />
        </button>
        <div className="absolute inset-0  z-40 inline-flex size-full items-center justify-center">
          <p className="text-center">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default ErrorModal
