import { NextApiRequest, NextApiResponse } from 'next';
import imgbbUploader from 'imgbb-uploader';
import getFormData from '../../../../lib/getFormData';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.cookies.session);
  async function getBase64fromImage() {
    const {
      fields: { image },
    }: any = await getFormData(req);
    const result = image.split(',')[1];
    return result;
  }

  if (req.method === 'POST') {
    try {
      const response = await imgbbUploader({
        base64string: await getBase64fromImage(),
        apiKey: process.env.IMGBB_API_KEY,
      });
      return res.json({ imagePath: response.display_url });
    } catch (error) {
      console.error(error);
      return res.status(500);
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
