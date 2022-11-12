import { IncomingForm } from 'formidable';
import type { NextApiRequest } from 'next';

export default async function getFormData(req: NextApiRequest) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      return resolve({ fields, files });
    });
  });
}
