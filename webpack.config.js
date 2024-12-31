const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin"); // Import PurgeCSSPlugin
const glob = require("glob"); // Used to match files for PurgeCSS

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  
  return {
    mode: isProduction ? "production" : "development", // Set mode to 'production' or 'development'
    entry: "./src/index.tsx", // Entry point for the application
    output: {
      path: path.resolve(__dirname, "dist"), // Output directory
      filename: isProduction ? "js/[name].[contenthash:8].js" : "js/[name].js", // Output JS file name with content hash in production
      clean: true, // Clean the output directory before each build
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
          test: /\.(scss|css)$/, // Handle SCSS and CSS files
          use: [
            MiniCssExtractPlugin.loader, // Extract CSS into separate files
            {
              loader: "css-loader", // Handle CSS imports
              options: {
                sourceMap: !isProduction, // Enable source maps in development
              },
            },
            {
              loader: "postcss-loader", // Process CSS with PostCSS
              options: {
                sourceMap: !isProduction, // Enable source maps in development
                postcssOptions: {
                  plugins: [
                    require("autoprefixer"), // Add vendor prefixes
                    isProduction && require("cssnano")({ preset: "default" }), // Minify CSS in production
                  ].filter(Boolean), // Remove falsy values
                },
              },
            },
            {
              loader: "sass-loader", // Compile SCSS to CSS
              options: {
                sourceMap: !isProduction, // Enable source maps in development
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i, // Handle image files
          type: "asset/resource", // Emit files as separate assets
          generator: {
            filename: "assets/images/[name].[contenthash:8][ext]", // Output image file name with content hash
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isProduction ? "css/[name].[contenthash:8].css" : "css/[name].css", // Output CSS file name with content hash in production
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
            from: "src/assets/public", // Copy static assets
            to: "assets/public", // Output directory for static assets
            noErrorOnMissing: true, // Ignore if folder doesn't exist
          }
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
          rejected: true, // isProduction ? false : true Log removed classes during development
          only: ["css"], // Only apply to CSS files
          safelist: {
            standard: [/^btn-/, /^form-/], // Safelist Bootstrap classes (e.g., btn-, form-)
            deep: [/^modal-backdrop$/], // Safelist dynamically added classes
          },
        }),
    ].filter(Boolean), // Remove falsy values (e.g., `false` when not in production)
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"], // Resolve these file types
      alias: {
        "@components": path.resolve(__dirname, "src/components"), // Alias for components folder
        "@pages": path.resolve(__dirname, "src/pages"), // Alias for pages folder
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
    },
    optimization: {
      splitChunks: {
        chunks: "all", // Split all chunks (including async and non-async)
      },
    },
    performance: {
      hints: "warning", // Show warnings instead of errors when size limits are exceeded
      maxAssetSize: 2 * 1024 * 1024, // Maximum size for individual assets (2 MiB)
      maxEntrypointSize: 2 * 1024 * 1024, // Maximum size for entry points (2 MiB)
    },
  };
};