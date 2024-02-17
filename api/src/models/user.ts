import { prisma } from "../app";
import { IInitialUser, IUser, IWatchList } from "../utils/interfaces";
import { getUnusedCodeModel } from "./code";

// Post

export const createUserModel = async (user: IInitialUser): Promise<IUser> => {
  const code = await getUnusedCodeModel();

  if (!code) {
    throw new Error("Code not found");
  }

  const newUser = await prisma.user.create({
    data: {
      name: "",
      biography: "",
      icon: "",
      key_img: "",
      address: user.address.toLowerCase(),
      key_price: 0,
      ranking: 0,
      is_online: true,
      notification: false,
      last_login: new Date(),
      code_id: code.id,
    },
  });
  return newUser;
};

// Get

export const getUserModel = async (address: string): Promise<IUser | null> => {
  const user = await prisma.user.findUnique({
    where: {
      address: address.toLowerCase(),
    },
  });
  return user;
};

export const getUserFromCodeModel = async (_code: string): Promise<IUser | null> => {
  const code = await prisma.code.findUnique({
    where: {
      code: _code,
    },
  });
  if (!code) {
    return null;
  }
  console.log(`code: ${JSON.stringify(code)}`);
  const user = await prisma.user.findUnique({
    where: {
      code_id: code.id,
    },
  });

  return user;
};

// Update

export const updateUserModel = async (
  address: string,
  name: string,
  biography: string,
  key_img: string,
): Promise<IUser> => {
  const updatedUser = await prisma.user.update({
    where: {
      address,
    },
    data: {
      name,
      biography,
      key_img,
    },
  });
  return updatedUser;
};

export const updateUserNameModel = async (address: string, name: string): Promise<IUser> => {
  const updatedUser = await prisma.user.update({
    where: {
      address,
    },
    data: {
      name,
    },
  });
  return updatedUser;
};

export const updateInitialUserModel = async (
  address: string,
  name: string,
  biography: string,
  icon: string,
  key_img: string,
): Promise<IUser> => {
  const updatedUser = await prisma.user.update({
    where: {
      address,
    },
    data: {
      name,
      biography,
      icon,
      key_img,
    },
  });
  return updatedUser;
};

export const updateUserTwitterAuthModel = async (
  address: string,
  accessToken: string,
  refreshToken: string,
  expiresIn: number,
): Promise<IUser> => {
  const updatedUser = await prisma.user.update({
    where: {
      address,
    },
    data: {
      twitter_access_token: accessToken,
      twitter_refresh_token: refreshToken,
      twitter_access_token_expires_at: expiresIn,
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
