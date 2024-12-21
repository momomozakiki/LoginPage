const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // Entry point for the application
  entry: './src/js/index.js', // Main JS file for Webpack to bundle

  // Output configuration
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory for bundled files
    filename: 'js/bundle.js', // Name of the bundled JavaScript file
    clean: true, // Cleans the output directory before each build
  },

  // Module rules for processing different file types
  module: {
    rules: [
      {
        test: /\.js$/, // Matches JavaScript files
        exclude: /node_modules/, // Exclude files in the node_modules directory
        use: {
          loader: 'babel-loader', // Transpiles ES6+ JavaScript to ES5 for browser compatibility
          options: {
            presets: ['@babel/preset-env'], // Babel preset for modern JavaScript
          },
        },
      },
      {
        test: /\.(scss|css)$/, // Matches SCSS and CSS files
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files
          'css-loader', // Resolves CSS imports in JS
          {
            loader: 'postcss-loader', // Applies PostCSS plugins like autoprefixer and cssnano
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer'), // Adds vendor prefixes for CSS compatibility
                  require('cssnano')({ preset: 'default' }), // Minifies CSS for production
                ],
              },
            },
          },
          'sass-loader', // Compiles SCSS into CSS
        ],
      },
    ],
  },

  // Optimization settings
  optimization: {
    minimize: true, // Enables code minification
    minimizer: [new TerserPlugin()], // Minifies JavaScript files
  },

  // Source map generation for easier debugging
  devtool: 'source-map',

  // Development server configuration
  devServer: {
    static: path.resolve(__dirname, 'dist'), // Serve static files from the dist folder
    compress: true, // Enable gzip compression for faster load times
    port: 9000, // Specify the port to run the server
    open: true, // Automatically open the browser on server start
  },

  // Plugins for additional functionality
  plugins: [
    // Plugin to extract CSS into separate files
    new MiniCssExtractPlugin({
      filename: 'css/styles.css', // Output CSS file name
    }),

    // Plugin to handle HTML file generation
    new HtmlWebpackPlugin({
      template: './src/index.html', // Template HTML file
      filename: 'index.html', // Output HTML file
      minify: {
        removeComments: true, // Remove comments from the HTML
        collapseWhitespace: true, // Collapse whitespace for a smaller file
        minifyJS: true, // Minify inline JavaScript
        minifyCSS: true, // Minify inline CSS
      },
    }),
  ],
};
