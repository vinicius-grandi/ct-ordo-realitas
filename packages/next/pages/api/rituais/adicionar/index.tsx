import { NextApiRequest, NextApiResponse } from 'next';
import api from '@ct-ordo-realitas/app/firebase/serverApp';
import imgbbUploader from 'imgbb-uploader';
import getFormData from '../../../../lib/getFormData';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (typeof req.cookies.session !== 'string') {
    return res.status(401);
  }
  const isUserAdmin = await api.auth(req.cookies.session);
  if (!isUserAdmin) {
    return res.status(401);
  }
  const {
    fields: { image, ritual },
  }: any = await getFormData(req);
  async function getBase64fromImage() {
    const result = image.split(',')[1];
    return result;
  }
  if (req.method === 'POST') {
    try {
      const response = await imgbbUploader({
        base64string: await getBase64fromImage(),
        apiKey: process.env.IMGBB_API_KEY,
      });
      await api.setRitual({ ...JSON.parse(ritual), imagePath: response.display_url });
      return res.json({ message: 'upload succesful' });
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
