"use client";

import React from "react";
import { blastSepolia } from "@lib/chain";
import { configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";

const config = configureChains([blastSepolia], [publicProvider()]);

export default function PrivyWagmiConnectorComponent({ children }: { children: React.ReactNode }) {
  return (
    <PrivyWagmiConnector wagmiChainsConfig={config}>
      {children}
    </PrivyWagmiConnector>
  );
}
