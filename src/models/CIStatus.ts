// src/models/CIStatus.ts

import mongoose, { Document, Model, Schema } from 'mongoose';

interface ICIStatus extends Document {
  stage: string;
  status: string;
  logs: string;
  time: Date;
}

const CIStatusSchema: Schema = new Schema({
  stage: { type: String, required: true },
  status: { type: String, required: true },
  logs: { type: String, required: true },
  time: { type: Date, default: Date.now },
});

const CIStatus: Model<ICIStatus> = mongoose.models.CIStatus || mongoose.model<ICIStatus>('CIStatus', CIStatusSchema);

export default CIStatus;
