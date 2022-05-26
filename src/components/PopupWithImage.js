import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupCaption = this._popup.querySelector(".popup__caption");
  }

  _reset() {
    this._popupImage.src = '';
    this._popupImage.alt = '';
    this._popupCaption.textContent = '';
  }

  open({ name, link }) {
    this._reset();
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
    super.open();
  }
}
