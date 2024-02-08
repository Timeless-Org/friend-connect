"use client";

import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import Navigation from "@components/common/Navigation";
import IconCircle from "@components/common/IconCircle";
import OrangeButton from "@components/common/OrangeButton";

export default function LoginDeposit() {
  const address = "0x1234567890123456789012345678901234567890";
  const router = useRouter();
  const changePrePage = () => {
    router.push("/login/twitter");
  };

  return (
    <div className="container flex flex-col items-center justify-center mt-10">
      <Navigation
        changePrePage={changePrePage}
        progressValue={42.9}
        pageNum={3}
      />
      <div className="mt-10 w-full flex flex-col items-start justify-center">
        <p className="font-semibold text-lg">Get Some ETH on Blast</p>
        <p className="text-gray60 mt-4">
          You&apos;ll use ETH, the official currency of Base, when you buy and
          sell your friends&apos; keys.
        </p>
      </div>
      <div className="mt-10 w-full flex flex-col items-start justify-center">
        <div className="w-full flex justify-between bg-squareGray py-6 px-4 rounded-xl items-center">
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
        </div>
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
          <Button variant="linkButton" className="font-semibold py-5">
            Copy
          </Button>
        </div>
      </div>

      <div className="flex flex-col fixed bottom-0 mb-10 w-full px-10 pt-10">
        <div className="flex justify-between items-center mb-3">
          <p className="text-gray60 font-semibold">Wallet Balance:</p>
          <div className="flex justify-center items-center">
            <p className="mr-3 font-semibold">
              0 <span className="text-gray60">ETH</span>
            </p>
            <FontAwesomeIcon icon={faArrowsRotate} className="h-4" />
          </div>
        </div>
        <OrangeButton text={"Proceed"} />
      </div>
    </div>
  );
}
