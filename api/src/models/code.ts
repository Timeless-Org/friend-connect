import { prisma } from "../app";

// Codes

export const getCodeModel = async (id: number) => {
  const response = await prisma.code.findUnique({
    where: {
      id,
    },
  });
  return response;
};

export const getCodesModel = async (userId: number) => {
  const response = await prisma.code.findMany({
    where: {
      user_id: userId,
    },
  });
  return response;
};

export const createCodeModel = async (userId: number, usedUserId: number, point: number) => {
  const response = await prisma.code.create({
    data: {
      user_id: userId,
      use_user_id: usedUserId,
      point,
    },
  });
  return response;
};

export const verificateCodeModel = async (code: string) => {
  const response = await prisma.user.findUnique({
    where: {
      code,
    },
  });
  return response;
};
