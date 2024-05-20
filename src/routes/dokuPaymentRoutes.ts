import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { getAllVirtualAccountPayments, getQrisCheckoutPage, getVirtualAccount, paymentNotification } from '../controllers/dokuPaymentsController';

const router = express.Router();
router.use(bodyParser.json());

// router.post('/token', async (req: Request, res: Response) => {
//   try {
//     // res.status(200).json({ data: req.body.payment_order });
//     const data = await getToken();
//     console.log({ routes: data });
//     res.status(200).json({ data: data });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: err,
//     });
//   }
// });

router.post('/virtual-account', async (req: Request, res: Response) => {
  try {
    const data = await getVirtualAccount(
      req.body.request_id,
      req.body.tagihan_id,
      req.body.request_timestamp,
      req.body.payment_order,
      req.body.bank,
      req.body.fcm_token,
    );
    console.log({ routes: data });
    res.status(200).json({ data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
});

router.get('/virtual-account/wajib-retribusi/:wr_id/status/:status', async (req: Request, res: Response) => {
  try {
    const data = await getAllVirtualAccountPayments(Number(req.params.wr_id), req.params.status);
    console.log({ data: data });
    res.status(200).json({ data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
});

router.post('/qris-checkout', async (req: Request, res: Response) => {
  try {
    const data = await getQrisCheckoutPage(req.body.request_id, req.body.tagihan_id, req.body.request_timestamp, req.body);
    console.log({ data: data });
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
    return 'test';
    const data = await paymentNotification(req);
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
