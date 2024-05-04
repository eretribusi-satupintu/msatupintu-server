import { PrismaClient } from '@prisma/client';
import { ITransaksiPetugas } from '../types';
import { getDetailTagihan } from './tagihanController';
import { formatResponseToISO8601, getCurrentDateTime } from '../utils/utils';

const prisma = new PrismaClient();

export const petugasPayTagihan = async (transaksiPetugas: ITransaksiPetugas) => {
  try {
    const tagihan = await prisma.tagihan.update({
      where: {
        id: transaksiPetugas.tagihan_id,
      },
      data: {
        status: 'VERIFIED',
        payment_time: new Date().toISOString(),
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
        status: 'WAITING',
        TransaksiPetugas: {
          update: {
            status: 'WAITING',
          },
        },
      },
      include: {
        TransaksiPetugas: true,
      },
    });

    const petugasTransaksi = await prisma.transaksiPetugas.update({
      where: {
        id: tagihan.TransaksiPetugas!.id,
      },
      data: {
        status: 'WAITING',
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
    const totalTagihanManual = await prisma.tagihanManual.findMany({
      where: {
        petugas_id: petugas_id,
        is_stored: false,
        sub_wilayah_id: sub_wilayah_id,
      },
      select: {
        id: true,
        total_harga: true,
      },
    });

    const totalTagihan = await prisma.transaksiPetugas.findMany({
      where: {
        petugas_id: petugas_id,
        is_stored: false,
        status: 'SUCCESS',
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
    let sumTagihanManual = 0;

    totalTagihan.map((transaksi) => {
      sumTagihan += transaksi.nominal;
    });

    totalTagihanManual.map((transaksi) => {
      sumTagihanManual += transaksi.total_harga;
    });

    return { transaksi_petugas: totalTagihan, total: sumTagihan, tagihan_manual: totalTagihanManual, total_tagihan_manual: sumTagihanManual };
  } catch (error) {
    throw error;
  }
};

const checkTransaksiExist = async (id: number) => {
  const transaksiPetugas = await prisma.transaksiPetugas.findUnique({
    where: {
      tagihan_id: id,
    },
  });

  if (transaksiPetugas) {
    return true;
  } else {
    return false;
  }
};

export const synchronizationLocalPayment = async (petugas_id: number, req: any) => {
  try {
    for (const tagihan_id of req.tagihan_local_id) {
      if ((await checkTransaksiExist(tagihan_id)) == false) {
        const transaksiPetugas: ITransaksiPetugas = {
          petugas_id: petugas_id,
          tagihan_id: tagihan_id,
          nominal: req.amount,
        };
        await petugasPayTagihan(transaksiPetugas);
      }
    }
    // const transaksiPetugas = await prisma.transaksiPetugas.findMany();
    return { status: 'success' };
  } catch (error) {
    throw error;
  }
};
