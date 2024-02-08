import { prisma } from "../app";
import { readJson } from "./common";

export const post = async () => {
  const points = await readJson("point");

  const data = points.map((point: { created_at: string | number | Date }) => ({
    ...point,
    created_at: new Date(point.created_at).toISOString(),
  }));
  await prisma.point.createMany({
    data,
  });
};
