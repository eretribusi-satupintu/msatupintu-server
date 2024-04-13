import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSubWilayah = async (petugas_id: number) => {
  try {
    const data = await prisma.petugasSubWilayah.findMany({
      where: {
        petugas_id: petugas_id,
      },
      select: {
        sub_wilayah: {
          select: {
            id: true,
            nama: true,
          },
        },
      },
    });
    const formatedData: Object[] = [];
    data.map((subwilayah) => formatedData.push(subwilayah.sub_wilayah));

    return formatedData;
  } catch (error) {
    throw error;
  }
};
