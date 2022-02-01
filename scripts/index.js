const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profilePosition = profile.querySelector('.profile__position');
const buttonEdit = profile.querySelector('.button-edit');

const popup = document.querySelector('.popup');
const buttonClose = popup.querySelector('.button-close');
const form = popup.querySelector('.popup__form')
const inputName = form.querySelector('#name');
const inputPosition = form.querySelector('#position');

const clickEditButtonHandler = () => {
  popup.classList.add('popup_opened');
  popup.addEventListener('keydown', popupKeyDownHandler);
};

const clickCloseButtonHandler = () => {
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

const popupKeyDownHandler = (evt) => {
  if (evt.key === 'Enter') {
    changeDataInProfile();
  }
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  changeDataInProfile();
};

buttonEdit.addEventListener('click', clickEditButtonHandler);
buttonClose.addEventListener('click', clickCloseButtonHandler);
form.addEventListener('submit', formSubmitHandler);
