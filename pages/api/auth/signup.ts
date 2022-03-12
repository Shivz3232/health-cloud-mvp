import { NextApiResponse, NextApiRequest } from 'next';
import bcrypt from 'bcrypt';
import connect from '../../../utils/middleware/mongoClient';
import User from '../../../models/user';

const ROUNDS = 12;

const createHash = (password: string) => bcrypt.hashSync(password, ROUNDS);

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    return res.end();
  }

  const { firstName, lastName, email, password, role } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    ['patient', 'doctor'].indexOf(role) == -1
  ) {
    res.status(400);
    res.json({
      message: 'Missing required fields',
    });
    return res.end();
  }

  if ((await User.findOne({ email }).count()) > 0) {
    res.status(400);
    res.json({
      message: 'Email already exists',
    });
    return res.end();
  }

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: createHash(password),
    role,
  });

  try {
    await newUser.save();
  } catch (error) {
    res.status(500);
    res.json({
      message: 'Internal server error',
    });
    return res.end();
  }

  res.status(201);
  res.end();
};

export default connect(signup);
