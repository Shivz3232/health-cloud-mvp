import { NextApiResponse, NextApiRequest } from 'next';
import Permit from '../../models/permit';
import { getSession } from 'next-auth/react';
import geneartePermitCode from '../../utils/generatePermitCode';

const NewPermit = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401);
    return res.end();
  }

  if (session.user.role != 'patient') {
    res.status(403);
    res.json({
      message: 'Only patients can issue permits',
    });
    return res.end();
  }

  if (req.method != 'POST') {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    return res.end();
  }

  const permitDoc = new Permit({
    code: geneartePermitCode(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 5), // 5 minutes,
    userId: session.user._id,
  });

  await permitDoc.save();

  res.json({
    code: permitDoc.code,
    expiresAt: permitDoc.expiresAt,
  });

  res.end();
};

export default NewPermit;
