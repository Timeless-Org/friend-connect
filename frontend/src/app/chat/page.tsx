"use client";

import Footer from "@components/common/Footer";
import Header from "@components/common/Header";
import { IChat } from "@utils/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Keys() {
  const [chats, setChats] = useState<IChat[]>([]);

  const router = useRouter();

  useEffect(() => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        userIcon: "Cardene",
        userName: "Cardene",
        timestamp: "12:00",
        latestMessage: "Hello",
        keyPrice: 0.01,
        value: 0.002,
        unReadMessage: 2,
        kingMark: true,
      });
    }
    setChats(data);
  }, []);
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center w-full mt-28 px-4 mb-16 h-full">
        {/* {chats.map((chat, index) => (
          <button
            type="button"
            className="flex justify-between w-full items-center py-2"
            key={index}
            onClick={() => router.push(`/chat/${chat.userName}`)}
          >
            <div className="flex space-x-3 h-full">
              <div className="flex items-center">
                <Image
                  src="/static/img/user/user1.png"
                  alt="user"
                  className="rounded-full left-12"
                  width={48}
                  height={48}
                />
              </div>
              <div className="flex flex-col items-start justify-center space-y-1">
                <div className="inline-flex space-x-2 justify-center items-center">
                  <p className="font-semibold">{chat.userName}</p>
                  <p className="text-gray80 bg-squareGray rounded-lg p-1 text-sm">
                    <span className="font-semibold">{chat.keyPrice} ETH</span>{" "}
                    ($0.00)
                  </p>
                </div>
                <div className="flex space-x-3">
                  <p>{chat.latestMessage}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-end space-y-1">
              <p className="text-gray80">{chat.timestamp}</p>
              <p className="text-orange bg-black rounded-full w-6 h-6 text-center items-center">
                {chat.unReadMessage}
              </p>
            </div>
          </button>
        ))} */}
        <p className="h-full flex justify-center items-center">Comming soon ...</p>
      </div>
      <Footer />
    </>
  );
}
