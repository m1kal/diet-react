var path = require('path');
var webpack = require('webpack');

module.exports = {
 entry: './jsx/index.js',
 output: {path: __dirname + '/public/js/', filename: 'bundle.js'},
 module: {
  loaders:
  [   {
       test: /.jsx?$/,
       exclude: /node_modules/,
       loader: 'babel-loader'
     }
 ]
 },
 plugins: [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin()
 ]
};
