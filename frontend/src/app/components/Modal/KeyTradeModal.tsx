import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

interface IKeyTradeModal {
  isModalDisplay: boolean;
  closeModal: () => void;
  isBuy: boolean;
  userName: string;
  ownKey: number;
  keyPrice: number;
}
const KeyTradeModal = ({
  isModalDisplay,
  closeModal,
  isBuy,
  userName,
  ownKey,
  keyPrice,
}: IKeyTradeModal) => {
    const modalRef = useRef<HTMLDivElement>(null);

  const handleContainerClick = () => {
    closeModal();
  };

    const handleContentClick = (event: React.MouseEvent) => {
      event.stopPropagation();
    };

  return (
    <div
      className={`${
        isModalDisplay ? "flex" : "hidden"
      } absolute inset-0 w-full h-screen items-center justify-center bg-gray20`}
      onClick={handleContainerClick}
    >
      <div
        className="inline-flex flex-col w-full justify-center items-center mx-4 px-6 h-1/3 rounded-xl bg-white"
        onClick={handleContentClick}
      >
        <p className="font-semibold text-2xl ">Trade Keys</p>
        <div className="flex w-full items-center justify-between space-x-4 mt-8">
          <div className="inline-flex items-center space-x-2">
            <Image
              src={`/static/img/user/user1.png`}
              alt="user"
              className="rounded-full"
              width={48}
              height={48}
            />
            <div className="inline-flex flex-col items-start justify-center">
              <p className="font-semibold">Cardene</p>
              <p className="text-gray60">You own {ownKey} key</p>
            </div>
          </div>
          <div className="bg-squareGray px-2 py-1 rounded-lg">
            <p
              className={`${
                isBuy ? "text-green" : "text-red"
              } text-gray60 text-sm font-semibold`}
            >
              0.002 ETH
            </p>
          </div>
        </div>
        <div className="flex space-x-2 w-full justify-start items-center mt-6 font-semibold text-gray60">
          <FontAwesomeIcon
            icon={faQuestion}
            className="h-3 w-3 border-2 border-gray60 p-1 rounded-full"
          />
          <p>Key Price</p>
        </div>
        <button
          type="button"
          className={`${
            isBuy ? "bg-greenThin text-green" : "bg-redThin text-red"
          } w-full font-semibold rounded-full py-3 mt-6`}
        >
          {isBuy ? "Buy" : "Sell"} a key
        </button>
      </div>
    </div>
  );
};

export default KeyTradeModal;
