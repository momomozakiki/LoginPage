const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const glob = require("glob");
const webpack = require("webpack");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "js/[name].[contenthash:8].js" : "js/[name].js",
      chunkFilename: "js/[id].[contenthash:8].js",
      clean: true,
    },
    devtool: isProduction ? false : "source-map",
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  auto: true,
                  localIdentName: isProduction
                    ? "[hash:base64]"
                    : "[local]--[hash:base64:5]",
                },
              },
            },
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/[path][name].[contenthash:8][ext]",
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        ignoreOrder: true,
        filename: isProduction ? "css/[name].[contenthash:8].css" : "css/[name].css",
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: "body",
        minify: isProduction && {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true,
          minifyCSS: true,
        },
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src/assets"),
            to: "assets",
            noErrorOnMissing: true,
          },
        ],
      }),
      isProduction &&
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          openAnalyzer: false,
        }),
      isProduction &&
        new PurgeCSSPlugin({
          paths: glob.sync(`${path.join(__dirname, "src")}/**/*`, { nodir: true }),
          safelist: {
            standard: [/^btn-/, /^form-/],
            deep: [/^modal-backdrop$/],
          },
        }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(isProduction ? "production" : "development"),
          REACT_APP_API_URL: JSON.stringify(
            process.env.REACT_APP_API_URL || "http://localhost:3000/api"
          ),
        },
      }),
      isProduction &&
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: [
                ["mozjpeg", { quality: 65 }], // Compress JPEG images
                ["optipng", { optimizationLevel: 5 }], // Compress PNG images
                ["pngquant", { quality: [0.65, 0.9] }], // Further compress PNG images
                ["svgo", { plugins: [{ removeViewBox: false }] }], // Optimize SVG files
                ["imagemin-webp", { quality: 75 }], // Convert images to WebP
              ],
            },
          },
          generator: [
            {
              preset: "webp",
              implementation: ImageMinimizerPlugin.imageminGenerate,
              options: {
                plugins: ["imagemin-webp"],
              },
            },
          ],
        }),
      isProduction &&
        new CompressionPlugin({
          test: /\.(js|css|html|svg)$/, // Compress JS, CSS, HTML, SVG
          threshold: 10240, // Only compress files larger than 10 KB
          minRatio: 0.8, // Only compress files with compression ratio > 0.8
        }),
    ].filter(Boolean),
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@components": path.resolve(__dirname, "src/components"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@services": path.resolve(__dirname, "src/services"),
      },
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, "dist"),
      },
      compress: true,
      port: 9000,
      open: true,
      hot: true,
      historyApiFallback: true,
      host: "0.0.0.0",
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        maxInitialRequests: 10,
        minSize: 20000,
        maxSize: 50000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `vendor.${packageName.replace("@", "")}`;
            },
          },
          styles: {
            name: "styles",
            test: /\.css$/,
            chunks: "all",
            enforce: true,
          },
        },
      },
      runtimeChunk: "single",
      moduleIds: "deterministic",
      chunkIds: "deterministic",
    },
    performance: {
      hints: isProduction ? "warning" : false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};