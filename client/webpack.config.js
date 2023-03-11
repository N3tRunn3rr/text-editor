const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new   HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            title: 'JATE',
        }), 

        new InjectManifest({
            swSrc: './src-sw.js',
            swDest: 'sw.js',
        }),

        new WebpackPwaManifest({
            name: 'Just Another Text Editor',
            short_name: 'JATE',
            description: 'An application that allows you to edit text files online and offline.',
            background_color: '#01579b',
            theme_color: '#ffffff',
            'theme-color': '#ffffff',
            start_url: '/',
            public_path: '/',
            display: 'standalone',
            fingerprints: false,
            inject: true,
            icons: [
                {
                    src: path.resolve('src/images/icons/icon-192x192.png'),
                    sizes: [96, 128, 192, 256, 384, 512],
                    destination: path.join('assets', 'icons'),
                },
              ]})
            ],


    // TODO: Add CSS loaders and babel to webpack.
    module: {
      rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
