import { NextApiRequest } from 'next';

export default function handler(req: NextApiRequest) {
  return {
    auth: 'session' in req,
  };
}
