'use client'

import React from 'react'
import { PrivyWagmiConnector } from '@privy-io/wagmi-connector'
import { configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { blastSepolia } from '@lib/chain'

const config = configureChains([blastSepolia], [publicProvider()])

export default function PrivyWagmiConnectorComponent({ children }: { children: React.ReactNode }) {
  return <PrivyWagmiConnector wagmiChainsConfig={config}>{children}</PrivyWagmiConnector>
}
