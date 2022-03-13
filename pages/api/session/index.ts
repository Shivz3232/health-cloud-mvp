import { NextApiResponse, NextApiRequest } from 'next';
import Session from '../../../models/session';
import Record from '../../../models/record';
import { getSession } from 'next-auth/react';
import connect from '../../../utils/middleware/mongoClient';

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

  const recordDocs = await Record.find({ sessionId: sessionId }, '-__v');

  res.json({
    sessionData: sessionDoc,
    sessionRecords: recordDocs,
  });
  res.end();
};

export default connect(GetSession);
