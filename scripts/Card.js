import { openPopup } from './utils.js';

export default class Card {
  _popupShow = document.querySelector('#popup-show-photo');
  _popupImage = this._popupShow.querySelector('.popup__image');
  _popupCaption = this._popupShow.querySelector('.popup__caption');

  constructor(data, selector) {
    this._data = data;
    this._selector = selector;

    // вчера была лекция по ООП и наставник посоветовал
    // использовать bind вместо стрелочных функций
    this._toggleLike = this._toggleLike.bind(this);
    this._deleteCard = this._deleteCard.bind(this);
  }

  _getElement() {
    this._element = document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _resetShowPhotoPopup() {
    this._popupImage.src = '';
    this._popupImage.alt = '';
    this._popupCaption.textContent = '';
  }

  _openShowPhotoPopup({ name, link }) {
    this._resetShowPhotoPopup();
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;

    openPopup(this._popupShow);
  }

  _toggleLike() {
    this._element.querySelector('.card__button-like').classList.toggle('card__button-like_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    const image = this._element.querySelector('.card__image');
    image.addEventListener('click', () => this._openShowPhotoPopup(this._data));

    const like = this._element.querySelector('.card__button-like');
    like.addEventListener('click', this._toggleLike);

    const trash = this._element.querySelector('.card__button-trash');
    trash.addEventListener('click', this._deleteCard);
  }

  generate() {
    this._getElement();
    this._setEventListeners();

    const image = this._element.querySelector('.card__image');
    image.alt = this._data.name;
    image.src = this._data.link;

    this._element.querySelector('.card__title').textContent = this._data.name;

    return this._element;
  }
}
