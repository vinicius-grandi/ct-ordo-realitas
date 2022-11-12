import { NextApiRequest } from 'next';

export default async function getFormData(req: NextApiRequest) {
  return new Promise((resolve, reject) => {
    if (req.cookies.error) {
      reject(Error('fake errorr'));
    }
    resolve({
      fields: { image: '', ritual: '{"name": "a", "type": "fear"}' },
    });
  });
}
