"use client";

import { Button } from "@components/ui/button";
import { usePrivy } from "@privy-io/react-auth";
import { createUser } from "@utils/api";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginLoginWallet() {
  const router = useRouter();
  const { login, authenticated, logout, user } = usePrivy();

  const createUserData = async () => {
    if (user?.wallet && user.wallet.address) {
      const result = await createUser(user.wallet.address);
      if (result) {
        router.push("/login/code");
        return;
      }
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center h-screen pb-32">
      <Image
        src="/static/img/icon/long_star_logo_black.jpg"
        alt="long star"
        width={300}
        height={300}
        className="rounded-full"
      />
      <div className="flex flex-col fixed bottom-0 mb-10 w-full px-10 pt-10">
        {authenticated ? (
          <Button
            variant="default"
            className="w-full h-12"
            onClick={createUserData}
          >
            Proceed
          </Button>
        ) : (
          <Button
            variant="default"
            className="w-full h-12"
            onClick={login}
          >
            Create a wallet
          </Button>
        )}
        <Button
          variant="bgWhite"
          className={`${authenticated ? "flex" : "hidden"} w-full h-12`}
          onClick={logout}
        >
          Log out
        </Button>
      </div>
    </div>
  );
}
