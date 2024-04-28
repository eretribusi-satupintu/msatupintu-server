import { PrismaClient } from '@prisma/client';
import { ITransaksiPetugas } from '../types';
import { getDetailTagihan } from './tagihanController';

const prisma = new PrismaClient();

export const petugasPayTagihan = async (transaksiPetugas: ITransaksiPetugas) => {
  try {
    const tagihan = await prisma.tagihan.update({
      where: {
        id: transaksiPetugas.tagihan_id,
      },
      data: {
        status: 'VERIFIED',
      },
    });

    const petugasTransaksi = await prisma.transaksiPetugas.create({
      data: {
        petugas_id: transaksiPetugas.petugas_id,
        tagihan_id: tagihan.id,
        nominal: tagihan.total_harga,
      },
    });

    const tagihanDetail = await getDetailTagihan(tagihan.id);

    return tagihanDetail;
  } catch (error) {
    throw (error as Error).message;
  }
};

export const petugasCancelPayTagihan = async (tagihan_id: number) => {
  try {
    const tagihan = await prisma.tagihan.update({
      where: {
        id: tagihan_id,
      },
      data: {
        status: 'NEW',
      },
      include: {
        TransaksiPetugas: true,
      },
    });

    const petugasTransaksi = await prisma.transaksiPetugas.delete({
      where: {
        id: tagihan.TransaksiPetugas!.id,
      },
    });

    const tagihanDetail = await getDetailTagihan(tagihan_id);

    return tagihanDetail;
  } catch (error) {
    throw (error as Error).message;
  }
};

export const getBillAmount = async (petugas_id: number, sub_wilayah_id: number) => {
  try {
    const totalTagihan = await prisma.transaksiPetugas.findMany({
      where: {
        petugas_id: petugas_id,
        is_stored: false,
        AND: {
          tagihan: {
            kontrak: {
              sub_wilayah_id: sub_wilayah_id,
            },
          },
        },
      },
      select: {
        id: true,
        nominal: true,
      },
    });

    let sumTagihan = 0;

    totalTagihan.map((transaksi) => {
      sumTagihan += transaksi.nominal;
    });

    return { transaksi_petugas: totalTagihan, total: sumTagihan };
  } catch (error) {
    throw error;
  }
};
