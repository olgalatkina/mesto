import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);
    this._confirmButton = this._popup.querySelector('.popup__button-save');
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._confirmButton.textContent = 'Удаление...';
    } else {
      this._confirmButton.textContent = 'Да';
    }
  }

  setConfirm(callback) {
    this._handleConfirmationCallback = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      this._handleConfirmationCallback();
    });
  }
}
