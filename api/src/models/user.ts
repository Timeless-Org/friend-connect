import { prisma } from "../app";
import { IInitialUser, IUser, IWatchList } from "../utils/interfaces";
import { getUnusedCodeModel } from "./code";

// Post

export const createUserModel = async (user: IInitialUser): Promise<IUser> => {
  const code = await getUnusedCodeModel();

  console.log(`unused code: ${JSON.stringify(code)}`);

  if (!code) {
    throw new Error("Code not found");
  }

  const allUserCount = await prisma.user.count();

  const newUser = await prisma.user.create({
    data: {
      address: user.address.toLowerCase(),
      ranking: allUserCount,
      is_online: true,
      code_id: code.id,
    },
  });

  console.log(`✅ createUserModel newUser: ${JSON.stringify(newUser)}`);

  const updateCode = await prisma.code.update({
    where: {
      id: code.id,
    },
    data: {
      user_id: newUser.id,
    },
  });
  console.log(`✅ createUserModel updateCode: ${JSON.stringify(updateCode)}`);
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

export const updateUserTwitterModel = async (
  address: string,
  name: string,
  icon: string,
  twitterId: string,
): Promise<IUser> => {
  const updatedUser = await prisma.user.update({
    where: {
      address,
    },
    data: {
      name,
      icon,
      twitter_id: twitterId,
    },
  });
  return updatedUser;
};

export const updateUserBioModel = async (address: string, biography: string): Promise<IUser> => {
  const updatedUser = await prisma.user.update({
    where: {
      address,
    },
    data: {
      biography,
    },
  });
  return updatedUser;
};

export const updateUserNotificationModel = async (address: string, notification: boolean): Promise<IUser> => {
  const updatedUser = await prisma.user.update({
    where: {
      address,
    },
    data: {
      notification,
    },
  });
  return updatedUser;
};

export const updateUserRegisterModel = async (address: string): Promise<IUser> => {
  const updatedUser = await prisma.user.update({
    where: {
      address,
    },
    data: {
      register: true,
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

// export const updateUserTwitterAuthModel = async (
//   address: string,
//   accessToken: string,
//   refreshToken: string,
//   expiresIn: number,
// ): Promise<IUser> => {
//   const updatedUser = await prisma.user.update({
//     where: {
//       address,
//     },
//     data: {
//       twitter_access_token: accessToken,
//       twitter_refresh_token: refreshToken,
//       twitter_access_token_expires_at: expiresIn,
//     },
//   });
//   return updatedUser;
// };

// WatchList

export const upsertWatchListModel = async (address: string, watchAddress: string): Promise<IWatchList> => {
  const user = await prisma.user.findUnique({
    where: {
      address,
    },
  });
  const watchUser = await prisma.user.findUnique({
    where: {
      address: watchAddress,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const currentWatchData = await prisma.watchlist.findUnique({
    where: {
      user_id_watch_user_id: {
        user_id: user.id,
        watch_user_id: watchUser.id,
      },
    },
  });
  const watchList = await prisma.watchlist.upsert({
    where: {
      user_id_watch_user_id: {
        user_id: user.id,
        watch_user_id: watchUser.id,
      },
    },
    update: {
      register: currentWatchData ? !currentWatchData.register : true,
    },
    create: {
      user_id: user.id,
      watch_user_id: watchUser.id,
    },
  });
  return watchList;
};

export const getWatchListModel = async (address: string): Promise<IInitialUser[]> => {
  const user = await prisma.user.findUnique({
    where: {
      address,
    },
  });
  const watchlists = await prisma.watchlist.findMany({
    where: {
      user_id: user.id,
      register: true,
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
      HolderUser: {
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
      HolderUser: {
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
      HoldObjects: {
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
      HoldObjects: {
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
      name: {
        contains: word,
        mode: "insensitive",
      },
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
    include: {
      _count: {
        select: { HoldingUsers: true },
      },
    },
  });
  return users;
};

// holder
export const getHolderModel = async (address: string): Promise<IUser[]> => {
  const holders = await prisma.holder.findMany({
    where: {
      HolderUser: {
        address,
      },
    },
  });
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: holders.map((holder) => holder.holder_id),
      },
    },
  });
  return users;
};

// holder
export const getHoldModel = async (address: string): Promise<IUser[]> => {
  const holders = await prisma.holder.findMany({
    where: {
      HoldObjects: {
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
