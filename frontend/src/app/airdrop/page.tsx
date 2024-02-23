'use client'

import { useEffect, useState } from 'react'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePrivy } from '@privy-io/react-auth'
import Copy from '@components/common/Copy'
import Footer from '@components/common/Footer'
import Header from '@components/common/Header'
import { getCode } from '@utils/api'
import { IAddress } from '@utils/types'

export default function AirDrop() {
  const { user } = usePrivy()
  const address = (user?.wallet?.address as IAddress) || '0x'

  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [code, setCode] = useState<string>('')

  useEffect(() => {
    const getUseCode = async () => {
      const code = await getCode(address)
      if (code) setCode(code)
    }
    if (address && !code) getUseCode()
  }, [address, code])

  return (
    <>
      <Header />
      <div className="mb-16 mt-24 flex w-full flex-col items-start justify-center px-8">
        <div className="mt-4 flex w-full items-center justify-center">
          <p className="text-center text-gray60">
            Points are airdropped every Friday and
            <br /> will have future uses in Long Star.
          </p>
        </div>
        <div className="mt-10 inline-flex w-full flex-col space-y-4 border-b-2 border-grayThin pb-6">
          <p className="text-gray60">Your Points</p>
          <p>
            <span className="font-semibold">-</span> （Last week: -）
          </p>
        </div>
        <div className="mt-6 inline-flex w-full flex-col space-y-4 border-b-2 border-grayThin pb-6">
          <p className="text-gray60">Weekly leader board</p>
          <p>-</p>
        </div>
        <div className="mt-6 inline-flex w-full flex-col space-y-4 border-b-2 border-grayThin pb-6">
          <p className="text-gray60">Your rank</p>
          <div className="flex flex-row flex-wrap items-start justify-start">
            {/* {pointInfo.roles?.map((role, index) => (
              <p
                key={index}
                className="self-start text-center px-4 py-1 bg-greenThin rounded-lg basis-1/5 mr-2 mt-2"
              >
                {role}
              </p>
            ))} */}
            <p className="mr-2 mt-2 basis-1/5 self-start rounded-lg bg-greenThin px-4 py-1 text-center">Testnet</p>
          </div>
        </div>
        <div className="mt-6 inline-flex w-full flex-col space-y-4 border-b-2 border-grayThin pb-6">
          <p className="text-gray60">Invite a friend</p>
          <div className="inline-flex items-center justify-start space-x-3">
            <p>{code}</p>
            <Copy
              copyText={code}
              content={
                <FontAwesomeIcon
                  icon={isCopied ? faCheck : faCopy}
                  className="h-3 rounded-full bg-squareGray p-2 text-gray60"
                />
              }
              setIsCopied={setIsCopied}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
