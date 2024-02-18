"use client";

import OrangeButton from "@components/common/OrangeButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser } from "@utils/api";
import { usePrivy } from "@privy-io/react-auth";

export default function Home() {
  const { user } = usePrivy();

  const router = useRouter();
  const [isStandalone, setisStandalone] = useState(false);
  const [isUserRegistered, setUserRegistered] = useState<boolean>(false);

  const changeNextPage = () => {
    router.push("/login/wallet");
  };

  useEffect(() => {
    setisStandalone("standalone" in navigator && !!navigator.standalone);
  }, []);

  useEffect(() => {
    const getUserData = async (address: string) => {
      const userData = await getUser(address);
      if (userData.register) {
        setUserRegistered(true);
      }
    };
    if (user?.wallet?.address) {
      getUserData(user?.wallet?.address);
    }
  }, [user?.wallet?.address]);

  useEffect(() => {
    if (isUserRegistered) {
      router.push("/keys");
    }
  }, [isUserRegistered, router]);

  return (
    <main className="flex flex-col items-center justify-between bg-black h-full">
      <div className="flex flex-col space-y-10 w-full justify-center items-center h-full">
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
        {/* <div className="flex flex-col mb-10 px-5">
          <OrangeButton
            text={"change keys page"}
            buttonAction={() => router.push("/keys")}
          />
        </div> */}
      </div>
    </main>
  );
}
