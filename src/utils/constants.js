const profileNameSelector = '.profile__name';
const profilePositionSelector = '.profile__position';
const popupWithImageSelector = '#popup-show-photo';
const popupAddSelector = '#popup-add-photo';
const popupEditSelector = '#popup-edit-profile';
const cardTemplateSelector = '#card-template';
const gallerySelector = '.gallery__list';
const profile = document.querySelector('.profile');
const buttonEdit = profile.querySelector('.profile__button-edit');
const buttonAddCard = profile.querySelector('.profile__button-add');
const popupEdit = document.querySelector('#popup-edit-profile');
const formPopupEdit = popupEdit.querySelector('.popup__form');
const popupAdd = document.querySelector('#popup-add-photo');
const formPopupAdd = popupAdd.querySelector('.popup__form');

const validationSettings = {
  errorTextSelector: '.popup__error',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export {
  profileNameSelector,
  profilePositionSelector,
  popupWithImageSelector,
  popupAddSelector,
  popupEditSelector,
  cardTemplateSelector,
  gallerySelector,
  buttonEdit,
  buttonAddCard,
  popupEdit,
  formPopupEdit,
  popupAdd,
  formPopupAdd,
  validationSettings,
};
