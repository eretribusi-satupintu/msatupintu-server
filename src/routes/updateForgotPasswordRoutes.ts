import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { checkPhoneNumberIfExist, updateForgotPassword } from '../controllers/userController';

const router = express.Router();
router.use(bodyParser.json());

router.get('/:phone_number', async (req: Request, res: Response) => {
  try {
    const data = await checkPhoneNumberIfExist(req.params.phone_number);
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
router.post('/:phone_number/update', async (req: Request, res: Response) => {
  try {
    console.log(req.params.phone_number);
    const data = await updateForgotPassword(req.params.phone_number, req.body.new_password, req.body.confirmation_password);
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
