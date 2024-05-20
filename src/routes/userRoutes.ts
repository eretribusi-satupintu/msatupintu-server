import { getUser, updatePassword, updateUser } from '../controllers/userController';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Prisma } from '@prisma/client';

const router = express.Router();
router.use(bodyParser.json());

router.post('/', async (req: Request, res: Response) => {
  try {
    const data = await getUser(req.body.email);
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.put('/:user_id', async (req: Request, res: Response) => {
  try {
    const data = await updateUser(Number(req.params.user_id), req.body);
    console.log(data);
    res.status(200).json({ data: data });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002' && error.meta?.target === 'users_phone_number_key') {
        console.error('Error: A user with this phone number already exists.');
        res.status(500).json({ message: 'A user with this phone number already exists.' });
      } else {
        res.status(500).json({ message: error.message });
      }
    } else {
      res.status(500).json({ message: error });
    }
    res.status(500).json({ message: error });
  }
});

router.post('/update-password', async (req: Request, res: Response) => {
  try {
    const data = await updatePassword(req.body.email, req.body.old_password, req.body.new_password, req.body.confirmation_password);
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
