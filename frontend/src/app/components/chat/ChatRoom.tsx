import { Input } from "@/components/ui/input";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faBookmark as registerBookmark } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleLeft,
  faBell,
  faBookmark,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IChatRoom {
  currentUser: string;
  userIcon: string;
  userName: string;
  holders: number;
  holdKeys: number;
  watchLists: number;
  keyPrice: number;
  ownKeys: number;
  messages: {
    userName: string;
    text: string;
  }[];
  isOnline: boolean;
  isRegisterWatchlist: boolean;
}

const ChatRoom = ({
  currentUser,
  userIcon,
  userName,
  holders,
  holdKeys,
  watchLists,
  keyPrice,
  ownKeys,
  messages,
  isOnline,
  isRegisterWatchlist,
}: IChatRoom) => {
  const [message, setMessage] = useState("");

  const router = useRouter();
  const changePrePage = () => {
    router.push("/chat");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="inline-flex flex-col items-start justify-between fixed top-0 inset-x-0 ">
        <div className="flex space-x-3">
          <button
            type="button"
            className="inline-flex items-center"
            onClick={changePrePage}
          >
            <FontAwesomeIcon icon={faAngleLeft} className="h-5" />
          </button>
          <div className="inline-flex justify-center items-center">
            <Image
              src="/static/img/user/user1.png"
              alt="user"
              className="rounded-full left-12"
              width={40}
              height={40}
            />
            <div className="inline-flex flex-col">
              <p className="font-semibold">{userName}</p>
              <p className="text-gray20">
                <span
                  className={`${
                    isOnline ? "bg-green" : "bg-red"
                  } p-2 rounded-full`}
                ></span>
                {isOnline ? "Online now" : "Offline"}
              </p>
            </div>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faTwitter}
              className="h-4 bg-squareGray p-2"
            />
            <FontAwesomeIcon
              icon={faShareNodes}
              className="h-4 bg-squareGray p-2"
            />
            <FontAwesomeIcon
              icon={isRegisterWatchlist ? registerBookmark : faBookmark}
              className="h-4 bg-squareGray p-2"
            />
            <FontAwesomeIcon icon={faBell} className="h-4 bg-squareGray p-2" />
          </div>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">{holders} holders</p>
          <p className="font-semibold">{holdKeys} holdings</p>
          <p className="font-semibold">{watchLists} watchlists</p>
        </div>
        <div className="inline-flex flex-col bg-squareGray py-2 px-1">
          <div className="inline-flex items-center justify-between">
            <p className="text-gray20 font-semibold">Key price:</p>
            <p className="font-semibold text-gray20">
              <span className="text-black">{keyPrice}</span> ETH
            </p>
          </div>
          <div className="inline-flex items-center justify-between">
            <p className="text-gray20 font-semibold">You own:</p>
            <p className="font-semibold text-gray20">
              <span className="text-black">{ownKeys}</span> key
            </p>
          </div>
        </div>
        <div className="flex justify-between w-full px-3">
          <p className=" bg-redThin text-red text-center rounded-xl py-1 w-1/2">
            SELL
          </p>
          <p className=" bg-greenThin text-green text-center rounded-xl py-1 w-1/2">
            BUY
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-md mx-4 my-2 p-4 rounded-lg bg-gray20 ${
              currentUser === message.userName
                ? "self-end text-right"
                : "self-start text-left"
            }`}
          >
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center w-full max-w-sm items-center space-x-2 border">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 mr-3 text-gray-700 bg-white rounded-lg"
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M3 20v-6l8-2l-8-2V4l19 8z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
