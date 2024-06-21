const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  externalsType: 'script',
  externals: {
    ymaps3: [
      'https://api-maps.yandex.ru/v3/?apikey=ce1ed5b3-c3a8-43cc-a92e-8247fe5ac5c6&lang=ru_RU',
      'ymaps3',
    ],
  },
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.module\.css$/i,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        exclude: /\.(svg|png)$/i,
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
        },
        generator: [
          {
            type: 'asset',
            implementation: ImageMinimizerPlugin.sharpGenerate,
            options: {
              encodeOptions: {
                webp: {
                  quality: 75,
                },
              },
            },
          },
        ],
      }),
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Coin.',
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/assets/img',
          to: 'img',
          globOptions: {
            ignore: ['**/svg/**'],
          },
        },
      ],
    }),
    new SVGSpritemapPlugin('src/assets/img/icons/**/*.svg', {
      output: {
        filename: 'img/icons.svg',
      },
      sprite: {
        prefix: 'icon-',
      },
    }),
    new Dotenv(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
    open: true,
    historyApiFallback: true,
  },
};
