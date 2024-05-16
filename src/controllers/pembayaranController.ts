import { PrismaClient, Status, StatusBayar } from '@prisma/client';

const prisma = new PrismaClient();

export const get = async (status: Status) => {
  try {
    const data = await prisma.pembayaran.findMany({
      where: {
        status: status,
      },
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
        VirtualAccount: {
          where: {
            status: 'SUCCESS',
          },
        },
      },
    });

    const resposeData: Object[] = [];

    // data.map((item, i) => {
    //   const { virtual_account, ...data } = item;
    //   resposeData.push({ ...data, virtual_account: item.virtual_account[i] });
    // });

    return data;
  } catch (error) {
    throw error;
  }
};
