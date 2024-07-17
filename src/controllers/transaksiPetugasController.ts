import { PrismaClient } from '@prisma/client';
import { ITransaksiPetugas } from '../types';
import { getDetailTagihan } from './tagihanController';
import { formatResponseToISO8601, getCurrentDateTime } from '../utils/utils';
import { converBase64ToImage } from 'convert-base64-to-image';

const prisma = new PrismaClient();

export const petugasPayTagihan = async (transaksiPetugas: ITransaksiPetugas) => {
  try {
    var bukti_bayar: string = '';

    if (transaksiPetugas.bukti_bayar != null && transaksiPetugas.bukti_bayar != '' && transaksiPetugas.metode_pembayaran != 'CASH') {
      const base64 = 'data:image/png;base64,' + transaksiPetugas.bukti_bayar ?? '';
      const date_time = new Date().toISOString();
      const pathToSaveImage =
        'public/assets/bukti-pembayaran-tagihan/' + date_time + '-' + transaksiPetugas.petugas_id + transaksiPetugas.tagihan_id + '-image.png';
      converBase64ToImage(base64, pathToSaveImage);
      bukti_bayar = pathToSaveImage;
      console.log({ base64: base64 });
    }

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
        metode_penagihan: transaksiPetugas.metode_pembayaran,
        bukti_bayar: bukti_bayar,
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
        metode_pembayaran: 'CASH',
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
        status: 'VERIFIED',
        metode_penagihan: 'CASH',
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

// const getTransaksiPetugas = as

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
          metode_pembayaran: req.metode_pembayaran ?? 'CASH',
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
