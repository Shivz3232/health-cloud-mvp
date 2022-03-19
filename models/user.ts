import { models, model, Schema, Document, Model } from 'mongoose';

export interface UserI extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'doctor' | 'patient';
}

const UserSchema = new Schema<UserI>(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ['patient', 'doctor'],
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

const UserModel: Model<UserI> =
  models.user || model<UserI>('user', UserSchema, 'users');

export default UserModel;
