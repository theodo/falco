const rewireStyledComponents = require('react-app-rewire-styled-components');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
  webpack: function override(config, env) {
    const analyzeBundle = process.argv.indexOf('--analyze-bundle') !== -1;
    config = rewireStyledComponents(config, env);

    if (analyzeBundle) {
      const rewireWebpackBundleAnalyzer = require('react-app-rewire-webpack-bundle-analyzer');
      config = rewireWebpackBundleAnalyzer(config, env, {
        analyzerMode: 'static',
        reportFilename: 'report.html',
      });
    }

    // We generate a manifest with all of Webpack's output files. It contains
    // the path to the file and an isInitial boolean.
    // We use this boolean later to only inject the initial chunks into the
    // app's HTML.
    config.plugins.push(
      new WebpackManifestPlugin({
        fileName: 'static-manifest.json', // manifest.json was already taken (PWA)
        publicPath: '',
        generate: (seed, files) =>
          files.reduce(
            (manifest, { name, path, isInitial }) => ({
              ...manifest,
              [name]: { path, isInitial },
            }),
            seed,
          ),
      }),
    );

    switch (env) {
      case 'development':
        config.output.publicPath = 'http://localhost:3000/';
        break;
      case 'production':
        config.output.publicPath = '/static/front/';
        break;
      default:
        break;
    }

    return config;
  },
  devServer: function(configFunction) {
    // Return the replacement function for create-react-app to use to generate the Webpack
    // Development Server config. "configFunction" is the function that would normally have
    // been used to generate the Webpack Development server config - you can use it to create
    // a starting configuration to then modify instead of having to create a config from scratch.
    return function(proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const defaultConfig = configFunction(proxy, allowedHost);
      return {
        ...defaultConfig,
        hot: true,
        historyApiFallback: true,
        // If serving the React bundle through Django (ie localhost:8000),
        // the devServer refuses to serve hot updates because of CORS.
        // The headers below fix that
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:8000',
        },
      };
    };
  },
};
