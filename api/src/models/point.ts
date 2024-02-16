import { IPoint } from "lib/type";
import { prisma } from "../app";

// Point

export const createPoint = async (address: string, actionAddress: string, point: number): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: {
      address,
    },
  });
  const actionUser = await prisma.user.findUnique({
    where: {
      address: actionAddress,
    },
  });
  if (!user || !actionUser) throw new Error("User not found");
  await prisma.point.create({
    data: {
      user_id: user.id,
      point: point,
      action_user_id: actionUser.id,
      created_at: new Date(),
    },
  });
};

// Get
export const getSpecificPointModel = async (actionUserAddress: string, point: number): Promise<IPoint[]> => {
  const actionUser = await prisma.user.findUnique({
    where: {
      address: actionUserAddress,
    },
    select: {
      id: true,
    },
  });
  if (!actionUser) throw new Error("User not found");
  const points = await prisma.point.findMany({
    where: {
      action_user_id: actionUser.id,
      point: point,
    },
  });
  return points;
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
