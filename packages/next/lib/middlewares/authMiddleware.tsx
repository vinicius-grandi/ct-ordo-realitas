import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default async function authMiddleware(req: any) {
  function getLocale(): string {
    const nextSymbolKeys = Object.getOwnPropertySymbols(req);
    const nextInitUrlSymbol = nextSymbolKeys[nextSymbolKeys.length - 1];
    // eslint-disable-next-line no-underscore-dangle
    const [firstPath] = req[nextInitUrlSymbol].__NEXT_INIT_URL.match(/(?<=\/)[a-z]{2}(?=\/)/) ?? [''];
    const locale = firstPath.length > 2 || firstPath.length < 1 ? 'pt' : firstPath;
    return locale;
  }

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
  const props = { ...(await serverSideTranslations(getLocale(), ['common'])) };
  return {
    props,
  };
}
