import '../../index.css';
import {api} from "./Api";

import UserInfo from "./UserInfo";
import {forms, formValidator, profileAvatar, profileName, profileStatus, selectors} from "../utils";
import Card from "./Card";
import Section from "./Section";
import PopupWithForm from "./PopupWithForm";
import PopupWithConfirm from "./PopupWithConfirm";
import FormValidator from "./FormValidator";

forms.forEach((form) => {
    const validator = new FormValidator(formValidator, form)
    validator.enableValidation()
})

const userInfo = new UserInfo(profileAvatar, profileName, profileStatus, {
    handleSetInfo: (res) => {

    }, handleUploadAvatar: () => {

    }
});


api.getInitialCards().then(res => {
    const section = new Section({
        data: res, renderer: (item) => {
            const card = new Card(item, selectors.elementTemplate, {
                handleClick: (id) => {

                },
                handleLike: (id, method) => {
                    api.likes(method, id).then(res => {
                        card.updateLike(res)
                    }).catch((err) => api.errorHandler(err))
                },
                handleTrash: (id) => {
                    sessionStorage.setItem('delete_id', id);
                }
            })
            const cardElement = card.generate()
            section.setItem(cardElement)
        }
    }, selectors.elements)
    section.renderItems()
}).catch((err) => api.errorHandler(err))

const popupAdd = document.querySelector('.popup_add');

const addPopup = new PopupWithForm({
    popup: popupAdd, handleClose: () => {
        addPopup.closePopup()
    },
    handleSubmit: (values) => {
        api.addCard(values.title, values.link)
            .then(res => {
                const section = new Section({
                    data: res, renderer: (item) => {
                        const card = new Card(item, selectors.elementTemplate, {
                            handleClick: (id) => {

                            },
                            handleLike: (id, method) => {
                                api.likes(method, id).then(res => {
                                    card.updateLike(res)
                                }).catch((err) => api.errorHandler(err))
                            },
                            handleTrash: (id) => {
                                sessionStorage.setItem('delete_id', id);
                            }
                        })
                        const cardElement = card.generate()
                        section.setNewItem(cardElement)
                    }
                }, selectors.elements)
                section.renderItems()
            })
            .catch((err) => api.errorHandler(err))
        addPopup.closePopup()
    }
}, selectors.popupFormAdd, selectors.popupButtonSave)

const popupUser = document.querySelector('.popup_edit');

const userPopup = new PopupWithForm({
    popup: popupUser,
    handleClose: () => {
        userPopup.closePopup()
    },
    handleSubmit: (values) => {
        console.log(values)
        userPopup.closePopup()
    }
}, selectors.popupFormEdit, selectors.popupButtonSave)

const popupConfirm = document.querySelector('.popup_delete')
const confirmPopup = new PopupWithConfirm({
    popup: popupConfirm,
    handleClose: () => {
        confirmPopup.closePopup()
    },
    handleSubmit: () => {
        api.deleteCard(sessionStorage.getItem('delete_id')).then(res => {

        }).catch((err) => api.errorHandler(err))
    }
});

const buttonPopupAdd = document.querySelector(selectors.popupButtonAdd);
buttonPopupAdd.addEventListener('click', () => addPopup.openPopup())
const buttonPopupEdit = document.querySelector(selectors.popupButtonEdit);
buttonPopupEdit.addEventListener('click', () => userPopup.openPopup())

userInfo.getUserInfo()