import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import {
  faCircleCheck,
} from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { Input } from "@components/ui/input";
import OrangeButton from "@components/common/OrangeButton";
import { usePrivy } from "@privy-io/react-auth";
import { IAddress } from "@/utils/types";
import { blastSepolia } from "@/lib/chain";
import { ethers } from "ethers";

interface IWithdrawModal {
  isModalDisplay: boolean;
  closeModal: () => void;
}
const WithdrawModal = ({
  isModalDisplay,
  closeModal,
}: IWithdrawModal) => {
  const { sendTransaction } = usePrivy();

  const [price, setPrice] = useState<number>(0);
  const [toAddress, setToAddress] = useState<IAddress | string>("");
  const [txStatus, setTxStatus] = useState<string>("");

  const withdraw = async () => {
    try {
      const unsignedTx = {
        to: toAddress,
        chainId: blastSepolia.id,
        value: ethers.utils.parseUnits(price.toString(), 18).toHexString(),
      };
      const uiConfig = {
        header: "Sample header text",
        description: "Sample description text",
        buttonText: "Sample button text",
      };
      if (!toAddress || !price) throw new Error("Invalid input");
      setTxStatus("pending");
      await sendTransaction(unsignedTx, uiConfig);
      setTxStatus("success");
      setTimeout(() => {
        closeModal();
        setToAddress("0x");
        setPrice(0);
        setTxStatus("");
      }, 1000);
    } catch (error) {
      console.error(error);
      setTxStatus("failed");
      setTimeout(() => {
        setTxStatus("none");
      }, 1000);
    }
  };
  return (
    <div
      className={`${
        isModalDisplay ? "flex" : "hidden"
      } absolute inset-0 h-screen items-center justify-center bg-gray20 z-50`}
    >
      <div className="inline-flex flex-col w-full justify-start pt-5 items-center mx-4 px-6 h-1/3 rounded-xl bg-white">
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
        <div className="absolute inset-0  w-full inline-flex flex-col items-center justify-center h-full z-40 mt-6">
          {txStatus === "success" ? (
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-gray60 h-20 w-20"
            />
          ) : txStatus === "failed" ? (
            <div className="inline-flex flex-col justify-center items-center space-y-6">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="text-red h-20 w-20"
              />
              <p className="text-red font-semibold text-lg">
                Incorrect input ...
              </p>
            </div>
          ) : (
            <div className="flex flex-col w-full items-center justify-center space-y-4">
              <div className="border-2 border-gray20 w-2/3 rounded-md">
                <Input
                  type="text"
                  value={toAddress}
                  onChange={(e) =>
                    setToAddress(e.target.value as unknown as IAddress)
                  }
                  className="flex-1 px-4 py-2 mr-3 text-gray-700 focus:ring-0 ring-0 active:ring-0 focus:border-0 active:border-0"
                  placeholder="address"
                />
              </div>
              <div className="border-2 border-gray20 w-2/3 rounded-md">
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="flex-1 px-4 py-2 mr-3 text-gray-700 bg-white rounded-lg border-none focus:ring-0 ring-0 active:ring-0 focus:border-0 active:border-0"
                />
              </div>
              <div className="w-2/3">
                <OrangeButton text={"Withdraw"} buttonAction={withdraw} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
