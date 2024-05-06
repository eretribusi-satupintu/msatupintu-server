import express, { Request, Response } from 'express';
import { getWajibRetribusi, getWajibRetribusiDetail, getWajibRetribusiKontrak } from '../../controllers/wajibRetribusiController';

const router = express.Router();

router.get('/wilayah/:sub_wilayah_id', async (req: Request, res: Response) => {
  try {
    const data = await getWajibRetribusi(Number(req.params.sub_wilayah_id));

    if (res.statusCode !== 200) {
      res.status(500).json({ message: 'Internal Server Error' });
    }

    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
});

router.get('/:wr_id/sub-wilayah/:sub_wilayah_id', async (req: Request, res: Response) => {
  try {
    const data = await getWajibRetribusiDetail(Number(req.params.wr_id), Number(req.params.sub_wilayah_id));

    if (res.statusCode !== 200) {
      res.status(500).json({ message: 'Internal Server Error' });
    }

    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
});

router.get('/:wajib_retribusi_id/wilayah/:sub_wilayah_id/kontrak', async (req: Request, res: Response) => {
  try {
    const data = await getWajibRetribusiKontrak(Number(req.params.wajib_retribusi_id), Number(req.params.sub_wilayah_id));

    if (res.statusCode !== 200) {
      res.status(500).json({ message: 'Internal Server Error' });
    }

    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
});

export default router;
