import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {
  getDetailTagihan,
  getNewest,
  getTagihanWajibRetribusi,
  getPaidTagihanWajibRetribusi,
  getTagihanWajibRetribusiMasyarakat,
  getTagihanWajibRetribusiMasyarakatProgress,
  getTagihan,
  getAllPaidTagihanWajibRetribusi,
  getDetailTagihanPetugas,
} from '../controllers/tagihanController';
import { StatusBayar, TransaksiPetugasStatus } from '@prisma/client';

const router = express.Router();

router.use(bodyParser.json());

router.get('/wajib_retribusi/:wr_id/newest', async (req: Request, res: Response) => {
  try {
    const data = await getNewest(Number(req.params.wr_id));
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
});

// router.get(
//   "/:wr_id/item-retribusi/:retribusi_id",
//   async (req: Request, res: Response) => {
//     try {
//       const data = await getWajibRetribusiTagihan(
//         Number(req.params.wr_id),
//         Number(req.params.retribusi_id)
//       );
//       res.status(200).json({ data: data });
//     } catch (error) {
//       console.log(error);
//       res.status(400).json({
//         message: error,
//       });
//     }
//   }
// );

router.get('/wajib-retribusi/:wr_id/sub-wilayah/:subwilayah_id', async (req: Request, res: Response) => {
  try {
    const data = await getTagihanWajibRetribusi(Number(req.params.wr_id), Number(req.params.subwilayah_id));
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
});

router.get('/wajib-retribusi/:wr_id', async (req: Request, res: Response) => {
  try {
    const data = await getTagihanWajibRetribusiMasyarakat(Number(req.params.wr_id));
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
});

router.get('/wajib-retribusi/:wr_id/kontrak/:kontrak_id/progress', async (req: Request, res: Response) => {
  try {
    const data = await getTagihanWajibRetribusiMasyarakatProgress(Number(req.params.wr_id), Number(req.params.kontrak_id));
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
});

router.get('/petugas/:petugas_id/sub-wilayah/:subwilayah_id/status/:status', async (req: Request, res: Response) => {
  try {
    const data = await getPaidTagihanWajibRetribusi(
      Number(req.params.petugas_id),
      Number(req.params.subwilayah_id),
      req.params.status as TransaksiPetugasStatus,
    );
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
});
router.get('/petugas/:petugas_id/sub-wilayah/:subwilayah_id/all', async (req: Request, res: Response) => {
  try {
    const data = await getAllPaidTagihanWajibRetribusi(Number(req.params.petugas_id), Number(req.params.subwilayah_id));
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
});

router.get('/petugas/:petugas_id', async (req: Request, res: Response) => {
  try {
    const data = await getTagihan(Number(req.params.petugas_id));
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
});

router.get('/:tagihan_id', async (req: Request, res: Response) => {
  try {
    const data = await getDetailTagihan(Number(req.params.tagihan_id));
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
});
router.get('/:tagihan_id/petugas', async (req: Request, res: Response) => {
  try {
    const data = await getDetailTagihanPetugas(Number(req.params.tagihan_id));
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
});

export default router;
