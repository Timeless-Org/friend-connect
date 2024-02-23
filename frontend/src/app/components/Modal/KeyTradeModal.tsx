import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestion,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { blastSepolia } from "@/lib/chain";
import { ethersContract } from "@/lib/ethersContract";
import { useEffect, useState } from "react";
import { ConnectedWallet } from "@privy-io/react-auth";
import { formatEther } from "@/lib/common";
import { IAddress } from "@/utils/types";
import { createTrade } from "@/utils/api";

interface IKeyTradeModal {
  address: IAddress;
  shareObject: IAddress;
  isModalDisplay: boolean;
  closeModal: () => void;
  isBuy: boolean;
  name: string;
  icon: string;
  ownKey: number;
  wallet: ConnectedWallet;
}
const KeyTradeModal = ({
  address,
  shareObject,
  isModalDisplay,
  closeModal,
  isBuy,
  name,
  icon,
  ownKey,
  wallet,
}: IKeyTradeModal) => {
  const [displayKeyPrice, setDisplayKeyPrice] = useState<number>(0);
  const [isDoneTradeKeyNft, setIsDoneTradeKeyNft] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [isPendingSetKeyPrice, setIsPendingSetKeyPrice] =
    useState<boolean>(false);

  const handleContainerClick = () => {
    closeModal();
  };

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const tradeKey = async (_address: IAddress, _isBuy: boolean) => {
    try {
      if (wallet) {
        await wallet.switchChain(blastSepolia.id);
        const provider = await wallet.getEthersProvider();
        const { keyNftShareContract } = await ethersContract(provider);
        let transaction;
        setIsPending(true);
        const buyPrice = await keyNftShareContract.getBuyPrice(_address, 1);
        if (isBuy) {
          transaction = await keyNftShareContract.buyShares(_address, 1, {
            gasLimit: 2000000,
            value: buyPrice,
          });
        } else {
          transaction = await keyNftShareContract.sellShares(_address, 1, {
            gasLimit: 2000000,
          });
        }
        await transaction.wait();
        const formatBalance =
          Math.floor(formatEther(buyPrice) * 100000) / 100000;
        await createTrade(address, _address, formatBalance, 1, isBuy);
        setIsPending(false);
        setIsDoneTradeKeyNft(true);
        setTimeout(() => {
          closeModal();
          setIsDoneTradeKeyNft(false);
        }, 1000);
      }
    } catch (err: any) {
      console.log(`err`);
      setIsPending(false);
      setIsFailed(true);
      setTimeout(() => {
        closeModal();
        setIsFailed(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const getKeyNftPrice = async () => {
      setIsPendingSetKeyPrice(true);
      await wallet.switchChain(blastSepolia.id);
      const provider = await wallet.getEthersProvider();
      const { keyNftShareContract } = await ethersContract(provider);
      let keyNftPrice;
      if (isBuy) {
        keyNftPrice = await keyNftShareContract.getBuyPrice(shareObject, 1);
      } else {
        keyNftPrice = await keyNftShareContract.getSellPrice(shareObject, 1);
      }
      const formatPrice =
        Math.floor(formatEther(keyNftPrice) * 100000) / 100000;
      setDisplayKeyPrice(formatPrice);
      setIsPendingSetKeyPrice(false);
    };

    if (wallet && displayKeyPrice === 0) getKeyNftPrice();
  }, [displayKeyPrice, isBuy, shareObject, wallet]);

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
        {isDoneTradeKeyNft ? (
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="text-gray60 h-20 w-20"
          />
        ) : isPending ? (
          <div className="inline-flex flex-col justify-center items-center space-y-4">
            <p className="animate-spin h-16 w-16 border-4 border-orange rounded-full border-t-transparent" />
            <p>Processing...</p>
          </div>
        ) : isFailed ? (
          <div className="inline-flex flex-col justify-center items-center space-y-6">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="text-red h-20 w-20"
            />
            <p className="text-red font-semibold text-lg">
              Fail Transaction ...
            </p>
          </div>
        ) : (
          <>
            <p className="font-semibold text-2xl ">Trade Keys</p>
            <div className="flex w-full items-center justify-between space-x-4 mt-8">
              <div className="inline-flex items-center space-x-2">
                <Image
                  src={icon}
                  alt="user"
                  className="rounded-full"
                  width={48}
                  height={48}
                />
                <div className="inline-flex flex-col items-start justify-center">
                  <p className="font-semibold">{name}</p>
                  <p className="text-gray60">You own {ownKey} key</p>
                </div>
              </div>
              <div
                className={`${
                  isPendingSetKeyPrice ? "" : "bg-squareGray"
                } px-2 py-1 rounded-lg`}
              >
                {isPendingSetKeyPrice ? (
                  <p className="animate-spin h-6 w-6 border-4 border-orange rounded-full border-t-transparent" />
                ) : (
                  <p
                    className={`${
                      isBuy ? "text-green" : "text-red"
                    } text-gray60 text-sm font-semibold`}
                  >
                    {displayKeyPrice} ETH
                  </p>
                )}
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
              onClick={() => tradeKey(shareObject, isBuy)}
            >
              {isBuy ? "Buy" : "Sell"} a key
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default KeyTradeModal;
