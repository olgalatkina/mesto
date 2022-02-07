const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profilePosition = profile.querySelector('.profile__position');
const buttonEdit = profile.querySelector('.profile__button-edit');

const popup = document.querySelector('.popup');
const buttonClose = popup.querySelector('.popup__button-close');
const form = popup.querySelector('.popup__form')
const inputName = form.querySelector('#name');
const inputPosition = form.querySelector('#position');

const openProfilePopup = () => {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputPosition.value = profilePosition.textContent;
};

const closeProfilePopup = () => {
  popup.classList.remove('popup_opened');
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

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  changeDataInProfile();
  closeProfilePopup();
};

buttonEdit.addEventListener('click', openProfilePopup);
buttonClose.addEventListener('click', closeProfilePopup);
form.addEventListener('submit', handleProfileFormSubmit);
