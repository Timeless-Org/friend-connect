import { IHolder } from "utils/interfaces";
import { prisma } from "../app";

// create holder

export const createHolderModel = async (buyAddress: string, objectAddress: string): Promise<IHolder> => {
  const holder = await prisma.user.findUnique({
    where: {
      address: buyAddress,
    },
  });
  const object = await prisma.user.findUnique({
    where: {
      address: objectAddress,
    },
  });
  if (!holder || !object) throw new Error("User not found");
  const result = await prisma.holder.create({
    data: {
      holder_id: holder?.id,
      object_id: object?.id,
    },
  });
  return result;
};

export const deleteHolderModel = async (buyAddress: string, objectAddress: string): Promise<IHolder> => {
  const holder = await prisma.user.findUnique({
    where: {
      address: buyAddress,
    },
  });
  console.log(`holder: ${JSON.stringify(holder)}`);
  const object = await prisma.user.findUnique({
    where: {
      address: objectAddress,
    },
  });
  console.log(`object: ${JSON.stringify(object)}`);
  if (!holder || !object) throw new Error("User not found");
  const deleteHolder = await prisma.holder.findFirst({
    where: {
      holder_id: holder?.id,
      object_id: object?.id,
    },
  });
  console.log(`deleteHolder: ${JSON.stringify(deleteHolder)}`);
  const result = await prisma.holder.delete({
    where: {
      id: deleteHolder?.id,
    },
  });
  return result;
};
