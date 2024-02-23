import { useState } from 'react'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { faXmark, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePrivy } from '@privy-io/react-auth'
import { ethers } from 'ethers'
import { blastSepolia } from '@/lib/chain'
import { IAddress } from '@/utils/types'
import OrangeButton from '@components/common/OrangeButton'
import { Input } from '@components/ui/input'

interface IWithdrawModal {
  isModalDisplay: boolean
  closeModal: () => void
}
const WithdrawModal = ({ isModalDisplay, closeModal }: IWithdrawModal) => {
  const { sendTransaction } = usePrivy()

  const [price, setPrice] = useState<number>(0)
  const [toAddress, setToAddress] = useState<IAddress | string>('')
  const [txStatus, setTxStatus] = useState<string>('')

  const withdraw = async () => {
    try {
      const unsignedTx = {
        to: toAddress,
        chainId: blastSepolia.id,
        value: ethers.utils.parseUnits(price.toString(), 18).toHexString()
      }
      const uiConfig = {
        header: 'Sample header text',
        description: 'Sample description text',
        buttonText: 'Sample button text'
      }
      if (!toAddress || !price) throw new Error('Invalid input')
      setTxStatus('pending')
      await sendTransaction(unsignedTx, uiConfig)
      setTxStatus('success')
      setTimeout(() => {
        closeModal()
        setToAddress('0x')
        setPrice(0)
        setTxStatus('')
      }, 1000)
    } catch (error) {
      console.error(error)
      setTxStatus('failed')
      setTimeout(() => {
        setTxStatus('none')
      }, 1000)
    }
  }
  return (
    <div
      className={`${
        isModalDisplay ? 'flex' : 'hidden'
      } absolute inset-0 z-50 h-screen items-center justify-center bg-gray20`}
    >
      <div className="mx-4 inline-flex h-1/3 w-full flex-col items-center justify-start rounded-xl bg-white px-6 pt-5">
        <button type="button" className="z-50 inline-flex w-full items-center justify-end" onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} className="size-4 rounded-full bg-squareGray p-3" />
        </button>
        <div className="absolute inset-0  z-40 mt-6 inline-flex size-full flex-col items-center justify-center">
          {txStatus === 'success' ? (
            <FontAwesomeIcon icon={faCircleCheck} className="size-20 text-gray60" />
          ) : txStatus === 'failed' ? (
            <div className="inline-flex flex-col items-center justify-center space-y-6">
              <FontAwesomeIcon icon={faCircleExclamation} className="size-20 text-red" />
              <p className="text-lg font-semibold text-red">Incorrect input ...</p>
            </div>
          ) : (
            <div className="flex w-full flex-col items-center justify-center space-y-4">
              <div className="w-2/3 rounded-md border-2 border-gray20">
                <Input
                  type="text"
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value as unknown as IAddress)}
                  className="text-gray-700 mr-3 flex-1 px-4 py-2 ring-0 focus:border-0 focus:ring-0 active:border-0 active:ring-0"
                  placeholder="address"
                />
              </div>
              <div className="w-2/3 rounded-md border-2 border-gray20">
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="text-gray-700 mr-3 flex-1 rounded-lg border-none bg-white px-4 py-2 ring-0 focus:border-0 focus:ring-0 active:border-0 active:ring-0"
                />
              </div>
              <div className="w-2/3">
                <OrangeButton text={'Withdraw'} buttonAction={withdraw} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WithdrawModal
