const path = require("path"); // Node.js module to work with file and directory paths
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // Plugin to analyze the final bundle size
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Extract CSS into separate files
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Generate HTML file with injected assets
const CopyWebpackPlugin = require("copy-webpack-plugin"); // Copy static assets to the output directory
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin"); // Remove unused CSS in production
const glob = require("glob"); // Match file paths for plugins like PurgeCSS
const webpack = require("webpack"); // Webpack's built-in plugin utilities
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin"); // Optimize images
const CompressionPlugin = require("compression-webpack-plugin"); // Gzip or Brotli compression for assets

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production"; // Determine the build environment

  return {
    mode: isProduction ? "production" : "development", // Set mode based on environment
    entry: "./src/index.tsx", // Application entry point
    output: {
      path: path.resolve(__dirname, "dist"), // Directory for the output files
      filename: isProduction ? "js/[name].[contenthash:8].js" : "js/[name].js", // JS files with content hashes for production
      chunkFilename: "js/[id].[contenthash:8].js", // Dynamic chunk filenames
      clean: true, // Clean the output directory before building
    },
    devtool: isProduction ? false : "source-map", // Enable source maps only for development
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/, // Handle TypeScript and TSX files
          exclude: /node_modules/, // Exclude files from node_modules
          use: "babel-loader", // Transpile modern JavaScript/TypeScript
        },
        {
          test: /\.scss$/, // Handle SCSS files
          use: [
            MiniCssExtractPlugin.loader, // Extract CSS into separate files
            {
              loader: "css-loader",
              options: {
                modules: {
                  auto: true, // Enable CSS Modules only for files matching `.module.scss`
                  localIdentName: isProduction
                    ? "[hash:base64]" // Short class names for production
                    : "[local]--[hash:base64:5]", // Readable class names for development
                },
                url: {
                  filter: (url) => !url.startsWith("data:image"), // Skip data:image URIs
                },
              },
            },
            "postcss-loader", // Apply PostCSS transformations (e.g., autoprefixer)
            "sass-loader", // Compile SCSS to CSS
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i, // Handle image files
          type: "asset/resource", // Treat images as separate assets
          exclude: /data:image/, // Exclude inline SVGs or data URIs
          generator: {
            filename: "assets/images/[name].[contenthash:8][ext]", // Output image files with content hash
          },
        },
        {
          test: /\.svg$/i, // Handle inline SVGs
          resourceQuery: /inline/, // Match SVGs imported with `?inline`
          use: "raw-loader", // Load SVGs as raw strings
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isProduction ? "css/[name].[contenthash:8].css" : "css/[name].css", // Extracted CSS filenames
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html", // Use this HTML file as a template
        inject: "body", // Inject scripts into the body
        minify: isProduction && {
          removeComments: true, // Remove comments in production
          collapseWhitespace: true, // Minify whitespace
          minifyJS: true, // Minify inline JS
          minifyCSS: true, // Minify inline CSS
        },
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src/assets"), // Copy assets folder
            to: "assets", // Destination in the output directory
            noErrorOnMissing: true, // Ignore if the folder is missing
          },
        ],
      }),
      isProduction &&
        new BundleAnalyzerPlugin({
          analyzerMode: "static", // Output a static report in production
          openAnalyzer: false, // Do not open the report automatically
        }),
      isProduction &&
        new PurgeCSSPlugin({
          paths: glob.sync(`${path.join(__dirname, "src")}/**/*`, { nodir: true }), // Scan for used classes
          safelist: {
            standard: [/^btn-/, /^form-/], // Safelist specific class patterns
            deep: [/^modal-backdrop$/], // Safelist nested class patterns
          },
        }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(isProduction ? "production" : "development"), // Define environment variable
          REACT_APP_API_URL: JSON.stringify(
            process.env.REACT_APP_API_URL || "http://localhost:3000/api" // Set API URL
          ),
        },
      }),
      isProduction &&
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: [
                ["mozjpeg", { quality: 65 }], // Optimize JPEG images
                ["optipng", { optimizationLevel: 5 }], // Optimize PNG images
                ["pngquant", { quality: [0.65, 0.9] }], // Compress PNGs further
                ["svgo", {
                  plugins: [
                    { name: "preset-default" }, // Use default optimizations
                    { name: "removeViewBox", active: false }, // Keep viewBox for responsiveness
                  ],
                }],
                ["imagemin-webp", { quality: 75 }], // Convert images to WebP
              ],
            },
          },
        }),
      isProduction &&
        new CompressionPlugin({
          test: /\.(js|css|html|svg)$/, // Compress JS, CSS, HTML, and SVG files
          threshold: 10240, // Only compress files larger than 10 KB
          minRatio: 0.8, // Compress files with a compression ratio > 0.8
        }),
    ].filter(Boolean), // Remove falsy values (e.g., `false` plugins)
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"], // Resolve these extensions
      alias: {
        "@": path.resolve(__dirname, "src"), // Alias for src folder
        "@components": path.resolve(__dirname, "src/components"), // Alias for components
        "@pages": path.resolve(__dirname, "src/pages"), // Alias for pages
        "@services": path.resolve(__dirname, "src/services"), // Alias for services
      },
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, "dist"), // Serve static files from dist
      },
      compress: true, // Enable gzip compression in development
      port: 9000, // Dev server port
      open: true, // Automatically open the browser
      hot: true, // Enable hot module replacement
      historyApiFallback: true, // Support client-side routing
      host: "0.0.0.0", // Allow access from external devices
    },
    optimization: {
      splitChunks: {
        chunks: "all", // Split all chunks (async and non-async)
        maxInitialRequests: 10, // Limit initial requests
        minSize: 20000, // Minimum size for chunks
        maxSize: 50000, // Maximum size for chunks
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/, // Target node_modules
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]; // Extract package name
              return `vendor.${packageName.replace("@", "")}`; // Create vendor chunks
            },
          },
          styles: {
            name: "styles", // Separate CSS into its own chunk
            test: /\.css$/, // Target CSS files
            chunks: "all", // Include all chunks
            enforce: true, // Force chunk creation
          },
        },
      },
      runtimeChunk: "single", // Extract runtime into a single chunk
      moduleIds: "deterministic", // Use consistent module IDs for long-term caching
      chunkIds: "deterministic", // Use consistent chunk IDs for long-term caching
    },
    performance: {
      hints: isProduction ? "warning" : false, // Show warnings only in production
      maxEntrypointSize: 512000, // Maximum size for entry points (512 KB)
      maxAssetSize: 512000, // Maximum size for assets (512 KB)
    },
  };
};
