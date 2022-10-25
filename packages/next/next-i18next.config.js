const path = require('path');
const rootDir = path.dirname(require.resolve('@ct-ordo-realitas/app/package.json'));
const dir = path.join(rootDir, 'translate', 'languages');

module.exports = {
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
  },
  localePath: dir,
};
