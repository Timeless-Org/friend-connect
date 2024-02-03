"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@components/common/Navigation";
import OrangeButton from "@components/common/OrangeButton";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import InputFile from "@components/common/InputFile";
import { Textarea } from "@/components/ui/textarea";

export default function LoginNotification() {
  const router = useRouter();

  const [userName, setUserName] = useState<string>("");
  const [biography, setBiography] = useState<string>("");

  const changePrePage = () => {
    router.push("/login/notification");
  };

  const handleSetUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSetBiography = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBiography(event.target.value);
  };

  return (
    <div className="container flex flex-col items-center justify-center mt-10">
      <Navigation
        changePrePage={changePrePage}
        progressValue={85.8}
        pageNum={6}
      />
      <div className="mt-10 w-full flex flex-col items-start justify-center">
        <p className="font-semibold text-lg">Create your account</p>
        <p className="text-gray mt-4">User name</p>
        <Input
          type="text"
          placeholder="User name"
          className="mt-2"
          onChange={handleSetUserName}
        />
        <div className="mt-6">
          <p className="text-gray">Profile picture</p>
          <div className="flex items-center justify-center mt-2">
            <FontAwesomeIcon
              icon={faCircleUser}
              className="rounded-full text-gray20 w-5 h-5 p-3 bg-squareGray mr-3"
            />
            <InputFile />
          </div>
        </div>
        <div className="mt-6">
          <p>Key NFT picture</p>
          <div className="flex items-center justify-center mt-2">
            <FontAwesomeIcon
              icon={faCircleUser}
              className="rounded-full text-gray20 w-5 h-5 p-3 bg-squareGray mr-3"
            />
            <InputFile />
          </div>
        </div>
        <div className="mt-6 w-full">
          <p>Bio</p>
          <Textarea placeholder="Bio." onChange={handleSetBiography} className="w-full" />
        </div>
      </div>

      <div className="flex flex-col fixed bottom-0 mb-10 w-full px-10 pt-10">
        <OrangeButton text={"Proceed"} />
      </div>
    </div>
  );
}
