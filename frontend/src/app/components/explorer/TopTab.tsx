import Ranking from "@components/explorer/Ranking";
import { ITop } from "@utils/types";
import { useEffect, useState } from "react";
import { getTopUsers } from "@utils/api";

const TopTab = () => {
  const [userInfo, setUserInfo] = useState<ITop[]>([]);

  useEffect(() => {
    const getTopUsersData = async () => {
      const user = await getTopUsers();
      setUserInfo(user);
    }
    getTopUsersData();
  }, []);

  return (
    <div className=" flex flex-col justify-center items-center mx-3">
      {userInfo && userInfo.map((user, index) => (
        <Ranking
          key={index}
          ranking={"-"}
          name={user.name}
          icon={user.icon}
          description={
            <p className="text-gray60 text-sm">
              {user._count.Holders} holders・Price: {user.key_price} ETH
            </p>
          }
        />
      ))}
    </div>
  );
};

export default TopTab;
