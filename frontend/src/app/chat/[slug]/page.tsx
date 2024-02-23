"use client";

import { Input } from "@components/ui/input";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faBookmark as registerBookmark } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleLeft,
  faBell,
  faBookmark,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IMessage, IUser, IUserInfo } from "@utils/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ChatRoom = () => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [userInfo, setUserInfo] = useState<IUserInfo>({});
  const [messageHistory, setMessageHistory] = useState<IMessage[]>([]);

  const router = useRouter();
  const changePrePage = () => {
    router.push("/chat");
  };

  const sendMessage = async () => {
    setMessageHistory((prevMessages) => [
      ...prevMessages,
      {
        userIcon: currentUser?.icon || "",
        userName: currentUser?.name || "",
        timestamp: "12:00",
        message: inputMessage,
      },
    ]);
    setInputMessage("");
  };

  useEffect(() => {
    setUserInfo({
      objectUserIcon: "Cardene",
      objectUserName: "Cardene",
      objectTwitterUrl: "http://twitter.com/cardene777",
      objectHolderCount: 5,
      objectHoldKeyNftCount: 3,
      objectWatchListCount: 2,
      objectKeyPrice: 0.01,
      userOwnKeyCount: 1,
      userIsRegisterWatchlist: true,
      objectIsOnline: true,
    });
    setMessageHistory([
      {
        userIcon: "/static/img/user/user1.png",
        userName: "Cardene",
        timestamp: "12:00",
        message: "Hello",
      },
      {
        userIcon: "/static/img/user/user1.png",
        userName: "Cardene",
        timestamp: "12:00",
        message: "Hello",
      },
      {
        userIcon: "/static/img/user/user1.png",
        userName: "Metamon",
        timestamp: "12:00",
        message: "Hello",
      },
    ]);
    setCurrentUser({
      name: "Cardene",
      biography: "I'm a developer",
      icon: "/static/img/user/user2.png",
      key_img: "/static/img/user/user2.png",
      address: "0x1234567890",
      key_price: 0.01,
      ranking: 1,
      point: 100,
      is_online: true,
      last_login: "2021-10-01",
      created_at: new Date(),
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full my-4">
      <div className="inline-flex flex-col items-stretch justify-between w-full px-4 border-b pb-3 border-gray24">
        <div className="flex space-x-3 justify-between items-center">
          <div className="inline-flex justify-center items-center space-x-3">
            <button
              type="button"
              className="inline-flex items-center"
              onClick={changePrePage}
            >
              <FontAwesomeIcon icon={faAngleLeft} className="h-5" />
            </button>
            <Image
              src="/static/img/user/user1.png"
              alt="user"
              className="rounded-full left-12"
              width={40}
              height={40}
            />
            <div className="inline-flex flex-col">
              <p className="font-semibold">{userInfo.objectUserName}</p>
              <div className="text-gray20 flex items-center space-x-1">
                <p
                  className={`${
                    userInfo.objectIsOnline ? "bg-green" : "bg-red"
                  } w-2 h-2 rounded-full block`}
                />
                <p className="text-sm">
                  {userInfo.objectIsOnline ? "Online now" : "Offline"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center text-gray60 space-x-3">
            <FontAwesomeIcon
              icon={faTwitter}
              className="h-4 bg-squareGray p-2 rounded-full"
            />
            <FontAwesomeIcon
              icon={faShareNodes}
              className="h-4 bg-squareGray p-2 rounded-full"
            />
            <FontAwesomeIcon
              icon={
                userInfo.userIsRegisterWatchlist ? registerBookmark : faBookmark
              }
              className="h-4 bg-squareGray p-2 rounded-full"
            />
            <FontAwesomeIcon
              icon={faBell}
              className="h-4 bg-squareGray p-2 rounded-full"
            />
          </div>
        </div>
        <div className="flex justify-around mt-6 font-semibold text-sm">
          <p>{userInfo.objectHolderCount} holders</p>
          <p>{userInfo.objectHoldKeyNftCount} holdings</p>
          <p>{userInfo.objectWatchListCount} watchlists</p>
        </div>
        <div className="inline-flex flex-col bg-squareGray py-2 mt-6  px-4 rounded-lg text-sm text-gray60 font-semibold space-y-2">
          <div className="inline-flex items-center justify-between">
            <p>Key price:</p>
            <p>
              <span className="text-black">{userInfo.objectKeyPrice}</span> ETH
            </p>
          </div>
          <div className="inline-flex items-center justify-between">
            <p>You own:</p>
            <p>
              <span className="text-black">{userInfo.userOwnKeyCount}</span> key
            </p>
          </div>
        </div>
        <div className="flex justify-between w-full mt-6 space-x-4 items-center font-semibold text-sm">
          <p className=" bg-redThin text-red text-center rounded-full py-2 w-1/2">
            SELL
          </p>
          <p className=" bg-greenThin text-green text-center rounded-full py-2 w-1/2">
            BUY
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full">
        {messageHistory.map((message, index) => (
          <div
            key={index}
            className={`mx-4 mt-2 ${
              currentUser?.name === message.userName
                ? "self-end"
                : "self-start flex items-center justify-between space-x-3"
            }`}
          >
            <Image
              src={message.userIcon}
              alt="user"
              className={`rounded-full w-full ${
                currentUser?.name === message.userName ? "hidden" : "block"
              }`}
              width={44}
              height={44}
            />
            <p className="p-2 rounded-lg bg-grayThin">{message.message}</p>
          </div>
        ))}
      </div>
      <div className="w-full border-t border-gray24 py-4 mx-4 flex justify-center fixed bottom-0 ">
        <div className="flex justify-center w-full max-w-sm items-center space-x-2 border rounded-lg border-gray24 pr-3">
          <Input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-4 py-2 mr-3 text-gray-700 bg-white rounded-lg border-none focus:ring-0 ring-0 active:ring-0 focus:border-0 active:border-0"
          />
          <button type="button" onClick={sendMessage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 24 24"
              className="text-gray80"
            >
              <path fill="currentColor" d="M3 20v-6l8-2l-8-2V4l19 8z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
