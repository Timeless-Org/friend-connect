import Image from "next/image";

const getRandomInt = () => {
  return (Math.floor(Math.random() * 3) + 1).toString();
};

interface IRanking {
  ranking: number;
  userName: string;
  description: React.ReactNode;
}

const Ranking = ({ ranking, userName, description }: IRanking) => {
  return (
    <div
      className="flex justify-start space-x-6 w-full items-center my-3"
    >
      <div className="flex items-center space-x-3">
        <p className="font-semibold">{ranking}</p>
        <Image
          src={`/static/img/user/user${getRandomInt()}.png`}
          alt="user"
          className="rounded-full"
          width={48}
          height={48}
        />
      </div>
      <div className="flex flex-col items-start justify-center space-y-1">
        <p className="font-semibold">{userName}</p>
        {description}
      </div>
    </div>
  );
};

export default Ranking;
