import { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';
import Record from '../../../models/record';
import connect from '../../../utils/middleware/mongoClient';

const RecordApi = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'POST') {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    return res.end();
  }

  const session = await getSession({ req });

  if (!session) {
    res.status(401);
    return res.end();
  }

  if (session.user.role != 'doctor') {
    res.status(403);
    res.json({
      message: 'Only doctors can create records',
    });
    return res.end();
  }

  const { sessionId } = req.query;

  if (!sessionId || sessionId == 'undefined') {
    res.status(400);
    res.json({
      message: 'Invalid sessionId',
    });
    return res.end();
  }

  const description = req.body.description;

  const recordDoc = new Record({
    sessionId,
    description,
  });

  await recordDoc.save();

  res.end();
};

export default connect(RecordApi);
