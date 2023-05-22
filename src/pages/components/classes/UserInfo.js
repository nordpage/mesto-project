import {api} from "./Api";

export default class UserInfo {
    constructor(avatar, name, status, {handleSetInfo, handleUploadAvatar}) {
        this._api = api;
        this._avatar = avatar;
        this._name = name;
        this._status = status;
        this._handleSetInfo = handleSetInfo;
        this._handleUploadAvatar = handleUploadAvatar;
    }


    getUserInfo() {
        this._api.getUserInfo().then(res => {
            this._avatar.src = res.avatar;
            this._name.textContent = res.name;
            this._status.textContent = res.about;
            sessionStorage.setItem('userId', res._id);
        }).catch((err) => this._api.errorHandler(err))
    }

    setUserInfo(name, status) {
        this._api.updateUserInfo(name, status).then(res => {
            this._handleSetInfo(res);
        }).catch((err) => this._api.errorHandler(err))
    }

    updateAvatar(url) {
        this._api.uploadAvatarImage(url).then(res => {
            this._avatar.src = res.avatar;
            this._handleUploadAvatar();
        }).catch((err) => this._api.errorHandler(err))
    }
}