"use client";

import { useState } from "react";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import Navigation from "@components/common/Navigation";
import { addUserTwitterProfile } from "@utils/api";
import { usePrivy } from "@privy-io/react-auth";
import ErrorModal from "@components/Modal/ErrorModal";

export default function LoginConnectTwitter() {
  const { user, linkTwitter, authenticated } = usePrivy();
  const router = useRouter();

  const [isModalDisplay, setIsmModalDisplay] = useState<boolean>(false);

  const changePrePage = () => {
    router.push("/login/code");
  };

  const changeNextPage = async () => {
    if (user && user.wallet?.address && user.twitter?.name) {
      await addUserTwitterProfile(
        user.wallet.address,
        user.twitter.name,
        user.twitter.profilePictureUrl || "",
        user.twitter.username || ""
      );
    }
    router.push("/login/deposit");
  };

  const connectTwitter = async () => {
    // if (user?.wallet?.address) {
    //   const url = await getTwitterAuthLink(user?.wallet?.address);
    //   if (url) router.push(url);
    // }
    if (!authenticated) return;
    if (user && user.twitter?.name) {
      setIsmModalDisplay(true);
    } else {
      linkTwitter();
    }
  };

  const closeErrorModal = () => {
    setIsmModalDisplay(false);
  };
  return (
    <div className="container flex flex-col items-center justify-center">
      <ErrorModal
        message={"Already linked to Twitter"}
        isModalDisplay={isModalDisplay}
        closeModal={closeErrorModal}
      />
      <div className="flex flex-col justify-between h-screen w-full pt-10 pb-5">
        <div>
          <Navigation
            changePrePage={changePrePage}
            progressValue={28.6}
            pageNum={2}
          />
          <div className="mt-10 w-full flex flex-col items-start justify-center">
            <p className="font-semibold text-lg">Link your socials</p>
            <p className="text-gray60 mt-4">
              Connect your X account to verify your identity and make it easier
              for friends to discover and trade your token.
            </p>
          </div>
          <div className="mt-10 w-full flex flex-col items-start justify-center">
            <div className="w-full flex justify-between bg-squareGray py-6 px-4 rounded-xl items-center">
              <div className="flex items-center justify-center space-x-3">
                <FontAwesomeIcon
                  icon={faXTwitter}
                  className="h-6 rounded-full  p-2 bg-white"
                />
                <p className="font-semibold text-lg">Link your Twitter</p>
              </div>
              <Button
                variant="linkButton"
                className="font-semibold py-5"
                onClick={connectTwitter}
              >
                Link
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full px-5">
          <Button
            variant={user?.twitter?.name ? "default" : "roundedBtn"}
            className="w-full h-12"
            onClick={changeNextPage}
            disabled={!user?.twitter?.name}
          >
            Proceed
          </Button>
          <Button variant="bgWhite" className="w-full h-12">
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}
