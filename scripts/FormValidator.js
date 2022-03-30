export default  class FormValidator {
  constructor(validationSettings, formElement) {
    this._validationSettings = validationSettings;
    this._formElement = formElement;
  }

  _getErrorElement(formElement, inputElement) {
    return formElement.querySelector(`#${inputElement.id}-error`);
  }

  _showError(formElement, inputElement, errorMessage, errorClass, inputErrorClass) {
    const errorElement = this._getErrorElement(formElement, inputElement);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
    inputElement.classList.add(inputErrorClass);
  }

  _hideError(formElement, inputElement, errorClass, inputErrorClass) {
    const errorElement = this._getErrorElement(formElement, inputElement);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
    inputElement.classList.remove(inputErrorClass);
  }

  _checkValidity(formElement, inputElement, errorClass, inputErrorClass) {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showError(formElement, inputElement, errorMessage, errorClass, inputErrorClass);
    } else {
      this._hideError(formElement, inputElement, errorClass, inputErrorClass);
    }
  }

  _toggleButtonState(inputList, submitButtonElement, inactiveButtonClass) {
    const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);

    if (hasInvalidInput) {
      submitButtonElement.classList.add(inactiveButtonClass);
      submitButtonElement.setAttribute('disabled', true);
    } else {
      submitButtonElement.classList.remove(inactiveButtonClass);
      submitButtonElement.removeAttribute('disabled');
    }
  }

  _setEventListeners(formElement, validationObj) {
    const { inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass } = validationObj;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButtonElement = formElement.querySelector(submitButtonSelector);

    const inputListIterator = (inputElement) => {
      const handleInput = () => {
        this._checkValidity(formElement, inputElement, errorClass, inputErrorClass);
        this._toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);
      };

      inputElement.addEventListener('input', handleInput);
    };
    this._toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);
    inputList.forEach(inputListIterator);
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (e) => e.preventDefault());
    this._setEventListeners(this._formElement, this._validationSettings);
  }
}
