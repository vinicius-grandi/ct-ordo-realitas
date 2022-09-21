// For React Native version 0.59 or later
var upstreamTransformer = require("metro-react-native-babel-transformer");
const path = require('path');

// For React Native version 0.56-0.58
// var upstreamTransformer = require("metro/src/reactNativeTransformer");

// For React Native version 0.52-0.55
// var upstreamTransformer = require("metro/src/transformer");

// For React Native version 0.47-0.51
// var upstreamTransformer = require("metro-bundler/src/transformer");

// For React Native version 0.46
// var upstreamTransformer = require("metro-bundler/build/transformer");

var sassTransformer = require("react-native-sass-transformer");

module.exports.transform = function({ src, filename, options }) {
  if (filename.endsWith(".scss") || filename.endsWith(".sass")) {
    /**@type { { sassOptions: import('sass/types/options').Options } } */
    const sassOptions = {
      sassOptions: {
        loadPaths: [
          'node_modules',
          'node_modules/@ct-ordo-realitas/next'
        ],
        importers: [{
          // An importer that redirects relative URLs starting with "~" to
          // `node_modules`.
          findFileUrl(url) {
            if (!url.startsWith('~')) return null;
            return new URL(url.substring(1), pathToFileURL('node_modules'));
          }
        }]
      }
    };
    var opts = Object.assign(options, sassOptions);
    return sassTransformer.transform({ src, filename, options: opts });
  } else {
    return upstreamTransformer.transform({ src, filename, options });
  }
};
