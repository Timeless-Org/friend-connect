import { IChat, IChatWithMessage, IAllChat } from "lib/type";
import { prisma } from "../app";

// Chat

export const getChatModel = async (address: string): Promise<IChatWithMessage | null> => {
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
      Messages: true,
      User: true,
    },
  });
  return chat;
};

export const getUserAllChatModel = async (address: string): Promise<IAllChat[]> => {
  const chat = await prisma.chat.findMany({
    where: {
      User: {
        address: address,
      },
    },
    include: {
      User: {
        select: {
          name: true,
          icon: true,
          key_price: true,
        },
      },
    },
  });
  return chat;
};

export const getLastestChatModel = async (): Promise<IChat[]> => {
  const latestMessages = await prisma.message.findMany({
    take: 50,
    orderBy: {
      created_at: "desc",
    },
    select: {
      chat_id: true,
    },
    distinct: ["chat_id"],
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
