import { prisma } from "../app";

export const post = async () => {
  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Timeless",
      biography: "Timeless",
      icon: "https://res.cloudinary.com/dplp5wtzk/image/upload/v1708088140/long-star.jpg",
      key_img: "https://res.cloudinary.com/dplp5wtzk/image/upload/v1708088140/long-star.jpg",
      address: "0x8584f9ccc78b971ec208bb8a4dc5329464b3cdfb",
      code_id: 1,
    },
  });
};
