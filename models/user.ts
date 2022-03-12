import { models, model, Schema } from 'mongoose';

const UserSchema = new Schema(
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

const UserModel = models.user || model('user', UserSchema, 'users');

export default UserModel;
