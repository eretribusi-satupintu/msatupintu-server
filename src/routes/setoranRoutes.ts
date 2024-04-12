import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import {
  getSetoran,
  storeSetoran,
  updateSetoran,
} from "../controllers/setoranController";

const router = express.Router();
router.use(bodyParser.json());

router.get(
  "/petugas/:petugas_id/subwilayah/:sub_wilayah_id",
  async (req: Request, res: Response) => {
    try {
      const data = await getSetoran(
        Number(req.params.petugas_id),
        Number(req.params.sub_wilayah_id)
      );

      res.status(200).json({ data: data });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: error });
    }
  }
);

router.post(
  "/petugas/:petugas_id/subwilayah/:sub_wilayah_id",
  async (req: Request, res: Response) => {
    try {
      const data = await storeSetoran(
        Number(req.params.petugas_id),
        Number(req.params.sub_wilayah_id),
        req.body
      );

      res.status(200).json({ data: data });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: error });
    }
  }
);

router.put(
  "/:setoran_id/petugas/:petugas_id/subwilayah/:sub_wilayah_id",
  async (req: Request, res: Response) => {
    try {
      const data = await updateSetoran(
        Number(req.params.setoran_id),
        Number(req.params.petugas_id),
        Number(req.params.sub_wilayah_id),
        req.body
      );

      res.status(200).json({ data: data });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: error });
    }
  }
);

export default router;
