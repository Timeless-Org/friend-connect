import { ISession } from "lib/type";
import { prisma } from "../app";

export const getSessionModel = async (id: string): Promise<ISession | null> => {
  const session = await prisma.session.findUnique({
    where: {
      sid: id,
    },
  });
  return session;
};
