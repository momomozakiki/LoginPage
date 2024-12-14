function togglePassword(passwordField, icon) {
    if(passwordField.type === "password") {
        passwordField.type = "text";            // Show the password
        icon.src = "../src/images/eye_open.png";
        icon.alt = "Hide password";
        icon.title = "Hide password";           // When the password is visible
    } else {
        passwordField.type = "password";        // Hide the password
        icon.src = "../src/images/eye_close.png";
        icon.alt = "Show password";
        icon.title = "Show password";           // Initially
    }
}

let eyeicon = document.getElementById("eyeicon");
let password = document.getElementById("password");

eyeicon.onclick = function() {
    togglePassword(password, eyeicon);
}