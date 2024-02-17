"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
            src="/static/img/banner/long_star_yellow.jpg"
            alt="long_star"
            className=""
            width={400}
            height={400}
          />
        </div>
        <p className="text-white text-center xl:w-[500px] w-full px-5">
          LongStar is a Social Fi platform that enables creators to get native
          yield from their followers via social tokens.
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
