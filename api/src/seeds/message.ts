import { prisma } from "../app";
import { readJson } from "./common";

export const post = async () => {
  const messages = await readJson("message");

  const data = messages.map((message: { created_at: string | number | Date }) => ({
    ...message,
    created_at: new Date(message.created_at).toISOString(),
  }));
  await prisma.message.createMany({
    data,
  });
};
