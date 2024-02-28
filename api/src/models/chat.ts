import { prisma } from "../app";
import { IAllChat, IChat } from "../utils/interfaces";

// Chat

export const createChatModel = async (address: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: {
      address: address,
    },
  });
  if (!user) return false;
  const chat = await prisma.chat.create({
    data: {
      user_id: user.id,
      created_at: new Date(),
    },
  });
  if (chat) return true;
  return false;
};

export const getChatModel = async (address: string): Promise<IAllChat | null> => {
  const user = await prisma.user.findUnique({
    where: {
      address: address,
    },
  });

  const chat = await prisma.chat.findUnique({
    where: {
      user_id: user?.id,
    },
    include: {
      User: {
        select: {
          name: true,
          address: true,
          icon: true,
          key_price: true,
        },
      },
      Messages: {
        select: {
          User: true,
          text: true,
          created_at: true,
        },
      },
    },
  });

  if (!chat) {
    return null;
  }
  return chat;
};

export const getUserAllChatModel = async (address: string): Promise<IAllChat[]> => {
  const user = await prisma.user.findUnique({
    where: {
      address: address,
    },
  });
  const holdObjectsUsers = await prisma.holder.findMany({
    where: {
      holder_id: user.id,
    },
    select: {
      object_id: true,
    },
  });
  console.log(`holdObjectsUsers: ${JSON.stringify(holdObjectsUsers)}`);
  const holdObjectIds = holdObjectsUsers.map((user) => user.object_id);
  console.log(`holdObjectIds: ${holdObjectIds}`);
  const chat = await prisma.chat.findMany({
    where: {
      User: {
        id: {
          in: holdObjectIds,
        },
      },
    },
    include: {
      User: {
        select: {
          name: true,
          address: true,
          icon: true,
          key_price: true,
        },
      },
      Messages: {
        orderBy: {
          created_at: "desc",
        },
        take: 1,
      },
    },
  });
  console.log(`chat: ${JSON.stringify(chat)}`);
  return chat;
};

export const getLastestChatModel = async (): Promise<IChat[]> => {
  const latestMessages = await prisma.message.findMany({
    take: 50,
    orderBy: {
      created_at: "desc",
    },
    include: {
      User: true,
    },
  });

  // chat_id のリストを作成
  const chatIds = latestMessages.map((message) => message.chat_id);

  // それらの chat_id に対応する Chat レコードを取得
  const chats = await prisma.chat.findMany({
    where: {
      id: {
        in: chatIds,
      },
    },
    include: {
      User: true,
    },
  });
  return chats;
};
