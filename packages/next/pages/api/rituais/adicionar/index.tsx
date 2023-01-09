import { NextApiRequest, NextApiResponse } from 'next';
import firebase from '@ct-ordo-realitas/app/firebase/serverApp';
import imgbbUploader from 'imgbb-uploader';
import getFormData from '../../../../lib/getFormData';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      fields: { image, ritual },
    }: any = await getFormData(req);
    const getBase64 = () => image.split(',')[1];

    if (typeof req.cookies.session !== 'string') {
      return res.status(401).json({ message: 'unauthorized' });
    }

    if (!await firebase.isUserAdmin(req.cookies.session)) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const response = await imgbbUploader({
      base64string: getBase64(),
      apiKey: process.env.IMGBB_API_KEY,
    });
    await firebase.setRitual({ ...JSON.parse(ritual), imagePath: response.display_url });

    return res.json({ message: 'upload successful' });
  }
  return res.status(405).json({ message: 'this method is not allowed' });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
