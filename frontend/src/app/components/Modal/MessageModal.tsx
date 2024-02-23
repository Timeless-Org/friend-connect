import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark, faCopy } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Copy from "../common/Copy";

interface IMessageModal {
  message: string;
  isModalDisplay: boolean;
  closeModal: () => void;
}
const MessageModal = ({
  message,
  isModalDisplay,
  closeModal,
}: IMessageModal) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  return (
    <div
      className={`${
        isModalDisplay ? "flex" : "hidden"
      } absolute inset-0 h-screen items-center justify-center bg-gray20 z-50`}
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
        <div className="absolute inset-0 inline-flex items-center justify-center h-full z-40">
          <div className="inline-flex flex-col">
            <Copy
              copyText={message}
              content={
                <FontAwesomeIcon
                  icon={isCopied ? faCheck : faCopy}
                  className="h-5 bg-squareGray p-2 rounded-full text-gray60"
                />
              }
              setIsCopied={setIsCopied}
            />
            <div className="inline-flex justify-center items-center mt-2 w-full">
              <p className="text-center w-2/3 text-wrap break-all">
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
