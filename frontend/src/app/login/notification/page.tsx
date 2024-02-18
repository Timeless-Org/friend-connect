"use client";

import Navigation from "@components/common/Navigation";
import OrangeButton from "@components/common/OrangeButton";
import { Button } from "@components/ui/button";
import { usePrivy } from "@privy-io/react-auth";
import { addUserNotification } from "@utils/api";
import { IAddress } from "@utils/types";
import { useRouter } from "next/navigation";

export default function LoginNotification() {
  const router = useRouter();
  const { user } = usePrivy();
  const address = (user?.wallet?.address as IAddress) || "0x";

  const changePrePage = () => {
    router.push("/login/key");
  };
  const changeNextPage = async (notification: boolean = false) => {
    if (notification) await addUserNotification(address, notification);
    router.push("/login/profile");
  };

  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="flex flex-col justify-between h-screen w-full pt-10 pb-5">
        <div>
          <Navigation
            changePrePage={changePrePage}
            progressValue={71.5}
            pageNum={5}
          />
          <div className="mt-10 w-full flex flex-col items-start justify-center">
            <p className="font-semibold text-lg">Exclusive chats</p>
            <p className="text-gray60 mt-4">
              Keys give you access to exclusive one-to-many chats with your
              friends.
              <br />
              <br />
              Turn on notifications to find out when new messages come in.
            </p>
          </div>
        </div>

        <div className="flex flex-col px-5">
          <OrangeButton
            text={"Enable notifications"}
            buttonAction={() => changeNextPage(true)}
          />
          <Button
            variant="none"
            className="w-full h-12 mt-2"
            onClick={() => changeNextPage(false)}
          >
            No notifications
          </Button>
        </div>
      </div>
    </div>
  );
}
