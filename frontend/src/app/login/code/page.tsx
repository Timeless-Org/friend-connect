"use client";

import Navigation from "@components/common/Navigation";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { codeVerify } from "@utils/api";
import { usePrivy } from "@privy-io/react-auth";
import ErrorModal from "@components/Modal/ErrorModal";

export default function LoginLoginCode() {
  const router = useRouter();
  const { user, logout } = usePrivy();

  const [code, setCode] = useState<string>("");
  const [isModalDisplay, setIsmModalDisplay] = useState<boolean>(false);

  const verifyCode = async (code: string) => {
    try {
      if (user?.wallet && user.wallet.address) {
        const result = await codeVerify(code, user.wallet.address);
        console.log(`result: ${result}`);
        if (result) {
          router.push("/login/twitter");
          return;
        }
      }
      setIsmModalDisplay(true);
    } catch (err: any) {
      console.log(`err: ${err.status}`);
      if (err.status === 400) {
        router.push("/login/twitter");
        return;
      }
      setIsmModalDisplay(true);
    }
  };

  const handleSetCode = (event: ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const closeErrorModal = () => {
    setIsmModalDisplay(false);
  };

  const changePrePage = () => {
    router.push("/login/wallet");
  };

  return (
    <div className="container flex flex-col items-center justify-center mt-10 w-full h-full">
      <ErrorModal
        message={"Invalid code"}
        isModalDisplay={isModalDisplay}
        closeModal={closeErrorModal}
      />
      <Navigation
        changePrePage={changePrePage}
        progressValue={14.3}
        pageNum={1}
      />
      <div className="mt-10 w-full flex flex-col items-start justify-center">
        <p className="font-semibold text-lg">Got an invite code?</p>
        <p className="text-gray60 mt-4">
          long star is currently in beta. Get an invite code from an existing
          user to sign up
        </p>
      </div>
      <div className="mt-10 w-full flex flex-col items-start justify-center">
        <p className="text-gray">Invite Code</p>
        <Input
          type="text"
          placeholder="Code"
          className="mt-2"
          onChange={handleSetCode}
        />
      </div>

      <div className="flex flex-col fixed bottom-0 mb-10 w-full px-10 pt-10">
        <Button
          variant={code ? "default" : "roundedBtn"}
          className="w-full h-12"
          onClick={() => verifyCode(code)}
          disabled={!code}
        >
          Proceed
        </Button>
        <Button variant="bgWhite" className="w-full h-12">
          Log out
        </Button>
      </div>
    </div>
  );
}
