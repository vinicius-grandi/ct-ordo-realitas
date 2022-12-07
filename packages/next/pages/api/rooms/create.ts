import { NextApiRequest, NextApiResponse } from 'next';
import createRoom from '@ct-ordo-realitas/app/firebase/jogos/salas/createRoom';
import serverApp from '@ct-ordo-realitas/app/firebase/serverApp';
import getFormData from '../../../lib/getFormData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (!req.cookies.session) {
      return res.status(401).json({
        message: 'unauthorized',
      });
    }
    const {
      fields: { name, gameType, playerName },
    }: any = await getFormData(req);

    const { uid } = await serverApp.getUser(req.cookies.session);

    const result = await createRoom({
      gameType,
      name,
      playerName,
      host: uid,
    });

    return res.json({
      message: result.message,
    });
  }
  return res.status(405).json({ message: 'this method is not allowed' });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
