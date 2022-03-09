const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profilePosition = profile.querySelector('.profile__position');
const buttonEdit = profile.querySelector('.profile__button-edit');
const buttonAddCard = profile.querySelector('.profile__button-add');

const gallery = document.querySelector('.gallery__list');
const cardTemplate = document.querySelector('#card-template').content;

const popupEdit = document.querySelector('#popup-edit-profile');
const formPopupEdit = popupEdit.querySelector('.popup__form');
const inputName = popupEdit.querySelector('#name');
const inputPosition = popupEdit.querySelector('#position');

const popupAdd = document.querySelector('#popup-add-photo');
const formPopupAdd = popupAdd.querySelector('.popup__form');
const inputTitle = popupAdd.querySelector('#title');
const inputLink = popupAdd.querySelector('#link');

const popupShow = document.querySelector('#popup-show-photo');
const popupImage = popupShow.querySelector('.popup__image');
const popupCaption = popupShow.querySelector('.popup__caption');

const popups = document.querySelectorAll('.popup');

const createCardElement = ({ name, link }) => {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  const image = newCard.querySelector('.card__image');
  image.alt = name;
  image.src = link;
  image.addEventListener('click', () => openShowPhotoPopup({ name, link }));

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
  gallery.prepend(createCardElement({
    name: inputTitle.value,
    link: inputLink.value,
  }));
};

const deleteCard = (evt) => {
  const card = evt.target.closest('.card');
  card.remove();
};

const toggleLike = (evt) => {
  evt.target.classList.toggle('card__button-like_active');
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

const setDisabledOnSubmitButton = (evt) => {
  const submitButtonElement = evt.target.querySelector('.popup__button-save');
  submitButtonElement.classList.add('popup__button-save_disabled');
  submitButtonElement.setAttribute('disabled', true);
};

const handleAddFormSubmit = (evt) => {
  evt.preventDefault();
  addCard();
  evt.target.reset();
  setDisabledOnSubmitButton(evt);
  closePopup(popupAdd);
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupByClickOnOverlay);
  document.addEventListener(`keydown`, handleEscPress);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener(`keydown`, handleEscPress);
  popup.removeEventListener('click', closePopupByClickOnOverlay);
};

const handleEscPress = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

const closePopupByClickOnOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
};

const openEditProfilePopup = () => {
  inputName.value = profileName.textContent;
  inputPosition.value = profilePosition.textContent;
  openPopup(popupEdit);
};

const openAddPhotoPopup = () => {
  openPopup(popupAdd);
};

const openShowPhotoPopup = ({ name, link }) => {
  popupCaption.textContent = name;
  popupImage.src = link;
  popupImage.alt = name;
  openPopup(popupShow);
};

buttonEdit.addEventListener('click', openEditProfilePopup);
buttonAddCard.addEventListener('click', openAddPhotoPopup);
popupImage.addEventListener('click', openShowPhotoPopup);

formPopupEdit.addEventListener('submit', handleEditFormSubmit);
formPopupAdd.addEventListener('submit', handleAddFormSubmit);

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  })
});

renderCards(initialCards);
