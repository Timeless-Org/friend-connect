"use client";

import { IWallet } from "@/utils/types";
import Copy from "@components/common/Copy";
import Footer from "@components/common/Footer";
import Header from "@components/common/Header";
import OrangeButton from "@components/common/OrangeButton";
import { Button } from "@components/ui/button";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowsRotate,
  faCheck,
  faDownload,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Wallet() {
  const [walletInfo, setWalletInfo] = useState<IWallet>({});
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    setWalletInfo({
      userName: "Cardene",
      address: "0x1234567890",
    });
  }, []);
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center w-full mt-24 px-4 space-y-6">
        <div className="flex justify-between items-center mt-6 w-full">
          <div className="inline-flex items-center justify-center space-x-3">
            <Image
              src="/static/img/user/user1.png"
              alt="user"
              className="rounded-full"
              width={48}
              height={48}
            />
            <div className="inline-flex flex-col justify-center items-start">
              <p className="font-semibold">@{walletInfo.userName}</p>
              <div className="inline-flex space-x-3 items-center">
                <p>{walletInfo.address}</p>
                <Copy
                  copyText={walletInfo.address || ""}
                  content={
                    <FontAwesomeIcon
                      icon={isCopied ? faCheck : faCopy}
                      className="h-4 bg-squareGray p-2 rounded-full text-gray60"
                    />
                  }
                  setIsCopied={setIsCopied}
                />
              </div>
            </div>
          </div>
          <div className="inline-flex space-x-3 rounded-full border items-center px-3 py-1">
            <FontAwesomeIcon icon={faArrowsRotate} className="h-4" />
            <p>Sync Profile</p>
          </div>
        </div>
        <div className="inline-flex flex-col w-full">
          <p className="font-semibold">Assets</p>
          <div className="inline-flex space-x-2 w-full">
            <div className="bg-squareGray rounded-xl p-2 inline-flex flex-col text-gray60 w-1/2 justify-center items-center space-y-2">
              <p className="font-semibold">Wallet balance</p>
              <div className="inline-flex space-x-3 items-center">
                <FontAwesomeIcon
                  icon={faEthereum}
                  className="h-4 w-4 text-orange bg-black p-2 rounded-full"
                />
                <p>
                  <span className="font-semibold text-black">0.001</span> ETH
                </p>
              </div>
            </div>
            <div className="bg-squareGray rounded-xl p-2 inline-flex flex-col text-gray60 w-1/2 justify-center items-center space-y-2">
              <p className="font-semibold">Portfolio value</p>
              <div className="inline-flex space-x-3 items-center">
                <FontAwesomeIcon
                  icon={faPiggyBank}
                  className="h-4 w-4 text-orange bg-black p-2 rounded-full"
                />
                <p>
                  <span className="font-semibold text-black">0.001</span> ETH
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between text-gray60 w-full">
          <p>Tadings fees earned:</p>
          <p>
            <span className="font-semibold text-black">0.001</span> ETH
          </p>
        </div>
        <div className="flex justify-around w-full">
          <div className="inline-flex flex-col items-center justify-center space-y-3">
            <FontAwesomeIcon
              icon={faDownload}
              className="h-4 p-4 rounded-full border"
            />
            <p className="font-semibold">Deposit on chain</p>
          </div>
          <div className="inline-flex flex-col items-center justify-center space-y-3">
            <p className="rounded-full border p-3 items-center flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 24 24"
                className="text-gray80 text-center pl-1"
              >
                <path fill="currentColor" d="M3 20v-6l8-2l-8-2V4l19 8z" />
              </svg>
            </p>
            <p className="font-semibold">Deposit on chain</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <OrangeButton text={"Export Private Key"} />
          <Button
            variant="none"
            className="w-full h-12 text-red"
            onClick={() => {}}
          >
            Log out
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
