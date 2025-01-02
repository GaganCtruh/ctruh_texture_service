import mongoose, { Document, Schema } from 'mongoose';

export interface IMesh extends Document {
  id: mongoose.Types.ObjectId;
  meshType: string;
  name: string;
  screenShot: string;
  texture: string;
}

const meshSchema = new Schema<IMesh>({
  meshType: { type: String, required: false},
  name: { type: String, required: false },
  screenShot: { type: String, required: false },
  texture: { type: String, required: false}
}, { timestamps: true });

export default mongoose.model<IMesh>('Mesh', meshSchema);
