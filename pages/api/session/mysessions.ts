import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../utils/middleware/mongoClient';
import Session from '../../../models/session';
import { getSession } from 'next-auth/react';

const GetMySessions = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'GET') {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    return res.end();
  }

  const session = await getSession({ req });

  if (!session) {
    res.status(401);
    return res.end();
  }

  const userId = session.user._id;

  const sessionDocs = await Session.find({ doctorId: userId }, '-__v')
    .populate('patientId', 'firstName lastName')
    .sort('createdAt')
    .sort('updatedAt');

  res.json({
    sessions: sessionDocs,
  });
  res.end();
};

export default connect(GetMySessions);
