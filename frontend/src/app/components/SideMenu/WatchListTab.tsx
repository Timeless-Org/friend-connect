import Trade from "@components/keys/Trade";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { IUserList } from "@utils/types";
import { useEffect, useState } from "react";
import Image from "next/image";

const WatchListTab = () => {
  const [userInfo, setUserInfo] = useState<IUserList[]>([]);

  useEffect(() => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        tradeUser: faUser,
        objectUser: faBell,
        tradeUserName: "Cardene",
        objectUserName: "Metamon",
        timestamp: "5",
        amount: 1,
        value: 0.002,
        kingMark: true,
        isBuy: i % 2 === 0 ? true : false,
      });
    }
    setUserInfo(data);
  }, []);
  return (
    <div className="flex flex-col justify-center space-y-4 w-full items-start">
      {[1, 2, 3, 4, 5].map((user, index) => (
        <div
          className="flex w-full items-center justify-between space-x-4"
          key={index}
        >
          <div className="inline-flex items-center space-x-2">
            <Image
              src={`/static/img/user/user1.png`}
              alt="user"
              className="rounded-full"
              width={48}
              height={48}
            />
            <div className="inline-flex flex-col items-start justify-center">
              <p className="font-semibold">Cardene</p>
              <p className="text-gray60">#12</p>
            </div>
          </div>
          <div className="bg-squareGray px-2 py-1 rounded-lg">
            <p className="text-gray60 text-sm">
              <span className="font-semibold">0.002 ETH</span> ($4.49)
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WatchListTab;
