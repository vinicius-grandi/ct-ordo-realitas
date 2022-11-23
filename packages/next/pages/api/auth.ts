import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.json({
      auth: 'session' in req.cookies,
    });
  }
  return res.status(405).json({ message: 'not supported method' });
}
