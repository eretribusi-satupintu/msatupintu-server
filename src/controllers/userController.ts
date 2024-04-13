import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone_number: true,
        photo_profile: true,
        nik: true,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};
