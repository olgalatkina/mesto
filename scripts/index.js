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
  formPopupEdit,
  formPopupAdd,
  validationSettings,
} from './constants.js';

import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import Card from './Card.js';
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import FormValidator from './FormValidator.js';

const validationPopupEdit = new FormValidator(validationSettings, formPopupEdit);
const validationPopupAdd = new FormValidator(validationSettings, formPopupAdd);

validationPopupEdit.enableValidation();
validationPopupAdd.enableValidation();

const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

const popupAdd = new PopupWithForm(popupAddSelector, (formData) => {
  cardsList.addItem(formData);
});

popupAdd.setEventListeners();

buttonAddCard.addEventListener('click', () => {
  validationPopupAdd.resetPopupForm();
  popupAdd.open();
});

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  positionSelector: profilePositionSelector
});

const popupEdit = new PopupWithForm(popupEditSelector, ({ name, position }) => {
  userInfo.setUserInfo({ name, position });
});

popupEdit.setEventListeners();

buttonEdit.addEventListener('click', () => {
  validationPopupEdit.resetPopupForm();
  popupEdit.setInputValues(userInfo.getUserInfo());
  popupEdit.open();
});

const createCard = (data) => new Card(data, cardTemplateSelector, () => popupWithImage.open(data)).generate();

const cardsList = new Section({
    items: initialCards,
    renderer: (cardItem) => createCard(cardItem),
  },
  gallerySelector
);

cardsList.addItems();
