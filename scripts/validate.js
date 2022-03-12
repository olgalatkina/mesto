const getErrorElement = (formElement, inputElement) => formElement.querySelector(`#${inputElement.id}-error`);

const showError = (formElement, inputElement, errorMessage, errorClass, inputErrorClass) => {
  const errorElement = getErrorElement(formElement, inputElement);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
};

const hideError = (formElement, inputElement, errorClass, inputErrorClass) => {
  const errorElement = getErrorElement(formElement, inputElement);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
};

const checkValidity = (formElement, inputElement, errorClass, inputErrorClass) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showError(formElement, inputElement, errorMessage, errorClass, inputErrorClass);
  } else {
    hideError(formElement, inputElement, errorClass, inputErrorClass);
  }
};

const toggleButtonState = (inputList, submitButtonElement, inactiveButtonClass) => {
  const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);

  if (hasInvalidInput) {
    submitButtonElement.classList.add(inactiveButtonClass);
    submitButtonElement.setAttribute('disabled', true);
  } else {
    submitButtonElement.classList.remove(inactiveButtonClass);
    submitButtonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement, inputSelector, errorClass, inputErrorClass, submitButtonSelector, inactiveButtonClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButtonElement = formElement.querySelector(submitButtonSelector);

  const inputListIterator = (inputElement) => {
    const handleInput = () => {
      checkValidity(formElement, inputElement, errorClass, inputErrorClass);
      toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);
    };
    inputElement.addEventListener('input', handleInput);
  };
  toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);
  inputList.forEach(inputListIterator);
}

const enableValidation = (validationObj) => {
  const { formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass } = validationObj;

  const formList = Array.from(document.querySelectorAll(formSelector));
  const formListIterator = (formElement) => {
    formElement.addEventListener('submit', (e) => e.preventDefault());
    setEventListeners(formElement, inputSelector, errorClass, inputErrorClass, submitButtonSelector, inactiveButtonClass);
  };
  formList.forEach(formListIterator);
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});
