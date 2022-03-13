import { NextApiResponse, NextApiRequest } from 'next';
import Session from '../../../models/session';
import { getSession } from 'next-auth/react';

const GetSession = async (req: NextApiRequest, res: NextApiResponse) => {
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

  const { sessionId } = req.query;

  if (!sessionId) {
    res.status(400);
    res.json({
      message: 'Missing sessionId',
    });
    return res.end();
  }

  const sessionDoc = await Session.findById(sessionId, '-__v').populate(
    'patientId',
    'firstName lastName'
  );

  res.json({
    sessionData: sessionDoc,
  });
  res.end();
};

export default GetSession;
