document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        validateForm();
    });

    function validateForm() {
        // Reset previous error messages
        resetErrors();

        let isValid = true;

        // Validate username
        if (usernameInput.value.trim() === '') {
            isValid = false;
            displayError(usernameInput, 'Username is required.');
        }

        // Validate email
        if (!isValidEmail(emailInput.value.trim())) {
            isValid = false;
            displayError(emailInput, 'Enter a valid email address.');
        }

        // Validate password strength
        if (passwordInput.value.trim() === '') {
            isValid = false;
            displayError(passwordInput, 'Password is required.');
        } else if (!isValidPassword(passwordInput.value.trim())) {
            isValid = false;
            displayError(passwordInput, 'Password should be at least 8 characters long.');
        }

        // Validate confirm password
        if (confirmPasswordInput.value.trim() === '') {
            isValid = false;
            displayError(confirmPasswordInput, 'Please confirm your password.');
        } else if (passwordInput.value !== confirmPasswordInput.value) {
            isValid = false;
            displayError(confirmPasswordInput, 'Passwords do not match.');
        }

        // If form is valid, submit it (for demonstration purposes)
        if (isValid) {
            alert('Form submitted successfully!');
            form.reset(); // Reset form after successful submission
        }
    }

    function resetErrors() {
        const errorMessages = document.querySelectorAll('.error
