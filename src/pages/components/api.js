const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
    headers: {
        authorization: '5ff8400c-e28b-4222-8091-0c05f7234d51',
        'Content-Type': 'application/json'
    }
}

export const updateUserInfo = (name, status) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: status
        })
    })
        .then(getResponseData);

}

export const likes = (method, id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: method,
        headers: config.headers
    })
        .then(getResponseData);
}

export const addCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(getResponseData);
}

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "GET",
        headers: config.headers
    })
        .then(getResponseData);
}

export const uploadAvatarImage = (url) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: url
        })
    })
        .then(getResponseData)
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "GET",
        headers: config.headers
    })
        .then(getResponseData);
}

export const deleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: config.headers

    })
        .then(getResponseData)
}

function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}