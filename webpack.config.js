const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // Entry point for the application
  mode: process.env.NODE_ENV || 'development', // Dynamic mode for flexibility
  entry: './src/js/index.js', // Main JS file for Webpack to bundle

  // Output configuration
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory for bundled files
    filename: 'js/bundle.js', // Name of the bundled JavaScript file
    clean: process.env.NODE_ENV === 'production', // Clean only in production builds
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
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer'), // Adds vendor prefixes for CSS compatibility
                  process.env.NODE_ENV === 'production' && require('cssnano')({ preset: 'default' }), // Minify CSS only in production
                ].filter(Boolean), // Filter out falsey values
              },
            },
          },
          'sass-loader', // Compiles SCSS into CSS
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i, // Image handling with hashing in production
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'assets/images/', // Output path for images
            },
          },
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
    static: path.resolve(__dirname, 'public'), // Serve static files from the public folder
    compress: true, // Enable gzip compression for faster load times
    port: 9000, // Specify the port to run the server
    open: true, // Automatically open the browser on server start
  },

  // Plugins for additional functionality
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/styles.css', // Output CSS file name
    }),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: process.env.NODE_ENV === 'production' ? {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
      } : false, // Disable minification in development
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/assets', to: 'assets' }, // Copy assets
      ],
    }),
  ],
};
