import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import ItemRetribusi from "../mongo/models/atributeRetribusi";
import { IItemRetribusi, IWajibRetribusi } from "../types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getWajibRetribusi = async (req: any) => {
  try {
    const data = await prisma.wajibRetribusi.findMany();
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
          message: "Item Retribusi Created Succeessfully",
          itemRetribusi: data,
        };
      })
      .catch((error) => error);
  } catch (error) {
    throw error;
  }
};

export { createItemRetribusi, getWajibRetribusi };
