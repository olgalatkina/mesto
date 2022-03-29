import initialCards from './initialCards.js';
import Card from './Card.js';

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profilePosition = profile.querySelector('.profile__position');
const buttonEdit = profile.querySelector('.profile__button-edit');
const buttonAddCard = profile.querySelector('.profile__button-add');

const gallery = document.querySelector('.gallery__list');

const popupEdit = document.querySelector('#popup-edit-profile');
const formPopupEdit = popupEdit.querySelector('.popup__form');
const inputName = popupEdit.querySelector('#name');
const inputPosition = popupEdit.querySelector('#position');

const popupAdd = document.querySelector('#popup-add-photo');
const formPopupAdd = popupAdd.querySelector('.popup__form');
const inputTitle = popupAdd.querySelector('#title');
const inputLink = popupAdd.querySelector('#link');

const popups = document.querySelectorAll('.popup');

const renderCards = (cards) => (
  cards.reverse().forEach((card) => gallery.append(new Card(card, '#card-template').generate()))
);

const addCard = () => {
  const newCard = new Card({
    name: inputTitle.value,
    link: inputLink.value,
  }, '#card-template');

  gallery.prepend(newCard.generate());
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

const setDisabledOnSubmitButton = (popup) => {
  const submitButtonElement = popup.querySelector('.popup__button-save');
  submitButtonElement.classList.add('popup__button-save_disabled');
  submitButtonElement.disabled = true;
};

const handleAddFormSubmit = (evt) => {
  evt.preventDefault();
  addCard();
  closePopup(popupAdd);
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener(`keydown`, handleEscPress);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener(`keydown`, handleEscPress);
};

const handleEscPress = (evt) => {
  if (evt.key === 'Escape') {
    const popup = Array.from(popups).find((popup) => popup.classList.contains('popup_opened'));
    closePopup(popup);
  }
};

const resetPopup = (popup) => {
  const errorFields = popup.querySelectorAll('.popup__error');
  errorFields.forEach((field) => field.textContent = '');
  const inputs = popup.querySelectorAll('.popup__input');
  inputs.forEach((input) => input.classList.remove('popup__input_type_error'));
  setDisabledOnSubmitButton(popup);
};

const openEditProfilePopup = () => {
  inputName.value = profileName.textContent;
  inputPosition.value = profilePosition.textContent;
  resetPopup(popupEdit);
  openPopup(popupEdit);
};

const openAddPhotoPopup = () => {
  popupAdd.querySelector('.popup__form').reset();
  resetPopup(popupAdd);
  openPopup(popupAdd);
};

buttonEdit.addEventListener('click', openEditProfilePopup);
buttonAddCard.addEventListener('click', openAddPhotoPopup);

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
