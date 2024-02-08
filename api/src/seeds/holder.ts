import { prisma } from "../app";
import { readJson } from "./common";

export const post = async () => {
  const holders = await readJson("holder");

  const data = holders.map((holder: { created_at: string | number | Date }) => ({
    ...holder,
    created_at: new Date(holder.created_at).toISOString(),
  }));
  await prisma.holder.createMany({
    data,
  });
};
