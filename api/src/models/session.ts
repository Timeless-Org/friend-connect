import { prisma } from "../app";
import { ISession } from "../utils/interfaces";

export const getSessionModel = async (id: string): Promise<ISession | null> => {
  const session = await prisma.session.findUnique({
    where: {
      sid: id,
    },
  });
  return session;
};
