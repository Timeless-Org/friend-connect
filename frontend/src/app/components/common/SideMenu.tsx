import MenuWindow from "@components/common/MenuWindow";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faAngleRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useWallets } from "@privy-io/react-auth";
import { blastSepolia } from "@/lib/chain";
import { formatEther } from "@/lib/common";

interface ISideMenu {
  isOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
  userName: string;
  address: string;
}

const SideMenu = ({ isOpen, setMenuOpen, userName, address }: ISideMenu) => {
  const [isMenuContentOpen, setMenuContentOpen] = useState<boolean>(false);
  const [menuContent, setMenuContent] = useState<string>("");
  const [balance, setBalance] = useState<number | null>(0);

  const { wallets } = useWallets();

  const openMenuContent = (menu: string) => {
    setMenuContent(menu);
    setMenuContentOpen(true);
  };

  const getBalance = useCallback(async () => {
    const embeddedWallet = wallets[0];
    if (embeddedWallet) {
      await embeddedWallet.switchChain(blastSepolia.id);
      const provider = await embeddedWallet.getEthersProvider();
      const currentBalance = await provider.getBalance(address);
      const formatBalance =
        Math.floor(formatEther(currentBalance) * 100000) / 100000;
      setBalance(formatBalance);
    }
  }, [address, wallets]);

  useEffect(() => {
    if (balance === 0) {
      getBalance();
    }
  }, [address, balance, getBalance, wallets]);
  return (
    <>
      <MenuWindow
        userName={"Cardene"}
        isMenuContentOpen={isMenuContentOpen}
        menuContent={menuContent}
        setMenuContentOpen={setMenuContentOpen}
        isLoginUser={false}
      />
      <div
        className={`fixed top-0 left-0 transform ${
          isOpen ? "translate-x-0 w-11/12" : "-translate-x-full w-none"
        } h-full transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex items-center justify-between px-4 h-16 w-full bg-black ">
          <Image
            src="/static/img/icon/long_star_logo_black.jpg"
            alt="long_star"
            width={40}
            height={40}
          />
          <p className="text-white text-lg font-semibold">Menu</p>
          <button type="button" onClick={() => setMenuOpen(false)}>
            <FontAwesomeIcon icon={faXmark} className="text-white h-6" />
          </button>
        </div>
        <div className="border-r border-grayThin bg-white  px-4 pt-6 h-full">
          <div className="flex flex-col justify-center items-start">
            <p className="font-semibold text-gray60">Account</p>
            <div className="flex flex-col w-full justify-center items-start bg-squareGray mt-4 rounded-xl px-2">
              <button
                type="button"
                className="pb-3 border-b border-grayThin flex justify-between w-full items-center p-4"
                onClick={() => openMenuContent("Account")}
              >
                <p className="text-gray60 font-semibold">{userName}</p>
                <FontAwesomeIcon icon={faAngleRight} className="h-4" />
              </button>
              {/* <button
                type="button"
                className="pb-3 border-b border-grayThin flex justify-between w-full items-center p-4"
                onClick={() => openMenuContent("Airdrop")}
              >
                <p className="text-gray60 font-semibold">Airdrop</p>
                <FontAwesomeIcon icon={faAngleRight} className="h-4" />
              </button>
              <button
                type="button"
                className="pb-3 border-b border-grayThin flex justify-between w-full items-center p-4"
                onClick={() => openMenuContent("Earn")}
              >
                <p className="text-gray60 font-semibold">Refer & Earn</p>
                <FontAwesomeIcon icon={faAngleRight} className="h-4" />
              </button>
              <button
                type="button"
                className="pb-3 border-b border-grayThin flex justify-between w-full items-center p-4"
                onClick={() => openMenuContent("Tickets")}
              >
                <p className="text-gray60 font-semibold">Tickets</p>
                <FontAwesomeIcon icon={faAngleRight} className="h-4" />
              </button>
              <button
                type="button"
                className="pb-3 flex justify-between w-full items-center p-4"
                onClick={() => openMenuContent("Bookmarks")}
              >
                <p className="text-gray60 font-semibold">Bookmarks</p>
                <FontAwesomeIcon icon={faAngleRight} className="h-4" />
              </button> */}
            </div>
          </div>
          <div className="flex flex-col justify-center items-start mt-6">
            <p className="font-semibold text-gray60">Assets</p>
            <div className="flex flex-col w-full justify-center items-start bg-squareGray mt-4 rounded-xl px-2">
              <div className="pb-3 border-b border-grayThin flex justify-between w-full items-center p-4">
                <div className="flex justify-center space-x-3 items-center">
                  <FontAwesomeIcon
                    icon={faEthereum}
                    className="h-4 w-4 p-2 bg-white text-gray60 rounded-full"
                  />
                  <p className="font-semibold">Blast ETH</p>
                </div>
                <p className="font-semibold text-gray60">{balance}</p>
              </div>
              {/* <div className="pb-3 flex justify-between w-full items-center p-4">
                <div className="flex justify-center space-x-3 items-center">
                  <FontAwesomeIcon
                    icon={faEthereum}
                    className="h-4 w-4 p-2 bg-white text-gray60 rounded-full"
                  />
                  <p className="font-semibold">ETH</p>
                </div>
                <p className="font-semibold text-gray60">0.0015</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
