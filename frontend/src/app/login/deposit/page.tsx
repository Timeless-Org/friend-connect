"use client";

import { blastSepolia } from "@/lib/chain";
import { formatEther } from "@/lib/common";
import IconCircle from "@components/common/IconCircle";
import Navigation from "@components/common/Navigation";
import { Button } from "@components/ui/button";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faArrowsRotate, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { copyClipboard } from "@utils/common";
import { IAddress } from "@utils/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginDeposit() {
  const { user } = usePrivy();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const address = (user?.wallet?.address as IAddress) || "0x";
  const { wallets } = useWallets();

  const [balance, setBalance] = useState<number | null>(0);

  const router = useRouter();
  const changePrePage = () => {
    router.push("/login/twitter");
  };

  const handleCopy = async (copyText: string) => {
    try {
      await copyClipboard(copyText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {}
  };

  const getBalance = async () => {
    const embeddedWallet = wallets[0];
    if (embeddedWallet) {
      await embeddedWallet.switchChain(blastSepolia.id);
      const provider = await embeddedWallet.getEthersProvider();
      const currentBalance = await provider.getBalance(address);
      const formatBalance =
        Math.floor(formatEther(currentBalance) * 100000) / 100000;
      setBalance(formatBalance);
    }
  };

  useEffect(() => {

    if (balance === 0) {
      getBalance();
    }
  }, [address, balance, getBalance, wallets]);

  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="flex flex-col justify-between h-screen w-full pt-10 pb-5">
        <div>
          <Navigation
            changePrePage={changePrePage}
            progressValue={42.9}
            pageNum={3}
          />
          <div className="mt-10 w-full flex flex-col items-start justify-center">
            <p className="font-semibold text-lg">Get Some ETH on Blast</p>
            <p className="text-gray60 mt-4">
              You&apos;ll use ETH, the official currency of Base, when you buy
              and sell your friends&apos; keys.
            </p>
          </div>
          <div className="mt-10 w-full flex flex-col items-start justify-center space-y-4">
            {/* <div className="w-full flex justify-between bg-squareGray py-6 px-4 rounded-xl items-center">
              <div className="flex items-center justify-center space-x-3">
                <IconCircle icon={faEthereum} />
                <div className="inline-flex flex-col items-start justify-center">
                  <p className="font-semibold text-gray">Deposit on mainnet</p>
                  <p className="text-sm">Can use another device</p>
                </div>
              </div>
              <Button variant="linkButton" className="font-semibold py-5">
                Deposit
              </Button>
            </div> */}
            <div className="w-full flex justify-between bg-squareGray py-6 px-4 rounded-xl items-center">
              <div className="flex items-center justify-center space-x-3">
                <IconCircle icon={faCopy} />
                <div className="inline-flex flex-col items-start justify-center">
                  <p className="font-semibold text-gray">Receive on Blast</p>
                  <p className="text-sm">{`${address.substring(
                    0,
                    8
                  )}...${address.substring(address.length - 8)}`}</p>
                </div>
              </div>
              <Button
                variant="linkButton"
                className={`font-semibold ${isCopied ? "p-3" : "py-5"}`}
                onClick={() => handleCopy(address)}
              >
                {isCopied ? (
                  <FontAwesomeIcon icon={faCheck} className="h-4" />
                ) : (
                  "Copy"
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full px-5 mb-10">
          <div className="flex justify-between items-center mb-3">
            <p className="text-gray60 font-semibold">Wallet Balance:</p>
            <div className="flex justify-center items-center">
              <p className="mr-3 font-semibold">
                {balance || 0} <span className="text-gray60">ETH</span>
              </p>
              <button type="button" onClick={getBalance}>
                <FontAwesomeIcon icon={faArrowsRotate} className="h-4" />
              </button>
            </div>
          </div>
          <Button
            variant={
              balance !== null && balance >= 0.01 ? "default" : "roundedBtn"
            }
            className="w-full h-12"
            onClick={() => router.push("/login/key")}
            disabled={!(balance !== null && balance >= 0.01)}
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
}
