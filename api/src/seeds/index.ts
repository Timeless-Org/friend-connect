import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { post as userPost } from "./user";
import { post as watchlistPost } from "./watchlist";
import { post as codePost } from "./code";
import { post as chatPost } from "./chat";
import { post as messagePost } from "./message";
import { post as holderPost } from "./holder";
import { post as pointPost } from "./point";
import { post as tradePost } from "./trade";

export const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.watchlist.deleteMany();
  await prisma.code.deleteMany();
  await prisma.user.deleteMany();
  await prisma.chat.deleteMany();
  await prisma.message.deleteMany();
  await prisma.holder.deleteMany();
  await prisma.point.deleteMany();
  await prisma.trade.deleteMany();
  await prisma.featured.deleteMany();

  await codePost();
  await userPost();
  await watchlistPost();
  await chatPost();
  await messagePost();
  await holderPost();
  await pointPost();
  await tradePost();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
