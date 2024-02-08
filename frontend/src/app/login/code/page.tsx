"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "@components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Navigation from "@components/common/Navigation";

export default function LoginLoginCode() {
  const router = useRouter();

  const [code, setCode] = useState<string>("");

  const verifyCode = () => {};

  const handleSetCode = (event: ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const changePrePage = () => {
    router.push("/login/wallet");
  };

  return (
    <div className="container flex flex-col items-center justify-center mt-10">
      <Navigation
        changePrePage={changePrePage}
        progressValue={14.3}
        pageNum={1}
      />
      <div className="mt-10 w-full flex flex-col items-start justify-center">
        <p className="font-semibold text-lg">Got an invite code?</p>
        <p className="text-gray60 mt-4">
          friend.tech is currently in beta. Get an invite code from an existing
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
          variant="roundedBtn"
          className="w-full h-12"
          onClick={verifyCode}
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
