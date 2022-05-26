import initialCards from './initialCards.js';
import {
  profileNameSelector,
  profilePositionSelector,
  popupWithImageSelector,
  popupAddSelector,
  popupEditSelector,
  cardTemplateSelector,
  gallerySelector,
  buttonEdit,
  buttonAddCard,
  gallery,
  formPopupEdit,
  inputName,
  inputPosition,
  formPopupAdd,
  inputTitle,
  inputLink,
  popups,
  validationSettings,
} from './constants.js';
// import { openPopup, closePopup } from './utils.js';
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import Card from './Card.js';
import Popup from "./Popup.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import FormValidator from './FormValidator.js';

const userInfo = new UserInfo({ nameSelector: profileNameSelector, positionSelector: profilePositionSelector });
const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

const popupAdd = new PopupWithForm(popupAddSelector, ({'#title': name, '#link': link}) => {
  cardsList.addItem({ name: name, link: link });
});
popupAdd.setEventListeners();

const popupEdit = new PopupWithForm(popupEditSelector, ({ name, position }) => {
  userInfo.setUserInfo({name, position});
});
popupEdit.setEventListeners();

const createCard = (data) => new Card(data, cardTemplateSelector, () => popupWithImage.open(data)).generate();

const cardsList = new Section({
    items: initialCards,
    renderer: (cardItem) => createCard(cardItem),
  },
  gallerySelector
);
cardsList.addItems();

// -----

const validationPopupEdit = new FormValidator(validationSettings, formPopupEdit);
const validationPopupAdd = new FormValidator(validationSettings, formPopupAdd);

validationPopupEdit.enableValidation();
validationPopupAdd.enableValidation();

// const renderCards = (cards) => (
//   cards.forEach((card) => gallery.append(generateCard(card)))
// );
//
// const addCard = () => {
//   const newCard = generateCard({
//     name: inputTitle.value,
//     link: inputLink.value,
//   }, '#card-template');
//
//   gallery.prepend(newCard);
// };
//
// const changeDataInProfile = () => {
//   const name = inputName.value;
//   const position = inputPosition.value;
//
//   if (name !== profileName.textContent) {
//     profileName.textContent = name;
//   }
//   if (position !== profilePosition.textContent) {
//     profilePosition.textContent = position;
//   }
// };
//
// const handleEditFormSubmit = (evt) => {
//   evt.preventDefault();
//   changeDataInProfile();
//   closePopup(popupEdit);
// };
//
// const handleAddFormSubmit = (evt) => {
//   evt.preventDefault();
//   addCard();
//   closePopup(popupAdd);
// };
//
// const openEditProfilePopup = () => {
//   inputName.value = profileName.textContent;
//   inputPosition.value = profilePosition.textContent;
//   validationPopupEdit.resetPopupForm();
//   openPopup(popupEdit);
// };
//
// const openAddPhotoPopup = () => {
//   formPopupAdd.reset();
//   validationPopupAdd.resetPopupForm();
//   openPopup(popupAdd);
// };
//
// buttonEdit.addEventListener('click', openEditProfilePopup);
// buttonAddCard.addEventListener('click', openAddPhotoPopup);
//
// formPopupEdit.addEventListener('submit', handleEditFormSubmit);
// formPopupAdd.addEventListener('submit', handleAddFormSubmit);

// popups.forEach((popup) => {
//   popup.addEventListener('mousedown', (evt) => {
//     if (evt.target.classList.contains('popup_opened')) {
//       closePopup(popup);
//     }
//     if (evt.target.classList.contains('popup__button-close')) {
//       closePopup(popup);
//     }
//   })
// });
//
// renderCards(initialCards);
