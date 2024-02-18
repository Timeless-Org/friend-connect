import { getUserTrade } from "@/utils/api";
import Trade from "@components/keys/Trade";
import { IUserList } from "@utils/types";
import { useEffect, useState } from "react";
import { getTimeAgo } from "@utils/common";

interface IYouTab {
  address: string;
}

const YouTab = ({ address }: IYouTab) => {
  const [userInfo, setUserInfo] = useState<IUserList[]>([]);

  useEffect(() => {
    const getUserTradeData = async () => {
      const data = await getUserTrade(address);
      setUserInfo(data);
    };
    getUserTradeData();
  }, [address]);

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

export default YouTab;
