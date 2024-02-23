'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { blastSepolia } from '@lib/chain'
import { PRIVY_APP_ID } from '@utils/config'

export default function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ['google', 'apple', 'wallet'],
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: '/static/img/icon/long_star_logo_black.jpg'
        },
        defaultChain: blastSepolia,
        supportedChains: [blastSepolia],
        embeddedWallets: {
          createOnLogin: 'users-without-wallets'
        }
      }}
    >
      {children}
    </PrivyProvider>
  )
}
