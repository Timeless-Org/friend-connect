"use client";

import { useRouter } from "next/navigation";
import Navigation from "@components/common/Navigation";
import OrangeButton from "@components/common/OrangeButton";

export default function LoginKey() {
  const router = useRouter();
  const changePrePage = () => {
    router.push("/login/deposit");
  };

  return (
    <div className="container flex flex-col items-center justify-center mt-10">
      <Navigation
        changePrePage={changePrePage}
        progressValue={57.2}
        pageNum={4}
      />
      <div className="mt-10 w-full flex flex-col items-start justify-center">
        <p className="font-semibold text-lg">Buy your first key</p>
        <p className="text-gray60 mt-4">
          Everyone on friend.tech has a chat unlocked by their keys. These keys
          can be bought and sold on a person&apos;s profile and their price
          goes up and down based on how many are currently circulating.
          You&apos;ll earn trading fees every time your keys are bought and
          sold by anyone. To create your profile, buy the first key to your own
          room for free.
        </p>
      </div>

      <div className="flex flex-col fixed bottom-0 mb-10 w-full px-10 pt-10">
        <OrangeButton text={"Buy Key for $0"} />
      </div>
    </div>
  );
}
