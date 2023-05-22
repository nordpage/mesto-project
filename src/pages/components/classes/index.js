import '../../index.css';
import {api} from "./Api";

import UserInfo from "./UserInfo";
import {profileAvatar, profileName, profileStatus, selectors} from "../utils";
import Card from "./Card";
import Section from "./Section";
import PopupWithForm from "./PopupWithForm";

const userInfo = new UserInfo(profileAvatar, profileName, profileStatus, {
    handleSetInfo: (res) => {

    }, handleUploadAvatar: () => {

    }
});


api.getInitialCards().then(res => {
    const section = new Section({
        data: res, renderer: (item) => {
            const card = new Card(item, selectors.elementTemplate, {
                handleClick: () => {

                },
                handleLike: () => {

                },
                handleTrash: () => {

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

    },
    handleSubmit: (values) => {
        console.log(values)
       // addPopup.closePopup()
    }
}, selectors.popupFormAdd, selectors.popupButtonSave)

const buttonPopupAdd = document.querySelector(selectors.popupButtonAdd);
buttonPopupAdd.addEventListener('click', () => addPopup.openPopup())

userInfo.getUserInfo()