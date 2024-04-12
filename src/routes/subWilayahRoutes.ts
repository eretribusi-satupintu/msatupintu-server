import express, { Request, Response } from "express";
import { getSubWilayah } from "../controllers/subWilayahController";

const router = express.Router();

router.get("/petugas/:petugas_id", async (req: Request, res: Response) => {
  try {
    const data = await getSubWilayah(Number(req.params.petugas_id));
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
