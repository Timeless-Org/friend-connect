"use client";

import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import Navigation from "@components/common/Navigation";

export default function LoginConnectTwitter() {
  const router = useRouter();
  const changePrePage = () => {
    router.push("/login/code");
  };

  return (
    <div className="container flex flex-col items-center justify-center mt-10">
      <Navigation
        changePrePage={changePrePage}
        progressValue={28.6}
        pageNum={2}
      />
      <div className="mt-10 w-full flex flex-col items-start justify-center">
        <p className="font-semibold text-lg">Link your socials</p>
        <p className="text-gray60 mt-4">
          Connect your X account to verify your identity and make it easier for
          friends to discover and trade your token.
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
          <Button variant="linkButton" className="font-semibold py-5">
            Link
          </Button>
        </div>
      </div>

      <div className="flex flex-col fixed bottom-0 mb-10 w-full px-10 pt-10">
        <Button variant="bgWhite" className="w-full h-12">
          Log out
        </Button>
      </div>
    </div>
  );
}
