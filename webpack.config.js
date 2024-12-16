const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',  // Adjust the entry point to your main JS file
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devtool: 'source-map',  // This will generate a source map for easier debugging

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),  // Directory to serve static files from
    compress: true,  // Enable gzip compression
    port: 9000,  // You can change the port to any other port you prefer
    open: true,  // Automatically open the browser when the dev server starts
  },
};
