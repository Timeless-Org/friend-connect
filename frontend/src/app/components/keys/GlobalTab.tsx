import Trade from "@components/keys/Trade";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { IUserList } from "@utils/types";
import { useEffect, useState } from "react";
import { getAllUserTrade } from "@/utils/api";
import { getTimeAgo } from "@/utils/common";

const GlobalTab = () => {
  const [userInfo, setUserInfo] = useState<IUserList[]>([]);

  useEffect(() => {
    const getUserTradeData = async () => {
      const data = await getAllUserTrade();
      setUserInfo(data);
    };
    getUserTradeData();
  }, []);

  return (
    <div className=" flex flex-col justify-center items-center mx-3">
      {userInfo.map((user, index) => (
        <Trade
          key={index}
          tradeUser={user.Buyer.icon}
          objectUser={user.Seller.icon}
          tradeUserName={user.Buyer.name}
          objectUserName={user.Seller.name}
          timestamp={getTimeAgo(user.created_at)}
          amount={user.amount}
          value={user.key_price}
          kingMark={false}
          isBuy={user.is_buy}
        />
      ))}
    </div>
  );
};

export default GlobalTab;
