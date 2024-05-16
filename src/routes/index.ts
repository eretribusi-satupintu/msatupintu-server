import express, { Request, Response } from 'express';
import authRoutes from './authenticationRoutes';
import itemRetribusiRoutes from './itemRetribusiRoutes';
import tagihanRoutes from './tagihanRoutes';
import DokuRoutes from './dokuPaymentRoutes';
import pembayaranRoutes from './pembayaranRoutes';
import retribusiRoutes from './retribusiRoutes';
import wajiRetribusiRoutes from './petugas/wajibRetribusiRoutes';
import authValidation from '../middleware/authValidationMiddleware';
import transaksiPetugasRoutes from '../routes/transaksiPetugasRoutes';
import kontrakRoutes from '../routes/kontrakRoutes';
import subWilayahRoutes from '../routes/subWilayahRoutes';
import setoranRoutes from '../routes/setoranRoutes';
import tagihanManualRoutes from '../routes/tagihanManualRoutes';
import forgotPasswordRoutes from './updateForgotPasswordRoutes';
import userRoutes from './userRoutes';

const router = express.Router();
router.get('/', async (req: Request, res: Response) => {
  res.send({ server: 'SatuPintu Server is runnning' });
});
router.use('/auth', authRoutes);
router.use('/user', authValidation, userRoutes);
router.use('/forgot-password', forgotPasswordRoutes);
router.use('/item-retribusi', authValidation, itemRetribusiRoutes);
router.use('/tagihan', authValidation, tagihanRoutes);
router.use('/tagihan-manual', authValidation, tagihanManualRoutes);
router.use('/payment', authValidation, DokuRoutes);
router.use('/payments', DokuRoutes);
router.use('/pembayaran', authValidation, pembayaranRoutes);
router.use('/retribusi', authValidation, retribusiRoutes);
router.use('/petugas', authValidation, wajiRetribusiRoutes);
router.use('/wajib-retribusi', authValidation, wajiRetribusiRoutes);
router.use('/transaksi-petugas', authValidation, transaksiPetugasRoutes);
router.use('/kontrak', authValidation, kontrakRoutes);
router.use('/setoran', authValidation, setoranRoutes);
router.use('/sub-wilayah', authValidation, subWilayahRoutes);

export default router;
