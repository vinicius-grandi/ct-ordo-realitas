// For React Native version 0.59 or later
const upstreamTransformer = require('metro-react-native-babel-transformer');
const magicImporter = require('node-sass-magic-importer');
const path = require('path');
const sassTransformer = require('react-native-sass-transformer');
const svgTransformer = require('react-native-svg-transformer');
const workspaceRoot = path.resolve(
  __dirname,
  '../..',
  'node_modules',
  '@ct-ordo-realitas',
  'next',
  'styles'
);

const magicOptions = {
  // Defines the path in which your node_modules directory is found.
  cwd: workspaceRoot,
  // Define the package.json keys and in which order to search for them.
  packageKeys: [
    'sass',
    'scss',
    'style',
    'css',
    'main.sass',
    'main.scss',
    'main.style',
    'main.css',
    'main',
  ],
  // You can set the special character for indicating a module resolution.
  packagePrefix: '~',
  // Disable console warnings.
  disableWarnings: false,
  // Disable importing files only once.
  disableImportOnce: false,
  // Add custom node filters.
  customFilters: undefined,
};

// For React Native version 0.56-0.58
// var upstreamTransformer = require("metro/src/reactNativeTransformer");

// For React Native version 0.52-0.55
// var upstreamTransformer = require("metro/src/transformer");

// For React Native version 0.47-0.51
// var upstreamTransformer = require("metro-bundler/src/transformer");

// For React Native version 0.46
// var upstreamTransformer = require("metro-bundler/build/transformer");

module.exports.transform = function ({ src, filename, options }) {
  if (filename.endsWith('.scss') || filename.endsWith('.sass')) {
    const opts = Object.assign(options, {
      sassOptions: {
        functions: {
          'rem($px)': (px) => {
            px.setValue(px.getValue() / 16);
            px.setUnit('rem');
            return px;
          },
        },
        importer: magicImporter(magicOptions),
      },
    });

    return sassTransformer.transform({ src, filename, options: opts });
  } else if (filename.endsWith('.svg')) {
    return svgTransformer.transform({ src, filename, options });
  } else {
    return upstreamTransformer.transform({ src, filename, options });
  }
};
