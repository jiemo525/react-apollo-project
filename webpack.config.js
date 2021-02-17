const path = require("path");

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [{
      test: /\.js?$/,
      loader: "babel-loader",
      exclude: /node_module/
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, 'index.html'),
    port: '8080',
    open: true,
    inline: true,
    historyApiFallback: true,
  }
}