// src/js/index.js

/*
Bundling CSS/SCSS with JavaScript (Webpack)
When you use a bundler like Webpack, it allows you to import not only JavaScript files but also CSS, SCSS, or other assets.
This import statement is telling Webpack to process the SCSS file (styles.scss) and include it in the final bundle.

Why Import the SCSS in JavaScript?
Ensures Styles are Applied: By importing the SCSS file in your JavaScript entry file (index.js),
you're telling Webpack to include the styles when the JavaScript bundle is created. Without this import,
the styles from styles.scss wouldn't be included in the final output.

Allows for Better Asset Management: This approach integrates JavaScript and CSS bundling,
so both assets (JS and CSS) can be optimized and managed by Webpack.
It's particularly useful for optimizing load times (minifying CSS and JS, handling dependencies, etc.).
*/
import '../scss/styles.scss';

import { togglePassword } from './toggle-password.js';

let eyeicon = document.getElementById("eye-icon");
let password = document.getElementById("password");

eyeicon.onclick = function() {
    togglePassword(password, eyeicon);
};


/*

// Simple JavaScript function to change background color on button click
document.addEventListener("DOMContentLoaded", function() {
  const button = document.querySelector("button");
  const body = document.querySelector("body");

  button.addEventListener("click", function() {
    const currentColor = body.style.backgroundColor;

    if (currentColor === "rgb(244, 244, 244)") { // #f4f4f4 in RGB
      body.style.backgroundColor = "#e74c3c"; // Red color
    } else {
      body.style.backgroundColor = "#f4f4f4"; // Reset to light gray
    }
  });
});

*/