export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleEscPress = this._handleEscPress.bind(this);
    this.setEventListeners();
  }

  _handleEscPress(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscPress);
  }

  closePopup() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscPress);
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__button-close")
      ) {
        this.closePopup();
      }
    });
  }
}
