export default class UserInfo {
  constructor({ nameSelector, positionSelector }) {
    this._userName = document.querySelector(nameSelector);
    this._position = document.querySelector(positionSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      position: this._position.textContent,
    };
  }

  setUserInfo({ name, position }) {
    this._userName.textContent = name;
    this._position.textContent = position;
  }
}
