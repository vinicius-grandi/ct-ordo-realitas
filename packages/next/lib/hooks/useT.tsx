import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const useT = () => {
  const { locale } = useRouter();
  console.log(locale);
  const { t: earlyT } = useTranslation('');
  const t = (key: string) => earlyT(`${locale}.translations.${key}`);
  return t;
};

export default useT;
