import { useState } from 'react'
import { faCheck, faXmark, faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Copy from '../common/Copy'

interface IMessageModal {
  message: string
  isModalDisplay: boolean
  closeModal: () => void
}
const MessageModal = ({ message, isModalDisplay, closeModal }: IMessageModal) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  return (
    <div
      className={`${
        isModalDisplay ? 'flex' : 'hidden'
      } absolute inset-0 z-50 h-screen items-center justify-center bg-gray20`}
    >
      <div className="mx-4 inline-flex h-1/4 w-full flex-col items-center justify-start rounded-xl bg-white px-6 pt-5">
        <button type="button" className="z-50 inline-flex w-full items-center justify-end" onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} className="size-4 rounded-full bg-squareGray p-3" />
        </button>
        <div className="absolute inset-0 z-40 inline-flex h-full items-center justify-center">
          <div className="inline-flex flex-col">
            <Copy
              copyText={message}
              content={
                <FontAwesomeIcon
                  icon={isCopied ? faCheck : faCopy}
                  className="h-5 rounded-full bg-squareGray p-2 text-gray60"
                />
              }
              setIsCopied={setIsCopied}
            />
            <div className="mt-2 inline-flex w-full items-center justify-center">
              <p className="w-2/3 text-wrap break-all text-center">{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageModal
