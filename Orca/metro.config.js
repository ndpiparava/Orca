const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const projectRoot = __dirname;

const config = {
  resolver: {
    extraNodeModules: {
      '@Orca': path.resolve(projectRoot, 'src'),
      '@e2e': path.resolve(projectRoot, 'e2e'),
    },
  },
  watchFolders: [
    path.resolve(projectRoot, 'src'),
    path.resolve(projectRoot, 'e2e'),
  ],
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
