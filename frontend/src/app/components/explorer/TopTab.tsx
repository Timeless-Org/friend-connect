import Ranking from "@/components/explorer/Ranking";
import { ITop } from "@utils/types";
import { useEffect, useState } from "react";

const TopTab = () => {
  const [userInfo, setUserInfo] = useState<ITop[]>([]);

  useEffect(() => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        userName: "Cardene",
        holders: 5,
        keyPrice: 0.01,
      });
    }
    setUserInfo(data);
  }, []);
  return (
    <div className=" flex flex-col justify-center items-center mx-3">
      {userInfo.map((user, index) => (
        <Ranking
          key={index}
          ranking={index + 1}
          userName={user.userName}
          description={
            <p className="text-gray60 text-sm">
              {user.holders} holders・Price: {user.keyPrice} ETH
            </p>
          }
        />
      ))}
    </div>
  );
};

export default TopTab;
