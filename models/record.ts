import { models, model, Schema, Document, Model } from 'mongoose';

export interface RecordI extends Document {
  sessionId: Schema.Types.ObjectId;
  description: string;
  fileURL: string;
  createdAt: string;
  updatedAt: string;
}

const RecordSchema = new Schema<RecordI>(
  {
    sessionId: {
      type: Schema.Types.ObjectId,
      ref: 'session',
      required: true,
    },
    description: String,
    fileURL: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

const RecordModel: Model<RecordI> =
  models.record || model<RecordI>('record', RecordSchema, 'record');

export default RecordModel;
