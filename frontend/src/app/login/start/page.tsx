"use client";

import { useRouter } from "next/navigation";
import Navigation from "@components/common/Navigation";
import OrangeButton from "@components/common/OrangeButton";
import { Checkbox } from "@/components/ui/checkbox";


export default function LoginStart() {
  const router = useRouter();
  const changePrePage = () => {
    router.push("/login/profile");
  };

  return (
    <div className="container flex flex-col items-center justify-center mt-10">
      <Navigation
        changePrePage={changePrePage}
        progressValue={100}
        pageNum={7}
      />
      <div className="mt-10 w-full flex flex-col items-start justify-center">
        <p className="font-semibold text-lg">Long Star is in beta!</p>
        <p className="text-gray60 mt-4">
          Thanks for being an early supporter and helping us test the app.
          We&apos;ve given you three invites to share with friends. You can
          find these codes in the Airdrop tab. If you have any feedback, please
          let us know on Twitter at @friendtech. By using this app, you confirm
          that you are 18 years of age or older.
        </p>
      </div>

      <div className="flex flex-col fixed bottom-0 mb-10 w-full px-10 pt-10">
        <div className="flex items-center space-x-2 justify-start mb-3">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm"
          >
            Post a Tweet to let your friends know you joined
          </label>
        </div>
        <OrangeButton text={"Start using the app"} />
      </div>
    </div>
  );
}
