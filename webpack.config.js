const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('extract-css-chunks-webpack-plugin');

module.exports = (env, options) => {
  let config = {
    mode: 'development',
    entry: {
      app: path.resolve(__dirname, './src/index.js'),
    },
    output: {
      path: path.resolve(__dirname, 'dist/nuguya/resources/'),
      filename: '[name].js',
      chunkFilename: '[name]-chunk.js',
      publicPath: '/nuguya/resources/',
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist/nuguya/resources/'),
      port: 9000,
      watchContentBase: true,
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(html)$/,
          include: path.join(__dirname, 'src/'),
          use: [
            {
              loader: 'html-loader',
              options: {
                interpolate: true,
                removeComments: true,
                collapseWhitespace: true
              },
            },
          ]
        },
        {
          test: /\.js$/,
          exclude: __dirname + 'node_modules',
          use: {
            loader: 'babel-loader',
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hot: true,
                reloadAll: true, // fallback reload
              },
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('autoprefixer')({ ...options })
                ]
              }
            },
            'sass-loader',
          ],
        },
        {
          test: /\.png$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'home.html',
        template: './src/home.html',
      }),
      new HtmlWebpackPlugin({
        filename: 'detail.html',
        template: './src/detail.html',
      }),
      new HtmlWebpackPlugin({
        filename: 'result.html',
        template: './src/result.html',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
    optimization: {},
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.json', '.jsx', '.css'],
    },
  };

  return config;
};
