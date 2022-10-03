// Learn more https://docs.expo.dev/guides/monorepos
const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);
config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];
config.resolver.disableHierarchicalLookup = true;

const config1 = async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig(projectRoot);
  return {
    transformer: {
      babelTransformerPath: require.resolve('./transformer.js'),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== 'svg' && ext !== 'scss'),
      sourceExts: [...sourceExts, 'svg', 'scss', 'sass'],
    },
  };
};

module.exports = (async () => mergeConfig(config, await config1()))();
