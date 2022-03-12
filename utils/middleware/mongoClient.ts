import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

const connect =
  // @ts-ignore
  handler => async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0].readyState) {
      // if connection already exists
      return handler(req, res);
    }

    const connString = process.env.MONGO_URI;

    if (connString) {
      await mongoose.connect(connString);
      return handler(req, res);
    } else {
      return res
        .status(500)
        .json({ success: false, msg: 'MongoDB connection string not found' });
    }
  };

export default connect;
