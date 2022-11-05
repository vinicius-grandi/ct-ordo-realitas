import { NextApiRequest, NextApiResponse } from 'next';
import imgbbUploader from 'imgbb-uploader';
import { IncomingForm } from 'formidable';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  async function getBase64fromImage() {
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm();

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        return resolve({ fields, files });
      });
    });
    const { fields: { image } }: any = await data;
    return image.slice(22);
  }

  if (req.method === 'POST') {
    const response = await imgbbUploader({
      base64string: await getBase64fromImage(),
      apiKey: process.env.IMGBB_API_KEY,
    });
    console.log(response);
    return res.json({ message: 'ok' });
  }
  return res.status(405);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
