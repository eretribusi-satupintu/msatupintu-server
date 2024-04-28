import mongoose from 'mongoose';
import ItemRetribusi from '../mongo/models/atributeRetribusi';
import { IItemRetribusi } from '../types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// const getWajibRetribusi = async () => {
//   try {
//     const data = await prisma.wajibRetribusi.findMany();
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

const getItemRetribusi = async (subwilayah_id: number) => {
  try {
    const subwilayah = await prisma.subWilayah.findUnique({
      where: {
        id: subwilayah_id,
      },
    });

    const data = await prisma.itemRetribusi.findMany({
      where: {
        retribusi_id: subwilayah?.id,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

const createItemRetribusi = async (req: IItemRetribusi) => {
  try {
    const { data_khusus_retribusi, kategori_nama, jenis_tagihan, harga } = req;

    const data = new ItemRetribusi({
      id: new mongoose.Types.ObjectId(),
      data_khusus_retribusi,
      kategori_nama,
      jenis_tagihan,
      harga,
    });

    return data
      .save()
      .then(() => {
        return {
          message: 'Item Retribusi Created Succeessfully',
          itemRetribusi: data,
        };
      })
      .catch((error) => error);
  } catch (error) {
    throw error;
  }
};

export { createItemRetribusi, getItemRetribusi };
