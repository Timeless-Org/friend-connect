import { prisma } from "../app";
import { IPoint } from "../utils/interfaces";

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

export const createPointFromId = async (pointGrantUserId: number, actionUserId: number, point: number): Promise<void> => {
  await prisma.point.create({
    data: {
      user_id: pointGrantUserId,
      point: point,
      action_user_id: actionUserId,
      created_at: new Date(),
    },
  });
};

// Get
export const getSpecificPointModel = async (inviteUserId: number, actionUserId: number, point: number): Promise<IPoint[]> => {
  const points = await prisma.point.findMany({
    where: {
      user_id: inviteUserId,
      action_user_id: actionUserId,
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
