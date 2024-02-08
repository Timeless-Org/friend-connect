import Trade from "@components/keys/Trade";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { IUserList } from "@utils/types";
import { useEffect, useState } from "react";

const FriendsTab = () => {
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
    <div className=" flex flex-col justify-center items-center mx-3">
      {userInfo.map((user, index) => (
        <Trade
          key={index}
          tradeUser={user.tradeUser}
          objectUser={user.objectUser}
          tradeUserName={user.tradeUserName}
          objectUserName={user.objectUserName}
          timestamp={user.timestamp}
          amount={user.amount}
          value={user.value}
          kingMark={user.kingMark}
          isBuy={user.isBuy}
        />
      ))}
    </div>
  );
};

export default FriendsTab;
