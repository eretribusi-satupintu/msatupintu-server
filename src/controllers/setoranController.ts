import { ISetoran } from "../types";
import { PrismaClient } from "@prisma/client";
import { converBase64ToImage } from "convert-base64-to-image";

const prisma = new PrismaClient();

export const getSetoran = async (
  petugas_id: number,
  sub_wilayah_id: number
) => {
  try {
    const setoran = prisma.setoran.findMany({
      where: {
        petugas_id: petugas_id,
        sub_wilayah_id: sub_wilayah_id,
      },
      select: {
        id: true,
        total: true,
        waktu_penyetoran: true,
        bukti_penyetoran: true,
        lokasi_penyetoran: true,
        status: true,
        keterangan: true,
      },
    });

    return setoran;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const storeSetoran = async (
  petugas_id: number,
  sub_wilayah_id: number,
  req: ISetoran
) => {
  try {
    const base64 = "data:image/png;base64," + req.bukti_penyetoran;
    const date_time = new Date(req.waktu_penyetoran).toISOString();
    const pathToSaveImage = "public/assets/" + date_time + "-image1.png";
    converBase64ToImage(base64, pathToSaveImage);

    const setoran = await prisma.setoran.create({
      data: {
        petugas_id: petugas_id,
        sub_wilayah_id: sub_wilayah_id,
        waktu_penyetoran: date_time,
        total: req.total,
        bukti_penyetoran: pathToSaveImage,
        lokasi_penyetoran: req.lokasi_penyetoran,
        keterangan: req.keterangan,
        status: "MENUNGGU",
      },
    });

    return setoran;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateSetoran = async (
  setoran_id: number,
  petugas_id: number,
  sub_wilayah_id: number,
  req: ISetoran
) => {
  try {
    const date_time = new Date(req.waktu_penyetoran).toISOString();

    var pathToSaveImage = null;
    if (req.bukti_penyetoran !== "") {
      const base64 = "data:image/png;base64," + req.bukti_penyetoran;
      pathToSaveImage = "public/assets/" + date_time + "-image1.png";
      converBase64ToImage(base64, pathToSaveImage);
    }

    const findSetoran = await prisma.setoran.findUnique({
      where: {
        id: setoran_id,
      },
    });

    if (findSetoran == null) {
      throw "id: " + setoran_id;
    }

    const setoran = await prisma.setoran.update({
      where: {
        id: setoran_id,
      },
      data: {
        petugas_id: petugas_id,
        sub_wilayah_id: sub_wilayah_id,
        waktu_penyetoran: date_time,
        total: req.total,
        bukti_penyetoran: pathToSaveImage ?? findSetoran.bukti_penyetoran,
        lokasi_penyetoran: req.lokasi_penyetoran,
        keterangan: req.keterangan,
        status: "MENUNGGU",
      },
    });

    return setoran;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
