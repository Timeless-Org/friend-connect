"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { IAirDrop } from "@/utils/types";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Copy from "@/components/common/Copy";

export default function AirDrop() {
  const [pointInfo, setPointInfo] = useState<IAirDrop>({});
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    setPointInfo({
      points: 10,
      lastWeekPoints: 5,
      weeklyLeaderBoard: 5,
      roles: ["top10", "special", "new", "active", "inviter"],
      inviteCode: "123456",
    });
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col items-start justify-center w-full mt-24 mb-16 px-8">
        <div className="w-full flex justify-center items-center mt-4">
          <p className="text-gray60 text-center">
            Points are airdropped every Friday and
            <br /> will have future uses in Long Star.
          </p>
        </div>
        <div className="w-full mt-10 inline-flex flex-col space-y-4 border-b-2 border-grayThin pb-6">
          <p className="text-gray60">Your Points</p>
          <p>
            <span className="font-semibold">{pointInfo.points}</span> （Last
            week: {pointInfo.lastWeekPoints}）
          </p>
        </div>
        <div className="w-full mt-6 inline-flex flex-col space-y-4 border-b-2 border-grayThin pb-6">
          <p className="text-gray60">Weekly leader board</p>
          <p>{pointInfo.weeklyLeaderBoard}</p>
        </div>
        <div className="w-full mt-6 inline-flex flex-col space-y-4 border-b-2 border-grayThin pb-6">
          <p className="text-gray60">Your rank</p>
          <div className="flex items-start justify-start flex-wrap flex-row">
            {pointInfo.roles?.map((role, index) => (
              <p
                key={index}
                className="self-start text-center px-4 py-1 bg-greenThin rounded-lg basis-1/5 mr-2 mt-2"
              >
                {role}
              </p>
            ))}
          </div>
        </div>
        <div className="w-full mt-6 inline-flex flex-col space-y-4 border-b-2 border-grayThin pb-6">
          <p className="text-gray60">Invite a friend</p>
          <div className="inline-flex justify-start items-center space-x-3">
            <p>{pointInfo.inviteCode}</p>
            <Copy
              copyText={pointInfo.inviteCode || ""}
              content={
                <FontAwesomeIcon
                  icon={isCopied ? faCheck : faCopy}
                  className="h-4 bg-squareGray p-2 rounded-full text-gray60"
                />
              }
              setIsCopied={setIsCopied}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
