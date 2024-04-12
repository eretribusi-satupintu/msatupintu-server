import mongoose, { Document, Schema } from "mongoose";
import { IKontrak } from "../../types";

export interface IKontrakModel extends IKontrak, Document {}
const KontrakSchema: Schema = new Schema(
  {
    wr_data: { type: Object, required: true },
    item_retribusi: { type: Object, required: true },
    tagihan: { type: Array<Object>, required: true },
    sub_districts: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IKontrakModel>("kontrak", KontrakSchema);
