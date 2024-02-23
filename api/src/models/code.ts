import { prisma } from "../app";

// Codes

export const getCodeModel = async (code: string) => {
  const response = await prisma.code.findUnique({
    where: {
      code,
    },
  });
  return response;
};

export const getCodeFromAddressModel = async (address: string) => {
  const user = await prisma.user.findUnique({
    where: {
      address,
    },
  });
  if (!user) throw new Error("User not found");
  const response = await prisma.code.findUnique({
    where: {
      user_id: user.id,
    },
  });
  return response;
};

export const getUnusedCodeModel = async () => {
  const response = await prisma.code.findFirst({
    where: {
      user_id: null,
    },
  });
  return response;
};

export const verificateCodeModel = async (code: string) => {
  const validCodeCount = await prisma.code.count({
    where: {
      code,
    },
  });
  return validCodeCount > 0;
};

// update

export const updateCodeModel = async (code: string, address: string) => {
  const user = await prisma.user.findUnique({
    where: {
      address,
    },
  });
  if (!user) throw new Error("User not found");
  const response = await prisma.code.update({
    where: {
      code,
    },
    data: {
      user_id: user.id,
    },
  });
  return response;
};
