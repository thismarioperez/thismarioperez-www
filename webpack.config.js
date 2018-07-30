const path = require('path');
const root = path.resolve(__dirname);
const source = path.join(root, 'source');
const nodeModules = 'node_modules';
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const IS_DEV = process.env.NODE_ENV === 'development';
const browsers = ['last 2 versions', 'ios >= 10'];
const CleanUpStatsPlugin = require('./webpack.cleanup-stats-plugin');

module.exports = {
  mode : process.env.NODE_ENV,
  devtool: IS_DEV ? 'inline-cheap-source-map' : false,
  optimization: {
    minimize: IS_DEV ? false : true
  },
  plugins: [
    // Give the app scripts access to node environment variable.
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),

    new CleanUpStatsPlugin(),

    new MiniCssExtractPlugin({
      filename: '../css/[name].css'
    }),

    new BabiliPlugin({
      mangle: { blacklist: ['_'] } // don't mangle lodash
    },
    {
      sourceMap: IS_DEV ? true : false, // must be enabled here for devtool inline-source-map to work.
      compress: IS_DEV ? false : true,
    })
  ],

  stats: {
    colors: true,
    modules: true,
    exclude: /node_modules/
  },

  resolve: {
    modules: [root, source, nodeModules],
    mainFields: ['webpack', 'browserify', 'web', 'hobo', 'main']
  },

  entry: {
    app: path.resolve( __dirname, 'source/js/app.js' ),
  },

  output: {
    path: path.resolve( __dirname, '_site', 'assets', 'js' ),
    filename: '[name].js',
  },

  module: {
    rules: [
      // JS Linter
      { test: /source\/js\/.*\.js$/,
        exclude: /node_modules/,
        use: ['eslint-loader'],
        enforce: 'pre'
      },

      // Handle JS files
      { test: /source\/js\/.*\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader',
            options: {
              presets: [
                ['env', {
                  'targets': {
                    'browsers': browsers
                  },
                  'debug': IS_DEV ? true : false
                }]
              ],
              plugins: [require('babel-plugin-transform-runtime')]
            }
          }
        ]
      },

      // Expose custom properjs-hobo build
      { test: /(hobo|hobo.build)\.js$/, use: ['expose-loader?hobo'] },

      // Handle Sass files
      { test: /\.(css|scss)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              minimize: IS_DEV ? false : true,
              sourceMap: IS_DEV ? true : false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')({ browsers: browsers })],
              options: {
                sourceMap: IS_DEV ? true : false
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: IS_DEV ? true : false
            }
          }
        ]
      }
    ]
  }
};