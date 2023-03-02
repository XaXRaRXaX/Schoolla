// Get form elements
const form = document.querySelector('form');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const birthDateInput = document.getElementById('birthDate');
const sexInput = document.getElementsByName('sex');
const addressInput = document.getElementById('address');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

// Set up form validation
form.addEventListener('submit', (event) => {
  // Prevent form submission
  event.preventDefault();

  // Validate form fields
  const isFirstNameValid = validateName(firstNameInput);
  const isLastNameValid = validateName(lastNameInput);
  const isEmailValid = validateEmail(emailInput);
  const isBirthDateValid = validateBirthDate(birthDateInput);
  const isSexValid = validateSex(sexInput);
  const isAddressValid = validateAddress(addressInput);
  const isPhoneValid = validatePhone(phoneInput);
  const isPasswordValid = validatePassword(passwordInput);
  const isConfirmPasswordValid = validateConfirmPassword(confirmPasswordInput, passwordInput);

  // Submit form if all fields are valid
  if (isFirstNameValid && isLastNameValid && isEmailValid && isBirthDateValid && isSexValid && isAddressValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid) {
    form.submit();
  }
});

// Define validation functions
function previewProfilePhoto(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      document.getElementById("profile-photo").src = e.target.result;
    }

    reader.readAsDataURL(input.files[0]);
  }
}

function validateName(input) {
  const inputValue = input.value.trim();

  if (inputValue === '') {
    setError(input, 'Name is required');
    return false;
  } else if (!/^[a-zA-Z ]{3,}$/.test(inputValue)) {
    setError(input, 'Name must be at least 3 characters long and contain only letters');
    return false;
  } else {
    setSuccess(input);
    return true;
  }
}

function validateEmail(input) {
  const inputValue = input.value.trim();

  if (inputValue === '') {
    setError(input, 'Email is required');
    return false;
  } else if (!/^\S+@\S+\.\S+$/.test(inputValue)) {
    setError(input, 'Email is invalid');
    return false;
  } else {
    setSuccess(input);
    return true;
  }
}

function validateBirthDate(input) {
  const inputValue = input.value;

  if (inputValue === '') {
    setError(input, 'Birth date is required');
    return false;
  } else {
    setSuccess(input);
    return true;
  }
}

function validateSex(input) {
  let isChecked = false;

  for (let i = 0; i < input.length; i++) {
    if (input[i].checked) {
      isChecked = true;
      break;
    }
  }

  if (!isChecked) {
    setError(input[0], 'Sex is required');
    return false;
  } else {
    setSuccess(input[0]);
    return true;
  }
}

function validateAddress(input) {
  const inputValue = input.value.trim();

  if (inputValue === '') {
    setError(input, 'Address is required');
    return false;
  } else {
    setSuccess(input);
    return true;
  }
}

function validatePhone(input) {
  const inputValue = input.value.trim();

  if (inputValue === '') {
    setError(input, 'Phone number is required');
    return false;
  } else if (!/^\d+$/.test(inputValue)) {
    setError(input, 'Phone number must contain only numbers');
    return false;
  } else {
    setSuccess(input);
    return true;
  }
}

function validatePassword(input) {
  const inputValue = input.value;

  if (inputValue === '') {
    setError(input, 'Password is required');
    return false;
  } else if (inputValue.length < 8) {
    setError(input, 'Password must be at least 8 characters long');
    return false;
  } else {
    setSuccess(input);
    return true;
  }
}

function validateConfirmPassword(input, passwordInput) {
  const inputValue = input.value;

  if (inputValue === '') {
    setError(input, 'Confirm password is required');
    return false;
  } else if (inputValue !== passwordInput.value) {
    setError(input, 'Passwords do not match');
    return false;
  } else {
    setSuccess(input);
    return true;
  }
}

function setError(input, message) {
  const formControl = input.parentElement;
  const errorMessage = formControl.querySelector('.error-message');

  formControl.classList.add('error');
  errorMessage.textContent = message;
}

function setSuccess(input) {
  const formControl = input.parentElement;

  formControl.classList.remove('error');
}

