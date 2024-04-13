import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { getItemWajibRetribusiKontrak, getKontrakDetail, updateKontrakStatus } from '../controllers/kontrakController';

const router = express.Router();
router.use(bodyParser.json());

router.get('/wajib-retribusi/:wr_id', async (req: Request, res: Response) => {
  try {
    const data = await getItemWajibRetribusiKontrak(Number(req.params.wr_id));

    if (res.statusCode !== 200) {
      res.status(500).json({ message: 'Internal Server Error' });
    }

    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
});

router.get('/:kontrak_id', async (req: Request, res: Response) => {
  try {
    const data = await getKontrakDetail(Number(req.params.kontrak_id));

    if (res.statusCode !== 200) {
      res.status(500).json({ message: 'Internal Server Error' });
    }

    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
});

router.put('/:kontrak_id/status', async (req: Request, res: Response) => {
  try {
    const data = await updateKontrakStatus(Number(req.params.kontrak_id), req.body.status);

    if (res.statusCode !== 200) {
      res.status(500).json({ message: 'Internal Server Error' });
    }

    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
});

export default router;
