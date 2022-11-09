import { NextApiRequest, NextApiResponse } from 'next';
import initConfigAdmin from '@ct-ordo-realitas/app/firebase/initConfigAdmin';
import firebaseAdmin from '@ct-ordo-realitas/app/firebase/serverApp';
import getFormData from '../../lib/getFormData';

initConfigAdmin();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const {
        fields: { idToken: idT, csrfToken: csrfT },
      }: any = await getFormData(req);
      const idToken: string = idT.toString();
      const csrfToken: string = csrfT.toString();
      // if (csrfToken !== req.cookies.csrfToken) {
      //   res.status(401).send('UNAUTHORIZED REQUEST!');
      //   return res.status(401);
      // }
      const sessionCookie = await firebaseAdmin.createSessionCookie(idToken);
      res.setHeader(
        'Set-Cookie',
        `session=${sessionCookie}; Path=/; SameSite=lax; Secure; HttpOnly;`,
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

export default handler;
