const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profilePosition = profile.querySelector('.profile__position');
const buttonEdit = profile.querySelector('.profile__button-edit');
const buttonAddCard = profile.querySelector('.profile__button-add');

const gallery = document.querySelector('.gallery__list');
const cardTemplate = document.querySelector('#card-template').content;

const popupEdit = document.querySelector('#popup-edit-profile');
const inputName = popupEdit.querySelector('#name');
const inputPosition = popupEdit.querySelector('#position');

const popupAdd = document.querySelector('#popup-add-photo');
const inputTitle = popupAdd.querySelector('#title');
const inputLink = popupAdd.querySelector('#link');

const popupShowPhoto = document.querySelector('#popup-show-photo');
const popupImage = popupShowPhoto.querySelector('.popup__image');
const popupCaption = popupShowPhoto.querySelector('.popup__caption');

let popup, buttonClose, form;

const setFormSubmitListener = () => {
  form = popup.querySelector('.popup__form');
  form.addEventListener('submit', handleFormSubmit);
};

const openPopup = (evt) => {
  const current = evt.target.className;

  if (current.includes('edit')) {
    popup = popupEdit;
    inputName.value = profileName.textContent;
    inputPosition.value = profilePosition.textContent;
    setFormSubmitListener();
  }
  if (current.includes('add')) {
    popup = popupAdd;
    setFormSubmitListener();
  }
  if (current.includes('card__image')) {
    popup = popupShowPhoto;
    popupCaption.textContent = evt.target.alt;
    popupImage.src = evt.target.src;
  }

  popup.classList.add('popup_opened');
  buttonClose = popup.querySelector('.popup__button-close');
  buttonClose.addEventListener('click', closePopup);
};

const closePopup = () => {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('keydown', popupKeyDownHandler);
};

const changeDataInProfile = () => {
  const name = inputName.value;
  const position = inputPosition.value;

  if (name !== profileName.textContent) {
    profileName.textContent = name;
  }
  if (position !== profilePosition.textContent) {
    profilePosition.textContent = position;
  }
};

const toggleLike = (evt) => {
  const like = evt.target;
  const card = like.closest('.card');
  const cardStatus = card.dataset.islike;

  if (cardStatus === 'false') {
    card.dataset.islike = 'true';
    like.style.setProperty('background-image', 'url(../../../images/icon-heart-fill.svg)');
  }
  if (cardStatus === 'true') {
    card.dataset.islike = 'false';
    like.style.setProperty('background-image', 'url(../../../images/icon-heart.svg)');
  }
};

const deleteCard = (evt) => {
  const card = evt.target.closest('.card');
  card.remove();
};

const createCardElement = ({ name, link }) => {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  const image = newCard.querySelector('.card__image');
  image.alt = name;
  image.src = link;
  image.addEventListener('click', openPopup);

  const title = newCard.querySelector('.card__title');
  title.textContent = name;

  const like = newCard.querySelector('.card__button-like');
  like.addEventListener('click', toggleLike);

  const trash = newCard.querySelector('.card__button-trash');
  trash.addEventListener('click', deleteCard);

  return newCard;
}

const renderCards = (cards) => {
  const cardElements = [];
  cards.reverse().forEach((card) => {
    const newCardElement = createCardElement(card);
    cardElements.push(newCardElement);
  });
  gallery.append(...cardElements);
}

const addCard = () => {
  const title = inputTitle.value;
  const link = inputLink.value;
  const newCardData = {
    name: title,
    link,
  };

  const newCard = createCardElement(newCardData);
  gallery.prepend(newCard);
};

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  const current = evt.target.closest('.popup').id;

  if (current.includes('edit')) {
    changeDataInProfile();
  }
  if (current.includes('add')) {
    addCard();
  }

  closePopup();
};

buttonEdit.addEventListener('click', openPopup);
buttonAddCard.addEventListener('click', openPopup);

renderCards(initialCards);
