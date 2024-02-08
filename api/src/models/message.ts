import { prisma } from "../app";

// Message

export const createMessageModel = async (chatId: number, userId: number, text: string) => {
  const message = await prisma.message.create({
    data: {
      chat_id: chatId,
      user_id: userId,
      text,
      created_at: new Date(),
    },
  });
  return message;
};
