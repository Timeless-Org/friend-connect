import { prisma } from "../app";
import { readJson } from "./common";

export const post = async () => {
  const chats = await readJson("chat");

  const data = chats.map((chat: { created_at: string | number | Date }) => ({
    ...chat,
    created_at: new Date(chat.created_at).toISOString(),
  }));
  await prisma.chat.createMany({
    data,
  });
};
