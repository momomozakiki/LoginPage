export function togglePassword(passwordField, icon,
    SrcOpen = "./assets/images/eye_open.png", // Relative path to assets folder
    SrcClose = "./assets/images/eye_close.png") {

    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.src = SrcOpen;
        icon.alt = "Hide password";
    } else {
        passwordField.type = "password";
        icon.src = SrcClose;
        icon.alt = "Show password";
    }
}
