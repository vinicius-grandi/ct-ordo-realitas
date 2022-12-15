import { NextApiRequest, NextApiResponse } from 'next';
import firebaseAdmin from '@ct-ordo-realitas/app/firebase/serverApp';
import getFormData from '../../lib/getFormData';
import { csrf } from '../../lib/csrf';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      fields: { idToken: idT },
    }: any = await getFormData(req);
    if (!idT) {
      return res.status(400).json({ message: 'bad request' });
    }
    const idToken: string = idT.toString();
    const sessionCookie = await firebaseAdmin.createSessionCookie(idToken);
    res.setHeader(
      'Set-Cookie',
      `session=${sessionCookie}; Path=/; ${
        process.env.NODE_ENV === 'production' ? 'Secure;' : ''
      } HttpOnly;`,
    );
    return res.end(JSON.stringify({ message: 'success' }));
  }
  return res.status(405).json({ message: 'this method is not allowed' });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default csrf(handler);
