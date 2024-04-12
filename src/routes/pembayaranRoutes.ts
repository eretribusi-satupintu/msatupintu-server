import { get } from "../controllers/pembayaranController";
import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await get();

    if (res.statusCode !== 200) {
      res.status(500).json({ message: "Internal Server Error" });
    }

    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
});

export default router;
