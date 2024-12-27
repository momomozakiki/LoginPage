/*********************************************************
 * Explanation:
 * 1. JS Output in dist/js/[name].[contenthash:8].js
 *    Example: index.js -> dist/js/index.abc12345.js
 * 2. CSS Output in dist/css/[name].[contenthash:8].css
 *    Example: styles.scss -> dist/css/styles.abc12345.css
 * 3. Images in dist/assets/images/[name].[contenthash:8][ext]
 *    Example: logo.png -> dist/assets/images/logo.abc12345.png
 * 4. CopyWebpackPlugin used only for copying non-imported files
 *    or entire static folders from src/assets to dist/assets,
 *    preserving subfolder structure. It’s optional if you have
 *    assets that are never imported in JS/CSS but still need
 *    to be in dist.
 *********************************************************/

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    // Choose 'development' or 'production'
    mode: isProduction ? 'production' : 'development',

    // Entry point for JS bundling
    entry: './src/js/index.js',

    // Output configuration
    output: {
      path: path.resolve(__dirname, 'dist'),
      // Keep each original [name], but append an 8-char content hash for caching
      filename: isProduction
        ? 'js/[name].[contenthash:8].js'
        : 'js/[name].js',
      clean: true, // Clean dist/ before each build
      // We handle images and fonts via rules below, so no default assetModuleFilename is necessary
    },

    // Generate source maps: 'source-map' in dev, none in prod (optional)
    devtool: isProduction ? false : 'source-map',

    module: {
      rules: [
        /**********************
         * JavaScript / Babel *
         **********************/
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            // If needed, configure .babelrc or babel.config.js
          },
        },

        /**********************
         * CSS / SCSS / PostCSS
         **********************/
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader, // Extracts CSS into separate files
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProduction,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: !isProduction,
                postcssOptions: {
                  plugins: [
                    require('autoprefixer'),
                    // Only minify CSS in production
                    isProduction && require('cssnano')({ preset: 'default' }),
                  ].filter(Boolean),
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProduction,
              },
            },
          ],
        },

        /********************************
         * Images: asset/resource module
         ********************************/
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
          generator: {
            // Keep each original [name], append an 8-char content hash
            // preserve extension with [ext]
            filename: 'assets/images/[name].[contenthash:8][ext]',
          },
        },

        /********************************
         * (Optional) Additional rules for fonts
         * if you have fonts in src/assets/fonts
         ********************************/
        // {
        //   test: /\.(woff(2)?|eot|ttf|otf)$/,
        //   type: 'asset/resource',
        //   generator: {
        //     filename: 'assets/fonts/[name].[contenthash:8][ext]',
        //   },
        // },
      ],
    },

    plugins: [
      // Extract CSS into dist/css/ with contenthash
      new MiniCssExtractPlugin({
        filename: isProduction
          ? 'css/[name].[contenthash:8].css'
          : 'css/[name].css',
      }),

      // Generate an HTML file (dist/index.html) with automatically injected JS/CSS
      new HtmlWebpackPlugin({
        template: './src/index.html',
        // Minify HTML in production
        minify: isProduction && {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true,
          minifyCSS: true,
        },
      }),

      // Copies any non-imported static assets from src/assets to dist/assets
      // so that they keep original names and subfolders.
      // If you have assets that are never imported in JS/CSS, they need copying.
      new CopyWebpackPlugin({
        patterns: [
          {
            // For example, copy entire src/assets folder to dist/assets,
            // preserving subfolder structure.
            from: 'src/assets/public',
            to: 'assets/public',
            // noErrorOnMissing: true // Use if src/assets might not exist
          },
        ],
      }),
    ],

    // Split vendor code vs. application code
    optimization: {
      // Only minify in production
      minimize: isProduction,
      // Use built-in TerserPlugin for JS
      minimizer: ['...'],
      // Create a separate runtime chunk for long-term caching
      runtimeChunk: 'single',
      // Auto split vendor and app code
      splitChunks: {
        chunks: 'all',
      },
    },

    // Webpack Dev Server for local dev
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      compress: true,
      port: 9000,
      open: true,
      hot: true,
    },

    // Optional if you import .jsx or .json
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },

    performance: {
      // Show warnings if assets exceed recommended size in production
      hints: isProduction ? 'warning' : false,
      maxAssetSize: 300000, // 300 KB
      maxEntrypointSize: 500000, // 500 KB
    },
  };
};
