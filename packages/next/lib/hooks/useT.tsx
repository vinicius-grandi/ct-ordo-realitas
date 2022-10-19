/* eslint-disable @typescript-eslint/comma-dangle */
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const useT = () => {
  const { locale } = useRouter();
  const { t: earlyT } = useTranslation();
  const t = <T extends string | string[]>(key: string, shouldReturnObj = false) => earlyT<string, T>(`${locale}.translations.${key}`, {
    returnObjects: shouldReturnObj
  });
  return t;
};

export default useT;
