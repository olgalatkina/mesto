import initialCards from './initialCards.js';
import { openPopup, closePopup } from './utils.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

const validationSettings = {
  errorTextSelector: '.popup__error',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const validationPopupEdit = new FormValidator(validationSettings, formPopupEdit);
const validationPopupAdd = new FormValidator(validationSettings, formPopupAdd);

validationPopupEdit.enableValidation();
validationPopupAdd.enableValidation();

const generateCard = (card) => new Card(card, '#card-template').generate();

const renderCards = (cards) => (
  cards.reverse().forEach((card) => gallery.append(generateCard(card)))
);

const addCard = () => {
  const newCard = generateCard({
    name: inputTitle.value,
    link: inputLink.value,
  }, '#card-template');

  gallery.prepend(newCard);
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
  closePopup(popupAdd);
};

const openEditProfilePopup = () => {
  inputName.value = profileName.textContent;
  inputPosition.value = profilePosition.textContent;
  validationPopupEdit.resetPopupForm();
  openPopup(popupEdit);
};

const openAddPhotoPopup = () => {
  formPopupAdd.reset();
  validationPopupAdd.resetPopupForm();
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
