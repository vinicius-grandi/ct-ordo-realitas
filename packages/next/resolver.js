// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// Taken from
// https://github.com/microsoft/accessibility-insights-web/pull/5421#issuecomment-1109168149

module.exports = (path, options) => {
  const firebaseRegex = /^@?firebase/;

  // Call the defaultResolver, so we leverage its cache, error handling, etc.
  return options.defaultResolver(path, {
      ...options,
      // Use packageFilter to process parsed `package.json` before the resolution (see https://www.npmjs.com/package/resolve#resolveid-opts-cb)
      packageFilter: (pkg) => {
          if (firebaseRegex.test(pkg.name)) {
              delete pkg.exports;
              delete pkg.module;
              delete pkg.browser;
          }

          return pkg;
      },
  });
};
