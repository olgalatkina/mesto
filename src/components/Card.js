export default class Card {
  constructor(data, selector, handleCardClick, handleTrashClick, api, userId) {
    this._data = data;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;

    this._selector = selector;

    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;

    this._api = api;
    this._userId = userId;
  }

  _getElement() {
    this._element = document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _toggleLike() {
    if (!(this._like.classList.contains('card__button-like_active'))) {
      this._api
        .addLike(this._id)
        .then((data) => {
          this._like.classList.add('card__button-like_active');
          this._likesOutput.textContent = this._likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      this._api
        .deleteLike(this._id)
        .then((data) => {
          this._like.classList.remove('card__button-like_active');
          this._likesOutput.textContent = this._likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => this._handleCardClick(this._data));

    this._like.addEventListener('click', () => {
      this._toggleLike();
    });

    this._trash.addEventListener('click', () => this._handleTrashClick());
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
      this._trash.style.display = 'none';
    }

    if(this._likes.some((obj) => this._userId == obj._id)) {
      this._like.classList.add('card__button-like_active');
    }

    this._setEventListeners();

    return this._element;
  }
}
