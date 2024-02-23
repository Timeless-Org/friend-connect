import { getUser } from "@utils/api";
import SideMenu from "@components/common/SideMenu";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IUser } from "@/utils/types";

const Header = () => {
  const { user } = usePrivy();

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState<IUser>();

  useEffect(() => {
    const getUserData = async (address: string) => {
      const user = await getUser(address);
      setUserData(user);
    };
    if (user?.wallet?.address && !userData) {
      getUserData(user?.wallet?.address);
    }
  }, [user, userData]);

  return (
    <>
      <SideMenu
        isOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
        userName={userData?.name || ""}
        address={user?.wallet?.address || ""}
      />
      <header className="fixed top-0 inset-x-0 h-24 bg-black flex justify-between items-center px-6">
        <div className="flex justify-center items-center space-x-3">
          <Image
            src="/static/img/banner/long_star_yellow.jpg"
            alt="long_star"
            width={170}
            height={80}
          />
        </div>
        <div className="flex justify-center items-center space-x-5">
          <FontAwesomeIcon icon={faBell} className="text-white h-6" />
          <button type="button" onClick={() => setMenuOpen(!isMenuOpen)}>
            {userData && userData?.icon ? (
              <Image
                src={userData.icon}
                alt="user_icon"
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <FontAwesomeIcon
                icon={faUser}
                className="text-white h-4 rounded-full bg-grayThin p-3"
              />
            )}
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
