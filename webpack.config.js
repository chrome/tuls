const webpack = require('webpack')
const path = require('path')

const isTest = process.env.NODE_ENV == 'test'
const isProduction = process.env.NODE_ENV == 'production'

module.exports = {
  entry: {
    'tuls': './src/index'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  },

  devtool: isProduction ? 'source-map' : 'inline-source-map',

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  output: {
    libraryTarget: 'amd',
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].js'
  },

  externals: isTest ? {} : {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },

  }
}
