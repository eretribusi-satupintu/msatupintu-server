import { PrismaClient } from '@prisma/client';
import { ITagihanManual } from '../types';
import { converBase64ToImage } from 'convert-base64-to-image';

const prisma = new PrismaClient();

export const getTagihanManual = async (petugas_id: number, subwilayah_id: number) => {
  try {
    const data = await prisma.tagihanManual.findMany({
      where: {
        petugas_id: petugas_id,
        sub_wilayah_id: subwilayah_id,
        is_stored: false,
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
        metode_pembayaran: true,
        bukti_bayar: true,
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

export const getPaidTagihanManual = async (petugas_id: number, subwilayah_id: number) => {
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
        metode_pembayaran: true,
        bukti_bayar: true,
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
        metode_pembayaran: tagihan_manual.metode_pembayaran,
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
        bukti_bayar: true,
        metode_pembayaran: true,
        created_at: true,
      },
    });

    return data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};
export const uploadImageTagihanManual = async (tagihan_manual_id: number, image: string) => {
  try {
    const base64 = 'data:image/png;base64,' + image;
    const date_time = new Date().toISOString();
    const pathToSaveImage = 'public/assets/bukti-pembayaran-tagihan-manual/' + date_time + '-' + tagihan_manual_id + '-image.png';
    converBase64ToImage(base64, pathToSaveImage);
    console.log({ base64: base64 });

    const data = await prisma.tagihanManual.update({
      where: {
        id: tagihan_manual_id,
      },
      data: {
        bukti_bayar: pathToSaveImage,
      },
    });

    return {
      status: 'updated',
      bukti_bayar: data.bukti_bayar,
    };
  } catch (error) {
    console.log(error);

    throw error;
  }
};
