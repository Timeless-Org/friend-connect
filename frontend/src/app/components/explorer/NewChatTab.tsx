import Ranking from "@/components/explorer/Ranking";
import { INewChat } from "@utils/types";
import { useEffect, useState } from "react";

const NewChatTab = () => {
  const [userInfo, setUserInfo] = useState<INewChat[]>([]);

  useEffect(() => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        userName: "Cardene",
        lastLogin: "12",
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
              {user.lastLogin}m ago・Price: {user.keyPrice} ETH
            </p>
          }
        />
      ))}
    </div>
  );
};

export default NewChatTab;
