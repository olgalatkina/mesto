export default class Card {
  constructor(data, selector, handleCardClick) {
    this._data = data;
    this._selector = selector;
    this._handleCardClick = handleCardClick;

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

  _toggleLike() {
    this._element.querySelector('.card__button-like').classList.toggle('card__button-like_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._image = this._element.querySelector('.card__image');
    this._image.addEventListener('click', () => this._handleCardClick(this._data));

    this._like = this._element.querySelector('.card__button-like');
    this._like.addEventListener('click', this._toggleLike);

    this._trash = this._element.querySelector('.card__button-trash');
    this._trash.addEventListener('click', this._deleteCard);
  }

  generate() {
    this._getElement();
    this._setEventListeners();

    this._image.alt = this._data.title;
    this._image.src = this._data.link;
    this._element.querySelector('.card__title').textContent = this._data.title;

    return this._element;
  }
}
