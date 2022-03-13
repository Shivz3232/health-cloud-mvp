import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import Permit from '../../../models/permit';
import Session from '../../../models/session';

const CreateSession = async (req: NextApiRequest, res: NextApiResponse) => {
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

  const code = req.body.code;

  const permit = await Permit.findOne({ code });

  if (!permit) {
    res.status(404);
    res.json({
      message: 'Permit not found',
    });
    return res.end();
  }

  if (Date.now() > permit.expiresAt || permit.status == 'used') {
    res.status(400);
    res.json({
      message: 'Invalid permit',
    });
    return res.end();
  }

  const sessionDoc = new Session({
    doctorId: session.user._id,
    patientId: permit.userId,
  });

  await sessionDoc.save();

  permit.status = 'used';
  await permit.save();

  res.status(200);
  res.json({
    session: {
      id: sessionDoc._id,
    },
  });
  res.end();
};

export default CreateSession;
