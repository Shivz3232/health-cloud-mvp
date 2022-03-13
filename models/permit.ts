import { models, model, Schema } from 'mongoose';

const PermitSchema = new Schema(
  {
    code: String,
    expiresAt: Date,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
