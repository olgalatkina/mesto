export default class UserInfo {
  constructor(nameSelector, positionSelector, avatarSelector) {
    this._userName = document.querySelector(nameSelector);
    this._position = document.querySelector(positionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      position: this._position.textContent,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._userName.textContent = name;
    this._position.textContent = about;
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }
}
