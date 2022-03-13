import { models, model, Schema } from 'mongoose';

const PermitSchema = new Schema(
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

const PermitModel = models.permit || model('permit', PermitSchema, 'permit');

export default PermitModel;
