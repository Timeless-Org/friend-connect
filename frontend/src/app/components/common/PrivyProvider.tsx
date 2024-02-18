"use client";

import { blastSepolia } from "@lib/chain";
import { PrivyProvider } from "@privy-io/react-auth";
import { PRIVY_APP_ID } from "@utils/config";
import { useRouter } from "next/navigation";

export default function WalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ["google", "apple", "wallet"],
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          logo: "/static/img/icon/long_star_logo_black.jpg",
        },
        defaultChain: blastSepolia,
        supportedChains: [blastSepolia],
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
