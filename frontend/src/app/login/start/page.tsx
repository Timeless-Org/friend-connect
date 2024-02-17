"use client";

import Navigation from "@components/common/Navigation";
import OrangeButton from "@components/common/OrangeButton";
import { Checkbox } from "@components/ui/checkbox";
import { useRouter } from "next/navigation";

export default function LoginStart() {
  const router = useRouter();
  const changePrePage = () => {
    router.push("/login/profile");
  };

  const changeKeysPage = () => {
    router.push("/keys");
  };

  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="flex flex-col justify-between h-screen w-full pt-10 pb-5">
        <div>
          <Navigation
            changePrePage={changePrePage}
            progressValue={100}
            pageNum={7}
          />
          <div className="mt-10 w-full flex flex-col items-start justify-center">
            <p className="font-semibold text-lg">Long Star is in beta!</p>
            <p className="text-gray60 mt-4">
              Thanks for being an early supporter and helping us test the app.
              <br />
              <br />
              We&rsquo;ve given you invite code to share with friends. You can
              find it in the Airdrop tab. <br />
              <br />
              If you have any feedback, please let us know on Twitter at
              @longstar_social.
              <br />
              <br />
              By using this app, you confirm our terms of service
            </p>
          </div>
        </div>

        <div className="flex flex-col mb-5 px-5">
          <div className="flex items-center space-x-2 justify-start mb-3">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm">
              Post a Tweet to let your friends know you joined
            </label>
          </div>
          <OrangeButton
            text={"Start using the app"}
            buttonAction={changeKeysPage}
          />
        </div>
      </div>
    </div>
  );
}
