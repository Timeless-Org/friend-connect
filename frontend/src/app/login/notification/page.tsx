"use client";

import { useRouter } from "next/navigation";
import { Button } from "@components/ui/button";
import Navigation from "@components/common/Navigation";
import OrangeButton from "@components/common/OrangeButton";

export default function LoginNotification() {
  const router = useRouter();
  const changePrePage = () => {
    router.push("/login/deposit");
  };

  return (
    <div className="container flex flex-col items-center justify-center mt-10">
      <Navigation
        changePrePage={changePrePage}
        progressValue={71.5}
        pageNum={5}
      />
      <div className="mt-10 w-full flex flex-col items-start justify-center">
        <p className="font-semibold text-lg">Exclusive chats</p>
        <p className="text-gray60 mt-4">
          Keys give you access to exclusive one-to-many chats with your friends.
          In your own chat, you&apos;ll see messages from all your holders,
          but they&apos;ll only see messages from you. To prevent spam, every
          holder gets to send three messages before waiting for you to reply and
          reset their limit. Turn on notifications to find out when new messages
          come in. You&apos;ll be able to choose different notification levels
          on a per-room basis.
        </p>
      </div>

      <div className="flex flex-col fixed bottom-0 mb-10 w-full px-10 pt-10">
        <OrangeButton text={"Enable notifications"} />
        <Button
          variant="none"
          className="w-full h-12"
                  onClick={() => {}}
        >
          No notifications
        </Button>
      </div>
    </div>
  );
}
