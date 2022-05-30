export default class Card {
  constructor(data, selector, handleCardClick, handleTrashClick, handleLikeClick, userId) {
    this._data = data;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;

    this._selector = selector;

    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;

    this._userId = userId;
  }

  _getElement() {
    this._element = document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  updateData(newData) {
    this._likes = newData.likes;
  }

  updateLikesView() {
    this._likesOutput.textContent = this._likes.length;
    if (this.isLiked()) {
      this._like.classList.add('card__button-like_active');
    } else {
      this._like.classList.remove('card__button-like_active');
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => this._handleCardClick(this._data));
    this._like.addEventListener('click', () => this._handleLikeClick());
    this._trash.addEventListener('click', () => this._handleTrashClick());
  }

  isLiked() {
    return Boolean(this._likes.find((item) => item._id === this._userId));
  }

  generate() {
    this._getElement();
    this._element.querySelector('.card__title').textContent = this._name;

    this._image = this._element.querySelector('.card__image');
    this._image.alt = this._name;
    this._image.src = this._link;

    this._trash = this._element.querySelector('.card__button-trash');

    this._like = this._element.querySelector('.card__button-like');
    this._likesOutput = this._element.querySelector('.card__like-counter');
    this._likesOutput.textContent = this._likes.length;

    if (this._ownerId !== this._userId) {
      this._trash.classList.add('card__button-trash_hidden');
    }

    if(this.isLiked()) {
      this._like.classList.add('card__button-like_active');
    }

    this._setEventListeners();

    return this._element;
  }
}
