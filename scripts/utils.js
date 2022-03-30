const handleEscPress = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener(`keydown`, handleEscPress);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener(`keydown`, handleEscPress);
};

export { openPopup, closePopup, handleEscPress };
