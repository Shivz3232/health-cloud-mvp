import { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';
import Record from '../../../models/record';
import connect from '../../../utils/middleware/mongoClient';
import multer from 'multer';
import nextConnect from 'next-connect';
import UploadImage from '../../../utils/Imagekit';

const multerUpload = multer();
const uploadMiddleWare = multerUpload.single('document');

export interface FileI {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

interface MulterRequest extends NextApiRequest {
  file: FileI;
}

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(uploadMiddleWare);

apiRoute.post(async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401);
    res.json({
      message: 'User session not found',
    });
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

  if (!sessionId || sessionId == 'undefined' || sessionId.length != 24) {
    res.status(400);
    res.json({
      message: 'Invalid sessionId',
    });
    return res.end();
  }

  const description =
    typeof req.body.description == 'string' &&
    req.body.description.trim().length > 0
      ? req.body.description.trim()
      : false;

  const document = (req as MulterRequest).file;

  const imageKitRes = await UploadImage(document)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
      return;
    });

  if (!imageKitRes) {
    res.status(500);
    res.json({
      message: 'Error uploading image',
    });
    return res.end();
  }

  const recordDoc = new Record({
    sessionId,
    description,
    fileUrl: imageKitRes.url,
  });

  await recordDoc.save();

  res.end();
});

export default connect(apiRoute);

export const config = {
  api: {
    bodyParser: false,
  },
};
