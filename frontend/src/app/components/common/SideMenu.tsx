import { useCallback, useEffect, useState } from 'react'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { faAngleRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWallets } from '@privy-io/react-auth'
import Image from 'next/image'
import { blastSepolia } from '@/lib/chain'
import { formatEther } from '@/lib/common'
import MenuWindow from '@components/common/MenuWindow'

interface ISideMenu {
  isOpen: boolean
  setMenuOpen: (isOpen: boolean) => void
  userName: string
  address: string
}

const SideMenu = ({ isOpen, setMenuOpen, userName, address }: ISideMenu) => {
  const { wallets } = useWallets()
  const embeddedWallet = wallets[0]

  const [isMenuContentOpen, setMenuContentOpen] = useState<boolean>(false)
  const [menuContent, setMenuContent] = useState<string>('')
  const [balance, setBalance] = useState<number | null>(0)

  const openMenuContent = (menu: string) => {
    setMenuContent(menu)
    setMenuContentOpen(true)
  }

  const getBalance = useCallback(async () => {
    if (embeddedWallet) {
      await embeddedWallet.switchChain(blastSepolia.id)
      const provider = await embeddedWallet.getEthersProvider()
      const currentBalance = await provider.getBalance(address)
      const formatBalance = Math.floor(formatEther(currentBalance) * 100000) / 100000
      setBalance(formatBalance)
    }
  }, [address, embeddedWallet])

  useEffect(() => {
    if (balance === 0) {
      getBalance()
    }
  }, [address, balance, getBalance, wallets])
  return (
    <>
      <MenuWindow
        isMenuContentOpen={isMenuContentOpen}
        menuContent={menuContent}
        setMenuContentOpen={setMenuContentOpen}
        isLoginUser={false}
        wallet={embeddedWallet}
      />
      <div
        className={`fixed left-0 top-0 ${
          isOpen ? 'w-11/12 translate-x-0' : 'w-none -translate-x-full'
        } z-40 h-full transition-transform duration-300 ease-in-out`}
      >
        <div className="flex h-16 w-full items-center justify-between bg-black px-4 ">
          <Image src="/static/img/icon/long_star_logo_black.jpg" alt="long_star" width={40} height={40} />
          <p className="text-lg font-semibold text-white">Menu</p>
          <button type="button" onClick={() => setMenuOpen(false)}>
            <FontAwesomeIcon icon={faXmark} className="h-6 text-white" />
          </button>
        </div>
        <div className="h-full border-r border-grayThin  bg-white px-4 pt-6">
          <div className="flex flex-col items-start justify-center">
            <p className="font-semibold text-gray60">Account</p>
            <div className="mt-4 flex w-full flex-col items-start justify-center rounded-xl bg-squareGray px-2">
              <button
                type="button"
                className="flex w-full items-center justify-between border-b border-grayThin p-4 pb-3"
                onClick={() => openMenuContent('Account')}
              >
                <p className="font-semibold text-gray60">{userName}</p>
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
          <div className="mt-6 flex flex-col items-start justify-center">
            <p className="font-semibold text-gray60">Assets</p>
            <div className="mt-4 flex w-full flex-col items-start justify-center rounded-xl bg-squareGray px-2">
              <div className="flex w-full items-center justify-between border-b border-grayThin p-4 pb-3">
                <div className="flex items-center justify-center space-x-3">
                  <FontAwesomeIcon icon={faEthereum} className="size-4 rounded-full bg-white p-2 text-gray60" />
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
  )
}

export default SideMenu
