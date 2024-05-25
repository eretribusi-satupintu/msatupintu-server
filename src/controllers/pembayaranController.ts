import { PrismaClient, Status, StatusBayar } from '@prisma/client';

const prisma = new PrismaClient();

export const get = async (status: Status, role_id: number) => {
  try {
    const data = await prisma.pembayaran.findMany({
      where: {
        status: status,
        tagihan: {
          kontrak: {
            wajib_retribusi_id: role_id,
          },
        },
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
      orderBy: {
        updated_at: 'desc',
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
