import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { i18n } from 'next-i18next';

async function getStaticProps({ locale }: any) {
  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources();
  }
  const props = { ...(await serverSideTranslations(locale, ['common'])) };
  return {
    props,
  };
}

export default getStaticProps;
