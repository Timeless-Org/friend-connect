import { IUser } from "@utils/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getHoldObjects } from "@utils/api";

interface IHoldTab {
  address: string;
}

const HoldTab = ({ address }: IHoldTab) => {
  const [holders, setHolders] = useState<IUser[]>([]);

  useEffect(() => {
    const getUserData = async (_address: string) => {
      const holdersData = await getHoldObjects(_address);
      if (holdersData) {
        setHolders(holdersData);
      }
    };
    if (address) {
      getUserData(address);
    }
  }, [address]);

  return (
    <div className="flex flex-col justify-center space-y-4 w-full items-start">
      {holders.map((user, index) => (
        <div className="flex items-center justify-start space-x-4" key={index}>
          <Image
            src={user.icon || ""}
            alt="user"
            className="rounded-full"
            width={48}
            height={48}
          />
          <p className="font-semibold">{user.name}</p>
        </div>
      ))}
    </div>
  );
};

export default HoldTab;
