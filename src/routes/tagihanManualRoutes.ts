import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { getPaidTagihanManual, getTagihanManual, storeTagihanManual } from '../controllers/tagihanManualController';

const router = express.Router();

router.get('/petugas/:petugas_id/subwilayah/:subwilayah_id', async (req: Request, res: Response) => {
  try {
    const data = await getTagihanManual(Number(req.params.petugas_id), Number(req.params.subwilayah_id));
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/petugas/:petugas_id/subwilayah/:subwilayah_id/paid', async (req: Request, res: Response) => {
  try {
    const data = await getPaidTagihanManual(Number(req.params.petugas_id), Number(req.params.subwilayah_id));
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post('/petugas/:petugas_id/subwilayah/:subwilayah_id', async (req: Request, res: Response) => {
  try {
    const data = await storeTagihanManual(Number(req.params.petugas_id), Number(req.params.subwilayah_id), req.body);
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
