// Learn more https://docs.expo.dev/guides/monorepos
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Find the project and workspace directories
const projectRoot = __dirname;
// This can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(projectRoot, '../..');

// const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
// config.watchFolders = [workspaceRoot];
// 2. Let Metro know where to resolve packages and in what order
// config.resolver.nodeModulesPaths = [
//   path.resolve(projectRoot, 'node_modules'),
//   path.resolve(workspaceRoot, 'node_modules'),
// ];
// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
// config.resolver.disableHierarchicalLookup = true;

// sass
// config.transformer.babelTransformerPath = require.resolve('./transformer.js');

// config.resolver.assetExts = [config.assetExts.filter((ext) => ext !== 'svg' && ext !== 'scss')];

// config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg', 'scss', 'sass'];

// module.exports = config;
module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig(projectRoot);
  return {
    transformer: {
      babelTransformerPath: require.resolve('./transformer.js'),
    },
    watchFolders: [workspaceRoot],
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
    disableHierarchicalLookup: true,
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== 'svg' && ext !== 'scss'),
      sourceExts: [...sourceExts, 'svg', 'scss', 'sass'],
    },
  };
})();
