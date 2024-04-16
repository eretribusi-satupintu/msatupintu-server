import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import {
  register,
  login as loginController,
  logout,
} from "../controllers/authenticationController";
import authValidation from "../middleware/authValidationMiddleware";
const router = express.Router();

router.use(bodyParser.json());

router.post("/register", async (req: Request, res: Response) => {
  try {
    const data = await register(req.body);

    res.status(200).json({ data: data });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err,
    });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const data = await loginController(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  try {
    const data = await logout();
    res.status(200).json(data);
  } catch (error) {
    res.status(403).json(error);
  }
});

export default router;
