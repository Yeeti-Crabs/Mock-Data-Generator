const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './client/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build')
  },
  plugins: [ new HtmlWebpackPlugin({ template: './client/index.html' })],
  mode: process.env.NODE_ENV,
  devServer: {
    historyApiFallback: true,
    static: {
        directory: path.resolve(__dirname, './client'),
        publicPath: '/'
    },
    port: 8080,
    compress: true,
    proxy: {
        '/api': 'http://localhost:3000/',
    }
  }, 
  module: {
    rules: [
        {
            test: /\.jsx?/,
            exclude: /(node_modules)/,
            use: [
                {
                  loader: 'babel-loader',
                  options: {
                      presets: [
                          '@babel/preset-env',
                          '@babel/preset-react'
                      ]
                  }
                }
            ]
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /(node_modules)/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
      }
    ]
  }
};