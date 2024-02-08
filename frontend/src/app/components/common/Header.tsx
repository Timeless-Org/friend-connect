
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import SideMenu from "@components/common/SideMenu";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  // useEffect(() => {
  //   const closeMenu = (e: any) => {
  //     if (!e.target.closest(".menu")) {
  //       setMenuOpen(false);
  //     }
  //   };

  //   if (isMenuOpen) {
  //     window.addEventListener("click", closeMenu);
  //   }

  //   return () => window.removeEventListener("click", closeMenu);
  // }, [isMenuOpen]);

  return (
    <>
      <SideMenu isOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
      <header className="fixed top-0 inset-x-0 h-24 bg-black flex justify-between items-center px-6">
        <div className="flex justify-center items-center space-x-3">
          <Image
            src="/static/img/icon/long_star.png"
            alt="long_star"
            className="rounded-full"
            width={42}
            height={42}
          />
          <p className="font-semibold text-xl text-white">Long Star</p>
        </div>
        <div className="flex justify-center items-center space-x-5">
          <FontAwesomeIcon icon={faBell} className="text-white h-6" />
          <button type="button" onClick={() => setMenuOpen(!isMenuOpen)}>
            <FontAwesomeIcon
              icon={faUser}
              className="text-white h-4 rounded-full bg-grayThin p-3"
            />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
