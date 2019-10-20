const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

function rewireWebpackBundleAnalyzer(config, env, options = {}) {
  config.plugins = (config.plugins || []).concat([
    new BundleAnalyzerPlugin(options),
  ]);

  return config;
}

module.exports = rewireWebpackBundleAnalyzer;
