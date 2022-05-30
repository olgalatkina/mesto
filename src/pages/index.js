import "./index.css";
import {
  profileAvatarSelector,
  profileNameSelector,
  profilePositionSelector,
  popupAvatarSelector,
  popupEditSelector,
  popupAddSelector,
  popupWithImageSelector,
  popupConfirmationSelector,
  cardTemplateSelector,
  gallerySelector,
  avatar,
  buttonEdit,
  buttonAddCard,
  formPopupAvatar,
  formPopupEdit,
  formPopupAdd,
  validationSettings,
} from '../utils/constants.js';

import Api from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Card from '../components/Card.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'
import FormValidator from '../components/FormValidator.js';

const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '525d6ef9-fa74-4a9f-b034-33c716bd855f',
    'Content-Type': 'application/json'
  }
})

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([me, cards]) => {
    userId = me._id;
    userInfo.setUserInfo(me);
    cardsList.addItems(cards);
  })
  .catch((err) => console.log(err))
  .finally(() => {})

let userId;

// Валидация форм
const validationPopupEdit = new FormValidator(validationSettings, formPopupEdit);
const validationPopupAdd = new FormValidator(validationSettings, formPopupAdd);
const validationPopupAvatar = new FormValidator(validationSettings, formPopupAvatar);

validationPopupEdit.enableValidation();
validationPopupAdd.enableValidation();
validationPopupAvatar.enableValidation();

// Profile
// popupAvatar
const popupAvatar = new PopupWithForm(popupAvatarSelector, (formData) => {
  popupAvatar.renderLoading(false);
  api
    .changeUserAvatar(formData)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => console.log(err))
    .finally(() => popupAvatar.renderLoading(false));
});

popupAvatar.setEventListeners();

avatar.addEventListener('click', () => {
  validationPopupAvatar.resetPopupForm();
  popupAvatar.open();
})

// popupEdit
const userInfo = new UserInfo(
  profileNameSelector,
  profilePositionSelector,
  profileAvatarSelector
);

const popupEdit = new PopupWithForm(popupEditSelector, (formData) => {
  popupEdit.renderLoading(true);
  api
    .changeUserInfo(formData)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => console.log(err))
    .finally(() => popupEdit.renderLoading(false));
});

popupEdit.setEventListeners();

buttonEdit.addEventListener('click', () => {
  validationPopupEdit.resetPopupForm();
  popupEdit.setInputValues(userInfo.getUserInfo());
  popupEdit.open();
});

// popupAdd
const popupAdd = new PopupWithForm(popupAddSelector, (formData) => {
  popupAdd.renderLoading(true);
  api
    .addCard(formData)
    .then((data) => {
      cardsList.addItem(data);
    })
    .catch((err) => console.log(err))
    .finally(() => popupAdd.renderLoading(false));
});

popupAdd.setEventListeners();

buttonAddCard.addEventListener('click', () => {
  validationPopupAdd.resetPopupForm();
  popupAdd.open();
});

// popupWithImage
const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

// popupWithConfirmation
const popupConfirmation = new PopupWithConfirmation(popupConfirmationSelector);
popupConfirmation.setEventListeners();

// рендер карточек
const createCard = (data) => {
  const card = new Card(
    data,
    cardTemplateSelector,
    () => popupWithImage.open(data),
    () => {
      popupConfirmation.setConfirm(() => {
        popupConfirmation.renderLoading(true);
        api
          .deleteCard(data._id)
          .then(() => {
            card.deleteCard();
            popupConfirmation.close();
          })
          .catch((err) => console.log(err))
          .finally(() => popupConfirmation.renderLoading(false))
      })
      popupConfirmation.open()
    },
    api,
    userId,
  )
  return card.generate();
}
const cardsList = new Section((cardItem) => createCard(cardItem), gallerySelector);
