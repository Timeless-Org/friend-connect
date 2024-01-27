import { prisma } from "../app";

// Point

export const createPoint = async (userId: number, point: number): Promise<void> => {
  await prisma.point.create({
    data: {
      user_id: userId,
      point: point,
      created_at: new Date(),
    },
  });
};

export const getLastWeekPointModel = async (address: string): Promise<number> => {
  const user = await prisma.user.findUnique({
    where: {
      address: address,
    },
  });
  if (!user) throw new Error("User not found");
  const lastWeekPoint = await prisma.point.aggregate({
    _sum: {
      point: true,
    },
    where: {
      user_id: user.id,
      created_at: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
  });
  return lastWeekPoint._sum.point || 0;
};
