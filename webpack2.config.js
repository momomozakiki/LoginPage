const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin"); // Plugin to remove unused CSS
const glob = require("glob"); // Used to match files for PurgeCSS
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production"; // Check if the build mode is production

  return {
    mode: isProduction ? "production" : "development", // Set the mode to 'production' or 'development' based on the build command
    entry: "./src/index.tsx", // Entry point of the application. Webpack starts bundling from here.
    output: {                 // Configuration for the output files
      path: path.resolve(__dirname, "dist"), // Output directory for bundled files
      filename: isProduction ? "js/[name].[contenthash:8].js" : "js/[name].js", // Main JS files with content hash in production
      chunkFilename: "js/[id].[contenthash:8].js", // Dynamic imports (e.g., lazy-loaded components)
      clean: true, // Clean the output directory before each build
    },
    devtool: isProduction ? false : "source-map", // Generate source maps in development for easier debugging
    module: {                                     // Module rules define how different file types are processed
      rules: [
        {
          test: /\.(ts|tsx)$/, // Handle TypeScript and JSX files
          exclude: /node_modules/, // Exclude node_modules from processing
          use: "babel-loader", // Use Babel to transpile TypeScript/JSX to JavaScript
        },
        {
          test: /\.scss$/, // Handle SCSS files
          use: [
            MiniCssExtractPlugin.loader, // Extract CSS into separate files
            {
              loader: 'css-loader', // Process CSS files
              options: {
                modules: {
                  auto: true, // Enable CSS modules for all files matching .module.scss
                  localIdentName: isProduction
                    ? '[hash:base64]' // Short hash for production
                    : '[local]--[hash:base64:5]', // Include class name for easier debugging in development
                },
              },
            },
            'postcss-loader', // Apply PostCSS transformations (e.g., autoprefixer)
            'sass-loader', // Compile SCSS to CSS
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i, // Handle image files
          type: "asset/resource", // Emit files as separate assets
          generator: {
            filename: "assets/[path][name].[contenthash:8].[ext]",  // Output images with content hash and preserve folder structure
          },
        },
      ],
    },
    plugins: [          // Plugins extend Webpack's functionality
      new MiniCssExtractPlugin({    // Extract CSS into separate files for better caching and performance
        ignoreOrder: true, // Ignore CSS order warnings
        filename: isProduction ? "css/[name].[contenthash:8].css" : "css/[name].css", // Output CSS files with content hash in production
      }),
      new HtmlWebpackPlugin({       // Generate an HTML file and inject bundled scripts
        template: "./src/index.html", // Use this HTML template
        inject: "body", // Inject scripts into the body
        minify: isProduction && { // Minify HTML in production
          removeComments: true, // Remove comments
          collapseWhitespace: true, // Collapse whitespace
          minifyJS: true, // Minify inline JavaScript
          minifyCSS: true, // Minify inline CSS
        },
      }),
      new CopyWebpackPlugin({       // Copy static assets (e.g., images, fonts) to the output directory
        patterns: [
          {
            from: path.resolve(__dirname, "src/assets/public"), // Source directory for static assets
            to: "assets/public", // Output directory for static assets
            noErrorOnMissing: true, // Ignore if the folder doesn't exist
          },
          {
            from: "src/public/alternative_signup", // Additional static assets
            to: "assets/public/alternative_signup",
            noErrorOnMissing: true,
          },
        ],
      }),
      new BundleAnalyzerPlugin({        // Analyze bundle size in production
        analyzerMode: isProduction ? "static" : "disabled", // Generate a report in production
        openAnalyzer: false, // Don't open the report automatically
      }),

      // Remove unused CSS in production
      isProduction &&
        new PurgeCSSPlugin({
          paths: glob.sync(`${path.join(__dirname, "src")}/**/*`, { nodir: true }), // Scan all files in src
          safelist: {
            standard: [/^btn-/, /^form-/], // Safelist Bootstrap classes (e.g., btn-, form-)
            deep: [/^modal-backdrop$/], // Safelist dynamically added classes
          },
        }),

      // Define environment variables for the application
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'), // Set NODE_ENV
          REACT_APP_API_URL: JSON.stringify(process.env.REACT_APP_API_URL || 'http://localhost:3000/api'), // Set API URL
        },
      }),
    ].filter(Boolean), // Remove falsy values (e.g., `false` when not in production)

    // Resolve file extensions and define aliases for easier imports
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"], // Resolve these file types
      alias: {
        "@": path.resolve(__dirname, 'src'), // Alias for the src directory
        "@components": path.resolve(__dirname, 'src/components'), // Alias for components
        "@pages": path.resolve(__dirname, 'src/pages'), // Alias for pages
        "@services": path.resolve(__dirname, 'src/services'), // Alias for services
      },
    },

    // Configuration for the development server
    devServer: {
      static: {
        directory: path.resolve(__dirname, "dist"), // Serve files from the dist directory
      },
      compress: true, // Enable gzip compression
      port: 9000, // Port for the dev server
      open: true, // Open the browser automatically
      hot: true, // Enable hot module replacement (HMR)
      historyApiFallback: true, // Enable client-side routing
      host: '0.0.0.0', // Allow access from other devices
    },

    // Optimization settings for better performance
    optimization: {
      splitChunks: {
        chunks: 'all', // Split all types of chunks (sync, async, initial)
        maxInitialRequests: 10, // Limit the number of initial chunks
        minSize: 20000, // Minimum size for chunks (20KB)
        maxSize: 50000, // Maximum size for chunks (50KB)
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/, // Target node_modules packages
            name(module) {
              // Create separate chunks for each vendor package
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `vendor.${packageName.replace('@', '')}`; // Clean package name for URL compatibility
            },
          },
          styles: {
            name: 'styles', // Bundle CSS files separately
            test: /\.css$/,
            chunks: 'all',
            enforce: true, // Force CSS into separate chunks
          },
        },
      },
      runtimeChunk: 'single', // Extract webpack runtime into a single chunk
      moduleIds: 'deterministic', // Use deterministic module IDs for better caching
      chunkIds: 'deterministic', // Use deterministic chunk IDs for better caching
    },

    // Performance hints and limits
    performance: {
      hints: isProduction ? 'warning' : false, // Show size warnings only in production
      maxEntrypointSize: 512000, // Maximum size for entry points (512KB)
      maxAssetSize: 512000, // Maximum size for assets (512KB)
    },
  };
};