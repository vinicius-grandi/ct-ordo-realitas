import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { i18n } from 'next-i18next';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources();
  }
  const props = { ...(await serverSideTranslations(locale ?? 'pt', ['common'])) };
  return {
    props,
  };
};

export default getStaticProps;
