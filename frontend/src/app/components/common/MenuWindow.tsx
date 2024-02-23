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
import { IAddress, IUser } from "@/utils/types";
import { ConnectedWallet, usePrivy } from "@privy-io/react-auth";
import { getUser } from "@/utils/api";
import Link from "next/link";
import { SHARE_TEXT } from "@/utils/config";
import EditBioModal from "@components/Modal/EditBioModal";
import { blastSepolia } from "@/lib/chain";
import { ethersContract } from "@/lib/ethersContract";

interface IMenuWindow {
  isMenuContentOpen: boolean;
  menuContent: string;
  setMenuContentOpen: (isOpen: boolean) => void;
  isLoginUser: boolean;
  wallet: ConnectedWallet;
}

const MenuWindow = ({
  isMenuContentOpen,
  menuContent,
  setMenuContentOpen,
  isLoginUser,
  wallet,
}: IMenuWindow) => {
  const { user } = usePrivy();
  const address = (user?.wallet?.address as IAddress) || "0x";

  const [isKeyTradeModalDisplay, setIsKeyTradeModalDisplay] =
    useState<boolean>(false);
  const [isEditBioModalDisplay, setIsEditBioModalDisplay] =
    useState<boolean>(false);
  const [isBuy, setIsBuy] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUser>();
  const [holderAmount, setHolderAmount] = useState<number>(0);
  const [holdingAmount, setHoldingAmount] = useState<number>(0);
  const [isPendingHolder, setIsPendingHolder] = useState<boolean>(false);

  const openTradeModal = async (isBuy: boolean) => {
    setIsBuy(isBuy);
    setIsKeyTradeModalDisplay(true);
  };

  const closeModal = () => {
    setIsKeyTradeModalDisplay(false);
    setIsEditBioModalDisplay(false);
  };

  useEffect(() => {
    const getUserData = async (address: string) => {
      const user = await getUser(address);
      setUserData(user);
    };
    if (address && !userData) {
      getUserData(address);
    }
  }, [address, user, userData]);

  useEffect(() => {
    const getHolder = async () => {
      setIsPendingHolder(true);
      await wallet.switchChain(blastSepolia.id);
      const provider = await wallet.getEthersProvider();
      const { keyNftShareContract } = await ethersContract(provider);
      const holders: BigInt = await keyNftShareContract.sharesSupply(address);
      const hold: BigInt = await keyNftShareContract.sharesBalance(address, address);
      setHolderAmount(Number(holders));
      setHoldingAmount(Number(hold));
      setIsPendingHolder(false);
    };

    if (wallet && holdingAmount === 0 && holderAmount === 0) getHolder();
  }, [address, holderAmount, holdingAmount, wallet]);

  return (
    <div
      className={`fixed top-0 left-0 transform ${
        isMenuContentOpen ? "translate-x-0 " : "-translate-x-full"
      } w-full h-full transition-transform duration-300 z-50 bg-white`}
    >
      <KeyTradeModal
        address={address}
        shareObject={address}
        isModalDisplay={isKeyTradeModalDisplay}
        closeModal={closeModal}
        isBuy={isBuy}
        name={userData?.name || ""}
        icon={userData?.icon || ""}
        ownKey={1}
        wallet={wallet}
      />
      <EditBioModal
        address={address}
        isModalDisplay={isEditBioModalDisplay}
        closeModal={closeModal}
      />
      <div className="flex items-center justify-between px-4 h-16 w-full bg-black">
        <button type="button" onClick={() => setMenuContentOpen(false)}>
          <FontAwesomeIcon icon={faAngleLeft} className="text-white h-6" />
        </button>
        <p className="text-white text-lg font-semibold mr-2">
          @ {userData?.twitter_id}
        </p>
        <p />
      </div>
      <div className="flex flex-col justify-center items-start mt-6 px-4">
        <div className="flex space-x-3 justify-between w-full">
          <div className="inline-flex justify-center items-center">
            <Image
              src={userData?.icon || ""}
              alt="user"
              className="rounded-full left-12"
              width={50}
              height={50}
            />
          </div>
          <div className="flex justify-center items-center text-gray60 space-x-3">
            <Link
              className="h-4 flex justify-center items-center"
              href={`twitter://user?screen_name=${userData?.twitter_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faTwitter}
                className="h-4 bg-squareGray p-3 rounded-full"
              />
            </Link>
            <Link
              className="h-4 flex justify-center items-center"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                SHARE_TEXT
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faShareNodes}
                className="h-4 bg-squareGray p-3 rounded-full"
              />
            </Link>
            <button
              type="button"
              className="h-4 flex justify-center items-center"
              onClick={() => setIsEditBioModalDisplay(true)}
            >
              <FontAwesomeIcon
                icon={faPen}
                className="h-4 bg-squareGray p-3 rounded-full"
              />
            </button>
            <FontAwesomeIcon
              icon={faMessage}
              className={`${
                isLoginUser ? "hidden" : "block"
              } h-4 bg-squareGray p-3 rounded-full`}
            />
          </div>
        </div>
        <div className="inline-flex items-center justify-start space-x-3 mt-4">
          <p className="font-semibold text-gray60">{userData?.name}</p>
          <p className="text-xs text-gray60 bg-squareGray py-1 px-3 rounded-md">
            #{userData?.ranking}
          </p>
          <div className="text-gray60 flex items-center space-x-1">
            <p
              className={`${
                true ? "bg-green" : "bg-red"
              } w-2 h-2 rounded-full block`}
            />
            <p className="text-sm">
              {userData?.is_online ? "Online now" : "Offline"}
            </p>
          </div>
        </div>
        <div className="inline-flex items-center justify-start mt-2">
          <p className="text-gray60">{userData?.biography}</p>
        </div>
        <div className="flex justify-around mt-6 font-semibold text-sm w-full">
          {isPendingHolder ? (
            <p className="animate-spin h-4 w-4 border-4 border-orange rounded-full border-t-transparent" />
          ) : (
            <p>{holderAmount} holders</p>
          )}
          {isPendingHolder ? (
            <p className="animate-spin h-4 w-4 border-4 border-orange rounded-full border-t-transparent" />
          ) : (
            <p>{holdingAmount} holdings</p>
          )}
          <p>1 watchlists</p>
        </div>
        <div className="inline-flex flex-col bg-squareGray py-4 mt-6 px-4 rounded-lg text-sm text-gray60 font-semibold space-y-2 w-full">
          <div className="inline-flex items-center justify-between">
            <p>Key price:</p>
            <p>
              <span className="text-black">{userData?.key_price}</span> ETH
            </p>
          </div>
          <div
            className={`${
              isLoginUser ? "hidden" : "block"
            } inline-flex items-center justify-between`}
          >
            <p>You own:</p>
            {isPendingHolder ? (
              <p className="animate-spin h-4 w-4 border-4 border-orange rounded-full border-t-transparent" />
            ) : (
              <p>
                <span className="text-black">{holdingAmount}</span> Key
              </p>
            )}
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
      <SideMenuTab
        address={address}
        isMenuContentOpen={isMenuContentOpen}
        userData={userData}
      />
    </div>
  );
};

export default MenuWindow;
