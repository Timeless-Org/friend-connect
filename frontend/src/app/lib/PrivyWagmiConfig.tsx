"use client";

import { blastSepolia } from "@/lib/chain";
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";
import React from "react";
import { configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const config = configureChains([blastSepolia], [publicProvider()]);

export default function PrivyWagmiConnectorComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivyWagmiConnector wagmiChainsConfig={config}>
      {children}
    </PrivyWagmiConnector>
  );
}
