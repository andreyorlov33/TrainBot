// show login modal on button click
$(document).on("click", ".login-button button", () => {
    $(".login-modal").show();
});

// show register modal on button click
$(document).on("click", ".register-button button", () => {
    $(".register-modal").show();
});

// hide login and register modal on close button click
$(document).on("click", ".close", () => {
    $(".register-modal").hide();
    $(".login-modal").hide();
    $(".menu").hide();
});

// Workout pick modal
$(document).on("click", ".submit-button__register", () => {
    $(".register-modal").hide();
});

$(document).on("click", ".hamburger", () => {
    $(".menu").show();
});