import mongoose, { Document, Schema } from "mongoose";
import { IItemRetribusi } from "../../types";

export interface IItemRetribuiModel extends IItemRetribusi, Document {}
const ItemRetribusiSchema: Schema = new Schema(
  {
    data_khusu_retribusi: { type: Object, require: true },
    kategori_nama: { type: String, require: true },
    jenis_tagihan: { type: String, require: true },
    harga: { type: Number, require: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IItemRetribuiModel>(
  "ItemRetribusi",
  ItemRetribusiSchema
);
