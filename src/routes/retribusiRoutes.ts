import express, { Request, Response } from 'express';
import { getSewaWajibRetribusi, getItemWajibRetribusiKontrak, getRetribusiDetail } from '../controllers/retribusiController';

const router = express.Router();

router.get('/:retribusi_id', async (req: Request, res: Response) => {
  try {
    const data = await getRetribusiDetail(Number(req.params.retribusi_id));
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error });
  }
});
router.get('/get/wajib-retribusi/:wr_id', async (req: Request, res: Response) => {
  try {
    const data = await getSewaWajibRetribusi(Number(req.params.wr_id));
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/get/wajib-retribusi/:wr_id/item-retribusi/:retribusi_id', async (req: Request, res: Response) => {
  try {
    const data = await getItemWajibRetribusiKontrak(Number(req.params.wr_id), Number(req.params.retribusi_id));
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
