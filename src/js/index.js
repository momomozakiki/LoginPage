// src/js/index.js

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
