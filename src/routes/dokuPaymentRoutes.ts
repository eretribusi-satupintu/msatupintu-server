import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import { getVirtualAccount, showVirtualAccount } from '../controllers/dokuPaymentsControllerts';

const router = express.Router();
const prisma = new PrismaClient();
router.use(bodyParser.json());

router.post('/virtual-account', async (req: Request, res: Response) => {
  try {
    // res.status(200).json({ data: req.body.payment_order });
    const data = await getVirtualAccount(req.body.request_id, req.body.payment_order, req.body.bank);
    console.log({ routes: data });
    res.status(200).json({ data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
});

router.post('/notifications', async (req: Request, res: Response) => {
  try {
    const data = await showVirtualAccount(req);
    console.log({ hasil: data });
    res.status(200).json({ data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
});

router.post('/notifications/test', async (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

export default router;
