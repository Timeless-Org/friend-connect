// import Trade from "@components/keys/Trade";
// import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
// import { IUserList } from "@utils/types";
// import { useEffect, useState } from "react";
// import Image from "next/image";

// const HoldersTab = () => {
//   const [userInfo, setUserInfo] = useState<IUserList[]>([]);

//   useEffect(() => {
//     const data = [];
//     for (let i = 0; i < 10; i++) {
//       data.push({
//         tradeUser: faUser,
//         objectUser: faBell,
//         tradeUserName: "Cardene",
//         objectUserName: "Metamon",
//         timestamp: "5",
//         amount: 1,
//         value: 0.002,
//         kingMark: true,
//         isBuy: i % 2 === 0 ? true : false,
//       });
//     }
//     setUserInfo(data);
//   }, []);
//   return (
//     <div className="flex flex-col justify-center space-y-4 w-full items-start">
//       {[1, 2, 3, 4, 5].map((user, index) => (
//         <div className="flex items-center justify-start space-x-4" key={index}>
//           <Image
//             src={`/static/img/user/user1.png`}
//             alt="user"
//             className="rounded-full"
//             width={48}
//             height={48}
//           />
//           <p className="font-semibold">Cardene</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default HoldersTab;
