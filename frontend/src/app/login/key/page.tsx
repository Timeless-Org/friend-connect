"use client";

import { blastSepolia } from "@/lib/chain";
import { ethersContract } from "@/lib/ethersContract";
import { createTrade } from "@/utils/api";
import Navigation from "@components/common/Navigation";
import OrangeButton from "@components/common/OrangeButton";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { IAddress } from "@utils/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function LoginKey() {
  const router = useRouter();
  const { wallets } = useWallets();
  const embeddedWallet = wallets[0];
  const { user } = usePrivy();
  const address = (user?.wallet?.address as IAddress) || "0x";

  const [keyNftBalance, setKeyNftBalance] = useState<number>(0);

  const changePrePage = () => {
    router.push("/login/deposit");
  };

  const changeNextPage = async () => {
    await createTrade(address, address, 0, true);
    router.push("/login/profile");
  };

  const getKeyNftBalance = useCallback(async () => {
    if (embeddedWallet) {
      await embeddedWallet.switchChain(blastSepolia.id);
      const provider = await embeddedWallet.getEthersProvider();
      const { keyNftShareContract } = await ethersContract(provider);
      const keyNftBalance = await keyNftShareContract.sharesBalance(
        address,
        address
      );
      setKeyNftBalance(keyNftBalance);
    }
  }, [address, embeddedWallet]);

  const buyKey = async (_address: IAddress) => {
    console.log(`embeddedWallet: ${embeddedWallet}`);
    if (embeddedWallet) {
      await embeddedWallet.switchChain(blastSepolia.id);
      const provider = await embeddedWallet.getEthersProvider();
      const { keyNftShareContract, gasPrice } = await ethersContract(provider);
      const transaction = await keyNftShareContract.buyShares(_address, 1, {
        gasLimit: 2000000,
      });
      await transaction.wait();
      getKeyNftBalance();
    }
  };

  useEffect(() => {
    if (keyNftBalance === 0) {
      getKeyNftBalance();
    }
  }, [getKeyNftBalance, keyNftBalance]);

  return (
    <div className="container flex flex-col items-center justify-center mt-10">
      <Navigation
        changePrePage={changePrePage}
        progressValue={57.2}
        pageNum={4}
      />
      <div className="mt-10 w-full flex flex-col items-start justify-center">
        <p className="font-semibold text-lg">Buy your first key</p>
        <p className="text-gray60 mt-4">
          Everyone has a chat unlocked by their NFT keys. These NFT keys can be
          bought and sold and their price goes up and down based on how many are
          currently circulating.
          <br />
          <br />
          You can trade keys with 0% trade fees.
          <br />
          <br />
          You&rsquo;ll earn native yield based on your rankings.
          <br />
          <br />
          To create your profile, buy the first key to your own room.
        </p>
      </div>

      <div className="flex flex-col fixed bottom-0 mb-10 w-full px-10 pt-10">
        <OrangeButton
          text={keyNftBalance > 0 ? "Proceed" : "Buy Key for $0"}
          buttonAction={
            keyNftBalance > 0 ? changeNextPage : () => buyKey(address)
          }
        />
      </div>
    </div>
  );
}
