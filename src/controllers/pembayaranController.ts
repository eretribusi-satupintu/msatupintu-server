import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const get = async () => {
  try {
    const data = await prisma.pembayaran.findMany({
      include: {
        tagihan: {
          select: {
            nama: true,
            total_harga: true,
            kontrak: {
              select: {
                item_retribusi: {
                  select: {
                    kategori_nama: true,
                  },
                },
              },
            },
          },
        },
        virtual_account: {
          take: 1,
          orderBy: { created_at: "desc" },
          select: {
            bank: true,
          },
        },
      },
    });

    const resposeData: Object[] = [];

    data.map((item, i) => {
      const { virtual_account, ...data } = item;
      resposeData.push({ ...data, virtual_account: item.virtual_account[i] });
    });

    return resposeData;
  } catch (error) {
    throw error;
  }
};
