import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import ItemRetribusi from '../mongo/models/atributeRetribusi';
import { IItemRetribusi, IWajibRetribusi } from '../types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const get = async (req: any) => {
  try {
    const data = await prisma.tagihan.findMany();
    return data;
  } catch (error) {
    throw error;
  }
};

export { get };
