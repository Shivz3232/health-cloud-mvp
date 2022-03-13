import { models, model, Schema } from 'mongoose';

const SessionSchema = new Schema(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    permitId: {
      type: Schema.Types.ObjectId,
      ref: 'permit',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

const SessionModel =
  models.session || model('session', SessionSchema, 'sessions');

export default SessionModel;
