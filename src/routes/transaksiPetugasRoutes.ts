import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { getBillAmount, petugasCancelPayTagihan, petugasPayTagihan, synchronizationLocalPayment } from '../controllers/transaksiPetugasController';

const router = express.Router();
router.use(bodyParser.json());

router.get('/petugas/:petugas_id/sub-wilayah/:sub_wilayah_id', async (req: Request, res: Response) => {
  try {
    const data = await getBillAmount(Number(req.params.petugas_id), Number(req.params.sub_wilayah_id));
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
});

router.post('/pay/cash', async (req: Request, res: Response) => {
  try {
    const data = await petugasPayTagihan(req.body);
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
});

router.post('/pay/cash/cancel', async (req: Request, res: Response) => {
  try {
    const data = await petugasCancelPayTagihan(req.body.tagihan_id);
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
});

router.post('/synchronization/petugas/:petugas_id', async (req: Request, res: Response) => {
  try {
    const data = await synchronizationLocalPayment(Number(req.params.petugas_id), req.body);
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
});

export default router;
