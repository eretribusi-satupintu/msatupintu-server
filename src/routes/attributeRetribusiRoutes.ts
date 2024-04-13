import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import {
  createItemRetribusi,
  getWajibRetribusi,
} from "../controllers/attributeRetribusiController";
const router = express.Router();

router.use(bodyParser.json());

router.post("/get", async (res: Response) => {
  // res.status(200).json({ message: "success" });
  try {
    const data = await getWajibRetribusi();
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});

router.post("/store", async (req: Request, res: Response) => {
  try {
    const data = await createItemRetribusi(req.body);
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});

export default router;
