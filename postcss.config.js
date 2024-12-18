module.exports = {
  plugins: [
    require('autoprefixer'), // Adds vendor prefixes to CSS
    require('cssnano')({ preset: 'default' }), // Minifies CSS
  ],
};
