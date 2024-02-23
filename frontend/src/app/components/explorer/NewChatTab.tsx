import Ranking from "@components/explorer/Ranking";
import { IChatUser } from "@utils/types";
import { useEffect, useState } from "react";
import { getLatestChat } from "@utils/api";
import { getTimeAgo } from "@/utils/common";

const NewChatTab = () => {
  const [userInfo, setUserInfo] = useState<IChatUser[]>([]);

  useEffect(() => {
    const getTopUsersData = async () => {
      const user = await getLatestChat();
      console.log(`user: ${JSON.stringify(user)}`);
      setUserInfo(user.user);
    };
    getTopUsersData();
  }, []);

  console.log(`userInfo: ${userInfo}`);

  return (
    <div className=" flex flex-col justify-center items-center mx-3">
      {userInfo &&
        userInfo.map((user, index) => (
          <Ranking
            key={index}
            ranking={index + 1}
            name={user.User.name || ""}
            icon={user.User.icon || ""}
            description={
              <p className="text-gray60 text-sm">
                {getTimeAgo(user.User.created_at)} holders・Price: {user.User.key_price}{" "}
                ETH
              </p>
            }
          />
        ))}
    </div>
  );
};

export default NewChatTab;
