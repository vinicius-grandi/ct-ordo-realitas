import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default async function authMiddleware(req: any) {
  if (req.cookies.session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources();
  }
  const props = { ...(await serverSideTranslations(req.locale ?? 'pt', ['common'])) };
  return {
    props,
  };
}
