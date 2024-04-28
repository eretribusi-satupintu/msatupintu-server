import { PrismaClient } from '@prisma/client';
import { ITagihanManual } from '../types';

const prisma = new PrismaClient();

export const getTagihanManual = async (petugas_id: number, subwilayah_id: number) => {
  try {
    const data = await prisma.tagihanManual.findMany({
      where: {
        petugas_id: petugas_id,
        sub_wilayah_id: subwilayah_id,
      },
      select: {
        id: true,
        item_retribusi: {
          select: {
            kategori_nama: true,
          },
        },
        petugas: {
          select: {
            users: {
              select: {
                name: true,
              },
            },
          },
        },
        subwilayah: {
          select: {
            nama: true,
          },
        },
        total_harga: true,
        detail_tagihan: true,
        status: true,
        paid_at: true,
        created_at: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const storeTagihanManual = async (petugas_id: number, subwilayah_id: number, tagihan_manual: ITagihanManual) => {
  try {
    const data = await prisma.tagihanManual.create({
      data: {
        item_retribusi_id: tagihan_manual.item_retribusi_id,
        petugas_id: petugas_id,
        sub_wilayah_id: subwilayah_id,
        detail_tagihan: tagihan_manual.detail_tagihan,
        total_harga: tagihan_manual.total_harga,
        status: 'NEW',
      },
      select: {
        id: true,
        item_retribusi: {
          select: {
            kategori_nama: true,
          },
        },
        petugas: {
          select: {
            users: {
              select: {
                name: true,
              },
            },
          },
        },
        subwilayah: {
          select: {
            nama: true,
          },
        },
        total_harga: true,
        detail_tagihan: true,
        status: true,
        paid_at: true,
        created_at: true,
      },
    });

    return data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};
