import { models, model, Schema } from 'mongoose';

const RecordSchema = new Schema(
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

const RecordModel = models.record || model('record', RecordSchema, 'record');

export default RecordModel;
