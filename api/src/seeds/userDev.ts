import { prisma } from "../app";
import { readJson } from "./common";

export const post = async () => {
  const users = await readJson("userDev");

  const data = users.map((user: { last_login: string | number | Date; created_at: string | number | Date }) => ({
    ...user,
    last_login: new Date(user.last_login).toISOString(),
    created_at: new Date(user.created_at).toISOString(),
  }));
  await prisma.user.createMany({
    data,
  });
};
