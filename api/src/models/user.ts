import { ICreateUser, IUser, IWatchList } from "../lib/type";
import { prisma } from "../app";

function generateRandomString(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

// Post

export const createUserModel = async (user: ICreateUser): Promise<IUser> => {
  let unique = false;
  let generatedCode = "";

  while (!unique) {
    generatedCode = generateRandomString(10);
    const existingData = await prisma.user.findUnique({
      where: {
        code: generatedCode,
      },
    });

    if (!existingData) {
      unique = true;
    }
  }

  const newUser = await prisma.user.create({
    data: {
      name: user.name,
      biography: user.biography,
      icon: user.icon,
      key_img: user.keyImage,
      address: user.address,
      key_price: 0,
      ranking: 0,
      is_online: true,
      notification: false,
      last_login: new Date(),
      code: generatedCode,
    },
  });
  return newUser;
};

// Get

export const getUserModel = async (address: string): Promise<IUser | null> => {
  const user = await prisma.user.findUnique({
    where: {
      address,
    },
  });
  return user;
};

export const getUserFromCodeModel = async (code: string): Promise<IUser | null> => {
  const user = await prisma.user.findUnique({
    where: {
      code,
    },
  });
  return user;
};

// Update

export const updateUserModel = async (
  address: string,
  biography: string,
  icon: string,
  key_img: string,
): Promise<IUser> => {
  const updatedUser = await prisma.user.update({
    where: {
      address,
    },
    data: {
      biography,
      icon,
      key_img,
    },
  });
  return updatedUser;
};

// WatchList

export const upsertWatchListModel = async (
  address: string,
  watchUserId: number,
  register: boolean,
): Promise<IWatchList> => {
  const user = await prisma.user.findUnique({
    where: {
      address,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const watchList = await prisma.watchlist.upsert({
    where: {
      user_id_watch_user_id: {
        user_id: user.id,
        watch_user_id: watchUserId,
      },
    },
    update: {
      register,
    },
    create: {
      user_id: user.id,
      watch_user_id: watchUserId,
    },
  });
  return watchList;
};

export const getWatchListModel = async (address: string): Promise<IUser[]> => {
  const watchlists = await prisma.watchlist.findMany({
    where: {
      User: {
        address,
      },
    },
  });
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: watchlists.map((watchlist) => watchlist.watch_user_id),
      },
    },
  });

  return users;
};

// Notification

export const updateNotificationModel = async (address: string): Promise<IUser> => {
  const user = await prisma.user.findUnique({
    where: {
      address,
    },
  });
  const updatedUser = await prisma.user.update({
    where: {
      address,
    },
    data: {
      notification: !user?.notification,
    },
  });
  return updatedUser;
};

// Hold Key

export const getHoldKeyModel = async (address: string): Promise<IUser[]> => {
  const holders = await prisma.holder.findMany({
    where: {
      User: {
        address,
      },
    },
  });
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: holders.map((holder) => holder.id),
      },
    },
  });
  return users;
};

export const getHoldKeyAmountModel = async (address: string): Promise<number> => {
  const amount = await prisma.holder.count({
    where: {
      User: {
        address,
      },
    },
  });
  return amount;
};

// Key NFT Holder
export const getKeyNFTHolderModel = async (address: string): Promise<IUser[]> => {
  const holders = await prisma.holder.findMany({
    where: {
      User: {
        address,
      },
    },
  });
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: holders.map((holder) => holder.id),
      },
    },
  });
  return users;
};

export const getKeyNFTHolderAmountModel = async (address: string): Promise<number> => {
  const amount = await prisma.holder.count({
    where: {
      User: {
        address,
      },
    },
  });
  return amount;
};

// Search

export const searchUserModel = async (word: string): Promise<IUser[]> => {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: word,
          },
        },
        // {
        //     biography: {
        //         contains: word,
        //     },
        // },
      ],
    },
  });
  return users;
};

// Top 50 Key NFT Price User

export const getTop50KeyNFTPriceUserModel = async (): Promise<IUser[]> => {
  const users = await prisma.user.findMany({
    orderBy: {
      key_price: "desc",
    },
    take: 50,
  });
  return users;
};
