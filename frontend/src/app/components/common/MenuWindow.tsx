import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShareNodes,
  faAngleLeft,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import SideMenuTab from "@components/SideMenu/SideMenuTab";
import KeyTradeModal from "@components/Modal/KeyTradeModal";

interface IMenuWindow {
  userName: string;
  isMenuContentOpen: boolean;
  menuContent: string;
  setMenuContentOpen: (isOpen: boolean) => void;
  isLoginUser: boolean;
}

const MenuWindow = ({
  userName,
  isMenuContentOpen,
  menuContent,
  setMenuContentOpen,
  isLoginUser,
}: IMenuWindow) => {
  const [isModalDisplay, setIsmModalDisplay] = useState<boolean>(false);
  const [isBuyModal, setIsBuyDisplay] = useState<boolean>(false);

  const openTradeModal = (isBuy: boolean) => {
    setIsmModalDisplay(true);
    setIsBuyDisplay(isBuy);
  };

  return (
    <div
      className={`fixed top-0 left-0 transform ${
        isMenuContentOpen ? "translate-x-0 " : "-translate-x-full"
      } w-full h-full transition-transform duration-300 z-50 bg-white`}
    >
      <KeyTradeModal
        isModalDisplay={isModalDisplay}
        closeModal={() => setIsmModalDisplay(false)}
        isBuy={isBuyModal}
        userName={userName}
        ownKey={1}
        keyPrice={0.002}
      />
      <div className="flex items-center justify-between px-4 h-16 w-full bg-black">
        <button type="button" onClick={() => setMenuContentOpen(false)}>
          <FontAwesomeIcon icon={faAngleLeft} className="text-white h-6" />
        </button>
        <p className="text-white text-lg font-semibold">@ {userName}</p>
        <p></p>
        KeyTradeModal
      </div>
      <div className="flex flex-col justify-center items-start mt-6 px-4">
        <div className="flex space-x-3 justify-between w-full">
          <div className="inline-flex justify-center items-center">
            <Image
              src="/static/img/user/user1.png"
              alt="user"
              className="rounded-full left-12"
              width={50}
              height={50}
            />
          </div>
          <div className="flex justify-center items-center text-gray60 space-x-3">
            <FontAwesomeIcon
              icon={faTwitter}
              className="h-4 bg-squareGray p-3 rounded-full"
            />
            <FontAwesomeIcon
              icon={faShareNodes}
              className="h-4 bg-squareGray p-3 rounded-full"
            />
            <FontAwesomeIcon
              icon={faPen}
              className="h-4 bg-squareGray p-3 rounded-full"
            />
            <FontAwesomeIcon
              icon={faMessage}
              className={`${
                isLoginUser ? "hidden" : "block"
              } h-4 bg-squareGray p-3 rounded-full`}
            />
          </div>
        </div>
        <div className="inline-flex items-center justify-start space-x-3 mt-4">
          <p className="font-semibold text-gray60">Cardene</p>
          <p className="text-xs text-gray60 bg-squareGray py-1 px-3 rounded-md">
            #42,432
          </p>
          <div className="text-gray20 flex items-center space-x-1">
            <p
              className={`${
                true ? "bg-green" : "bg-red"
              } w-2 h-2 rounded-full block`}
            />
            <p className="text-sm">{true ? "Online now" : "Offline"}</p>
          </div>
        </div>
        <div className="inline-flex items-center justify-start mt-2">
          <p className="text-gray60">bio.</p>
        </div>
        <div className="flex justify-around mt-6 font-semibold text-sm w-full">
          <p>4 holders</p>
          <p>2 holdings</p>
          <p>1 watchlists</p>
        </div>
        <div className="inline-flex flex-col bg-squareGray py-4 mt-6 px-4 rounded-lg text-sm text-gray60 font-semibold space-y-2 w-full">
          <div className="inline-flex items-center justify-between">
            <p>Key price:</p>
            <p>
              <span className="text-black">0.002</span> ETH
            </p>
          </div>
          <div
            className={`${
              isLoginUser ? "hidden" : "block"
            } inline-flex items-center justify-between`}
          >
            <p>You own:</p>
            <p>
              <span className="text-black">1</span> Key
            </p>
          </div>
        </div>
        <div className="flex justify-between w-full mt-6 space-x-4 items-center font-semibold text-sm">
          <button
            type="button"
            className=" bg-redThin text-red text-center rounded-full py-2 w-1/2"
            onClick={() => openTradeModal(false)}
          >
            SELL
          </button>
          <button
            type="button"
            className=" bg-greenThin text-green text-center rounded-full py-2 w-1/2"
            onClick={() => openTradeModal(true)}
          >
            BUY
          </button>
        </div>
      </div>
      <SideMenuTab isMenuContentOpen={isMenuContentOpen} />
    </div>
  );
};

export default MenuWindow;
