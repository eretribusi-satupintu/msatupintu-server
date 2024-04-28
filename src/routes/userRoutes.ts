import { getUser, updateUser } from '../controllers/userController';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

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
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
