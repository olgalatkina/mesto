export default class FormValidator {
  constructor(validationSettings, formElement) {
    this._settings = validationSettings;
    this._formElement = formElement;
    this._inputs = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._submitButtonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    this._errorFields = this._formElement.querySelectorAll(this._settings.errorTextSelector);
  }

  _getErrorElement(inputElement) {
    return this._formElement.querySelector(`#${inputElement.id}-error`);
  }

  _showError(inputElement, errorMessage) {
    const { errorClass, inputErrorClass } = this._settings;
    const errorElement = this._getErrorElement(inputElement);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
    inputElement.classList.add(inputErrorClass);
  }

  _hideError(inputElement) {
    const { errorClass, inputErrorClass } = this._settings;
    const errorElement = this._getErrorElement(inputElement);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
    inputElement.classList.remove(inputErrorClass);
  }

  _checkValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }

  _setDisabledOnSubmitButton() {
    this._submitButtonElement.classList.add(this._settings.inactiveButtonClass);
    this._submitButtonElement.disabled = true;
  };

  _toggleButtonState() {
    const hasInvalidInput = this._inputs.some((inputElement) => !inputElement.validity.valid);

    if (hasInvalidInput) {
      this._setDisabledOnSubmitButton();
    } else {
      this._submitButtonElement.classList.remove(this._settings.inactiveButtonClass);
      this._submitButtonElement.removeAttribute('disabled');
    }
  }

  _setEventListeners() {
    const inputListIterator = (inputElement) => {
      const handleInput = () => {
        this._checkValidity(inputElement);
        this._toggleButtonState(this._inputs);
      };

      inputElement.addEventListener('input', handleInput);
    };

    this._toggleButtonState();
    this._inputs.forEach(inputListIterator);
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (e) => e.preventDefault());
    this._setEventListeners();
  }

  resetPopupForm() {
    this._errorFields.forEach((field) => field.textContent = '');
    this._inputs.forEach((input) => input.classList.remove(this._settings.inputErrorClass));
    this._setDisabledOnSubmitButton();
  };
}
