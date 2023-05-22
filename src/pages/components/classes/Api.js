import {addCard, getUserInfo, likes, updateUserInfo, uploadAvatarImage} from "../api";

class Api {
    constructor(options) {
        this._options = options;
    };

    getInitialCards() {
        return fetch(`${this._options.baseUrl}/cards`, {
            method: "GET",
            headers: this._options.headers
        })
            .then(this._getResponseData);
    }

    updateUserInfo(name, status) {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: status
            })
        })
            .then(this._getResponseData);
    }

    likes(method, id) {
        return fetch(`${this._options.baseUrl}/cards/likes/${id}`, {
            method: method,
        })
            .then(this._getResponseData);
    }

    addCard(name, link) {
        return fetch(`${this._options.baseUrl}/cards`, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._getResponseData);
    }

    getUserInfo() {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: "GET",
            headers: this._options.headers
        })
            .then(this._getResponseData);
    }

    uploadAvatarImage(url) {
        return fetch(`${this._options.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            body: JSON.stringify({
                avatar: url
            })
        })
            .then(this._getResponseData)
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    errorHandler(err) {
        console.log(err);
    }

}
 export const api = new Api({
        baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
        headers: {
            authorization: '5ff8400c-e28b-4222-8091-0c05f7234d51',
            'Content-Type': 'application/json'
        }
    })
