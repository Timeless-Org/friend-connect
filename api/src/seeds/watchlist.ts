import { prisma } from "../app";
import { readJson } from "./common";

export const post = async () => {
  const datas = await readJson("watchlist");

  const updateData = datas.map((data: { last_login: string | number | Date; created_at: string | number | Date }) => ({
    ...data,
    created_at: new Date(data.created_at).toISOString(),
  }));
  await prisma.watchlist.createMany({
    data: updateData,
  });
};
