import { models, model, Schema, Document, Model } from 'mongoose';

export interface DocumentI extends Document {
  name: string;
  url: string;
  type: string;
  uploadedAt?: string;
}

const DocumentSchema = new Schema<DocumentI>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: 'uploadedAt',
    },
  }
);

export interface RecordI extends Document {
  sessionId: Schema.Types.ObjectId;
  description: string;
  documents:
    | Schema<DocumentI, Model<DocumentI, any, any, any>, any, any>[]
    | undefined;
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
    documents: {
      type: [DocumentSchema],
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
