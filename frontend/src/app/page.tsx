"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { useRouter } from "next/navigation";
import OrangeButton from "./components/common/OrangeButton";

export default function Home() {
  const router = useRouter();
  const [isStandalone, setisStandalone] = useState(false);

  const changeNextPage = () => {
    router.push("/login/wallet");
  };

  useEffect(() => {
    setisStandalone("standalone" in navigator && !!navigator.standalone);
  }, []);

  return (
    <main className="flex flex-col items-center justify-between bg-black">
      <div className="flex flex-col space-y-10 w-full justify-center items-center h-screen">
        <div className="flex w-full justify-center items-center space-x-5 px-5">
          <Image
            src="/static/img/icon/long_star_logo_black.jpg"
            alt="long_star"
            className=""
            width={48}
            height={48}
          />
          <p className="font-semibold text-white text-5xl">Long Star</p>
        </div>
        <p className="text-white text-center">
          Long Star is a Web3 Social Fi platform that enables creators to
          receive ongoing support from their followers via social tokens.
        </p>
        {isStandalone && (
          <OrangeButton
            text={"Proceed"}
            buttonAction={changeNextPage}
            disabled={!isStandalone}
          />
        )}
      </div>
    </main>
  );
}
