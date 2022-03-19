import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import Session from '../../../models/session';
import connect from '../../../utils/middleware/mongoClient';

const EndSession = async (req: NextApiRequest, res: NextApiResponse) => {
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
      message: 'Only doctors can start sessions',
    });
    return res.end();
  }

  const sessionId = req.body.sessionId;

  const sessionDoc = await Session.findById(sessionId);

  if (!sessionDoc) {
    res.status(404);
    res.json({
      message: 'Session not found',
    });
    return res.end();
  }

  if (sessionDoc.doctorId.toString() != session.user._id) {
    res.status(403);
    res.json({
      message: 'You are not the doctor of this session',
    });
    return res.end();
  }

  sessionDoc.active = false;

  await sessionDoc.save();

  res.end();
};

export default connect(EndSession);
