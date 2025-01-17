const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin"); // Import PurgeCSSPlugin
const glob = require("glob"); // Used to match files for PurgeCSS
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  
  return {
    mode: isProduction ? "production" : "development", // Set mode to 'production' or 'development'
    entry: "./src/index.tsx", // Entry point for the application
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "js/[name].[contenthash:8].js" : "js/[name].js", // Main JS files
      chunkFilename: "js/[id].[contenthash:8].js", // Dynamic imports
      clean: true, // Clean the output directory
    },
    devtool: isProduction ? false : "source-map", // Generate source maps in development
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/, // Handle TypeScript and JSX files
          exclude: /node_modules/, // Exclude node_modules
          use: "babel-loader", // Use Babel for transpilation
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
                  localIdentName: isProduction
                    ? '[hash:base64]'
                    : '[local]--[hash:base64:5]',
                },
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i, // Handle image files
          type: "asset/resource", // Emit files as separate assets
          generator: {
            filename: "assets/[path][name].[contenthash:8][ext]", // Output image file name with content hash "assets/images/[name].[contenthash:8][ext]"
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        ignoreOrder: true,
        filename: isProduction ? "css/[name].[contenthash:8].css" : "css/[name].css", // Group CSS files logically
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html", // Use this HTML template
        inject: "body", // Inject scripts into the body
        minify: isProduction && {
          removeComments: true, // Remove comments in production
          collapseWhitespace: true, // Collapse whitespace in production
          minifyJS: true, // Minify JS in production
          minifyCSS: true, // Minify CSS in production
        },
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src/assets"), // Copy static assets, previous -> from: "src/assets/public",
            to: "assets", // Output directory for static assets
            noErrorOnMissing: true, // Ignore if folder doesn't exist
          },
        ],
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: isProduction ? "static" : "disabled", // Generate a report in production
        openAnalyzer: false, // Don't open the report automatically
      }),

      // Add PurgeCSSPlugin here
      isProduction &&
        new PurgeCSSPlugin({
          paths: glob.sync(`${path.join(__dirname, "src")}/**/*`, { nodir: true }), // Scan all files in src
          // rejected: true, // Useful for debugging purged CSS classes in production, but not necessary unless you need to debug.
          safelist: {
            standard: [/^btn-/, /^form-/], // Safelist Bootstrap classes (e.g., btn-, form-)
            deep: [/^modal-backdrop$/], // Safelist dynamically added classes
          },
        }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'),
          REACT_APP_API_URL: JSON.stringify(process.env.REACT_APP_API_URL || 'http://localhost:3000/api')
        }
      }),
    ].filter(Boolean), // Remove falsy values (e.g., `false` when not in production)
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"], // Resolve these file types
      alias: {
        "@": path.resolve(__dirname, 'src'),
        "@components": path.resolve(__dirname, 'src/components'),
        "@pages": path.resolve(__dirname, 'src/pages'),
        "@services": path.resolve(__dirname, 'src/services')
      },
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, "dist"), // Serve files from the dist directory
      },
      compress: true, // Enable gzip compression
      port: 9000, // Port for the dev server
      open: true, // Open the browser automatically
      hot: true, // Enable hot module replacement
      historyApiFallback: true, // Enable client-side routing
      host: '0.0.0.0', // Allow access from other devices
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 10, // Limit initial requests // Remove limit on number of initial chunks "Infinity"
        minSize: 20000, // 20KB minimum size for chunks
        maxSize: 50000, // 50KB maximum size for chunks
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/, // Target node_modules packages
            name(module) {
              // Create separate chunks for each vendor package
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              
              // Clean package name for URL compatibility
              return `vendor.${packageName.replace('@', '')}`;
            },
          },
          styles: {
            name: 'styles',
            test: /\.css$/, // Bundle CSS files separately
            chunks: 'all',
            enforce: true, // Force CSS into separate chunks
          },
        },
      },
      runtimeChunk: 'single', // Extract webpack runtime into single chunk
      moduleIds: 'deterministic',
      chunkIds: 'deterministic',
    },
    performance: {
      hints: isProduction ? 'warning' : false, // Show size warnings only in production
      maxEntrypointSize: 512000, // Reduced from 2MB to 512KB
      maxAssetSize: 512000, // Reduced from 2MB to 512KB
    },
  };
};