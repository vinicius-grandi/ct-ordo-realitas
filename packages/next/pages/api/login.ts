import { NextApiRequest, NextApiResponse } from 'next';
import firebaseAdmin from '@ct-ordo-realitas/app/firebase/serverApp';
import getFormData from '../../lib/getFormData';
import { csrf } from '../../lib/csrf';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const {
        fields: { idToken: idT },
      }: any = await getFormData(req);
      const idToken: string = idT.toString();
      const sessionCookie = await firebaseAdmin.createSessionCookie(idToken);
      res.setHeader(
        'Set-Cookie',
        `session=${sessionCookie}; Path=/; SameSite=lax; ${
          process.env.NODE_ENV === 'production' ? 'Secure;' : ''
        } HttpOnly;`,
      );
      return res.end(JSON.stringify({ status: 'success' }));
    } catch (error) {
      console.log(error);
      return res.status(400);
    }
  }
  return res.status(405);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default csrf(handler);
