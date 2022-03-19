import { models, model, Schema, Document, Model } from 'mongoose';

export interface SessionI extends Document {
  doctorId: Schema.Types.ObjectId;
  patientId: Schema.Types.ObjectId;
  permitId: Schema.Types.ObjectId;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

const SessionSchema = new Schema<SessionI>(
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

const SessionModel: Model<SessionI> =
  models.session || model<SessionI>('session', SessionSchema, 'sessions');

export default SessionModel;
