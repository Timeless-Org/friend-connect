import { prisma } from "../app";
import { readJson } from "./common";

export const post = async () => {
  const codes = await readJson("code");

  const data = codes.map((code: { created_at: string | number | Date }) => ({
    ...code,
    created_at: new Date(code.created_at).toISOString(),
  }));
  await prisma.code.createMany({
    data,
  });
};
