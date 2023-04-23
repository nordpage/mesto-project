import '../index.css';
import {
    closePopup,
    handleFormAddSubmit,
    handleFormAvatarSubmit,
    handleFormDeleteSubmit,
    handleFormEditSubmit,
    openPopup
} from "./modal";
import {loadCards} from "./card";
import {enableValidation} from "./validate";

import {
    buttonAdd,
    buttonEdit,
    closeButtons, currentUser,
    nameInput, overlays,
    popupAdd, popupAvatar,
    popupEdit, popupFormAdd, popupFormAvatar, popupFormDelete, popupFormEdit, profileAvatar, profileAvatarContainer,
    profileName,
    profileStatus,
    statusInput
} from "./utils";
import {getInitialCards, getUserInfo} from "./api";


function loadEditValues() {
    nameInput.value = profileName.textContent;
    statusInput.value = profileStatus.textContent;
}

buttonAdd.addEventListener('click', () => {
    const submitButton = popupAdd.querySelector('.popup__button-save');
    submitButton.setAttribute('disabled', '');
    openPopup(popupAdd)
});
buttonEdit.addEventListener('click', () => {
    openPopup(popupEdit);
    loadEditValues();
});

profileAvatarContainer.addEventListener('click', () => openPopup(popupAvatar));

closeButtons.forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

overlays.forEach(overlay => {
    const popup = overlay.closest('.popup');
    overlay.addEventListener('click', () => closePopup(popup));
});

popupFormAdd.addEventListener('submit', function (e) {
    e.preventDefault();
    handleFormAddSubmit(e);
});

popupFormEdit.addEventListener('submit', function (e) {
    e.preventDefault();
    handleFormEditSubmit(e);
})

popupFormAvatar.addEventListener('submit', function (e) {
    e.preventDefault();
    handleFormAvatarSubmit(e);
})

popupFormDelete.addEventListener('submit', function (e) {
    e.preventDefault();
    handleFormDeleteSubmit();
})

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input_error_active'
});

function loadUserInfo(result) {
    profileAvatar.src = result.avatar;
    profileName.textContent = result.name;
    profileStatus.textContent = result.about;
    currentUser.userId = result._id;
}

getUserInfo()
    .then(result => loadUserInfo(result))
    .catch((err) => {
        console.log(err);
    });


getInitialCards()
    .then(result => loadCards(result))
    .catch((err) => {
        console.error(err);
    });



