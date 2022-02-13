const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profilePosition = profile.querySelector('.profile__position');
const buttonEdit = profile.querySelector('.profile__button-edit');
const buttonAddCard = profile.querySelector('.profile__button-add');

const gallery = document.querySelector('.gallery__list');
const cardTemplate = document.querySelector('#card-template').content;

const popupEdit = document.querySelector('#popup-edit-profile');
const formPopupEdit = popupEdit.querySelector('.popup__form');
const closeButtonPopupEdit = popupEdit.querySelector('.popup__button-close');
const inputName = popupEdit.querySelector('#name');
const inputPosition = popupEdit.querySelector('#position');

const popupAdd = document.querySelector('#popup-add-photo');
const formPopupAdd = popupAdd.querySelector('.popup__form');
const closeButtonPopupAdd = popupAdd.querySelector('.popup__button-close');
const inputTitle = popupAdd.querySelector('#title');
const inputLink = popupAdd.querySelector('#link');

const popupShow = document.querySelector('#popup-show-photo');
const closeButtonPopupShow = popupShow.querySelector('.popup__button-close');
const popupImage = popupShow.querySelector('.popup__image');
const popupCaption = popupShow.querySelector('.popup__caption');

const createCardElement = ({ name, link }) => {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  const image = newCard.querySelector('.card__image');
  image.alt = name;
  image.src = link;
  image.addEventListener('click', openShowPhotoPopup);

  const title = newCard.querySelector('.card__title');
  title.textContent = name;

  const like = newCard.querySelector('.card__button-like');
  like.addEventListener('click', toggleLike);

  const trash = newCard.querySelector('.card__button-trash');
  trash.addEventListener('click', deleteCard);

  return newCard;
};

const renderCards = (cards) => (
  cards.reverse().forEach((card) => gallery.append(createCardElement(card)))
);

const addCard = () => {
  const newCardData = {
    name: inputTitle.value,
    link: inputLink.value,
  };

  gallery.prepend(createCardElement(newCardData));
};

const deleteCard = (evt) => {
  const card = evt.target.closest('.card');
  card.remove();
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

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  changeDataInProfile();
  closePopup(popupEdit);
};

const handleAddFormSubmit = (evt) => {
  evt.preventDefault();
  addCard();
  inputTitle.value = '';
  inputLink.value = '';
  closePopup(popupAdd);
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  popup.classList.add('fade-in');
};

const closePopup = (popup) => {
  popup.classList.remove('fade-in');
  popup.classList.add('fade-out');
  setTimeout(() => {
    popup.classList.remove('popup_opened');
    popup.classList.remove('fade-out');
  }, 400);
};

const openEditProfilePopup = () => {
  inputName.value = profileName.textContent;
  inputPosition.value = profilePosition.textContent;
  openPopup(popupEdit);
};

const openAddPhotoPopup = () => openPopup(popupAdd);

const openShowPhotoPopup = (evt) => {
  popupCaption.textContent = evt.target.alt;
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  openPopup(popupShow);
};

const closeEditProfilePopup = () => closePopup(popupEdit);
const closeAddPhotoPopup = () => closePopup(popupAdd);
const closeShowPhotoPopup = () => closePopup(popupShow);

buttonEdit.addEventListener('click', openEditProfilePopup);
buttonAddCard.addEventListener('click', openAddPhotoPopup);
popupImage.addEventListener('click', openShowPhotoPopup);

formPopupEdit.addEventListener('submit', handleEditFormSubmit);
formPopupAdd.addEventListener('submit', handleAddFormSubmit);

closeButtonPopupEdit.addEventListener('click', closeEditProfilePopup);
closeButtonPopupAdd.addEventListener('click', closeAddPhotoPopup);
closeButtonPopupShow.addEventListener('click', closeShowPhotoPopup);

renderCards(initialCards);
