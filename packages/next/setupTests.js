require('@testing-library/jest-dom/extend-expect');
const nextRouter = require('next/router');

nextRouter.useRouter = jest.fn().mockImplementation(() => ({ locale: 'pt' }));

jest.createMockFromModule('react')

export const t = (key, params) => {
  if (params.returnObjects) {
    return [];
  }
  return key;
};

jest.mock('next-i18next', () => {
  return {
    useTranslation: () => {
      return {
        t,
        i18n: {
          language: 'pt',
          changeLanguage: jest.fn().mockImplementation((lang) => console.log(lang)),
        },
      };
    },
    withTranslation: () => (Component) => {
      Component.defaultProps = { ...Component.defaultProps, t };
      return Component;
    },
  };
});
