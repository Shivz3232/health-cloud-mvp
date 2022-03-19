import { models, model, Schema, Document, Model } from 'mongoose';

export interface PermitI extends Document {
  code: string;
  expiresAt: string;
  userId: Schema.Types.ObjectId;
  status: 'unused' | 'used';
}

const PermitSchema = new Schema<PermitI>(
  {
    code: String,
    expiresAt: Date,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['unused', 'used'],
      default: 'unused',
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

const PermitModel: Model<PermitI> =
  models.permit || model<PermitI>('permit', PermitSchema, 'permit');

export default PermitModel;
