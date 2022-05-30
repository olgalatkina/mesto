const profileNameSelector = '.profile__name';
const profilePositionSelector = '.profile__position';
const popupAvatarSelector = '#popup-edit-avatar';
const popupEditSelector = '#popup-edit-profile';
const popupAddSelector = '#popup-add-photo';
const popupWithImageSelector = '#popup-show-photo';
const cardTemplateSelector = '#card-template';
const gallerySelector = '.gallery__list';
const profile = document.querySelector('.profile');
const buttonEdit = profile.querySelector('.profile__button-edit');
const buttonAddCard = profile.querySelector('.profile__button-add');
const popupEdit = document.querySelector('#popup-edit-profile');
const formPopupEdit = popupEdit.querySelector('.popup__form');
const popupAdd = document.querySelector('#popup-add-photo');
const formPopupAdd = popupAdd.querySelector('.popup__form');
const popupAvatar = document.querySelector('#popup-edit-avatar');
const formPopupAvatar = popupAvatar.querySelector('.popup__form');

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
  popupAvatarSelector,
  popupEditSelector,
  popupAddSelector,
  popupWithImageSelector,
  cardTemplateSelector,
  gallerySelector,
  buttonEdit,
  buttonAddCard,
  formPopupEdit,
  formPopupAdd,
  formPopupAvatar,
  validationSettings,
};
