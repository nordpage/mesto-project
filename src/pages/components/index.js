import '../index.css';
import {
    closePopup,
    openPopup
} from "./modal";
import {createCard, loadCards} from "./card";
import {enableValidation} from "./validate";

import {
    avatarInput,
    buttonAdd,
    buttonEdit, cards,
    closeButtons, currentUser, linkInput,
    nameInput, overlays,
    popupAdd, popupAvatar, popupDelete,
    popupEdit, popupFormAdd, popupFormAvatar, popupFormDelete, popupFormEdit, profileAvatar, profileAvatarContainer,
    profileName,
    profileStatus, selectedCard,
    statusInput, submitAddButton, submitAvatarButton, submitEditButton, titleInput
} from "./utils";
import {addCard, deleteCard, getInitialCards, getUserInfo, updateUserInfo, uploadAvatarImage} from "./api";


function loadEditValues() {
    nameInput.value = profileName.textContent;
    statusInput.value = profileStatus.textContent;
}

buttonAdd.addEventListener('click', () => {
    submitAddButton.setAttribute('disabled', '');
    openPopup(popupAdd)
});
buttonEdit.addEventListener('click', () => {
    openPopup(popupEdit);
    loadEditValues();
});

profileAvatarContainer.addEventListener('click', () => {
    submitAvatarButton.setAttribute('disabled', '');
    openPopup(popupAvatar)
});

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


Promise.all([
    getUserInfo(),
    getInitialCards() ])
    .then(([info, initialCards])=>{
        currentUser.userId = info._id;
        loadUserInfo(info);
        loadCards(initialCards);
    })
    .catch((err)=>{
        console.log(err);
    })

function handleFormAvatarSubmit(evt) {
    submitAvatarButton.textContent = "Сохранение...";
    uploadAvatarImage(avatarInput.value)
        .then(res => {
            profileAvatar.src = res.avatar;
            evt.target.reset();
            closePopup(popupAvatar);
        })
        .catch((err) => console.log(err))
        .finally(() => submitAvatarButton.textContent = "Сохранить");
}

function handleFormDeleteSubmit() {
    deleteCard(selectedCard._id)
        .then(() => {
            closePopup(popupDelete);
            Object.assign(selectedCard,{});
        })
        .then(() => {
            getInitialCards()
                .then(res => loadCards(res))
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
}

function handleFormEditSubmit(evt) {
    profileName.textContent = nameInput.value;
    profileStatus.textContent = statusInput.value;
    submitEditButton.textContent = "Сохранение...";
    updateUserInfo(nameInput.value, statusInput.value)
        .then(() => {
            evt.target.reset();
            closePopup(popupEdit);
        })
        .catch((err) => console.log(err))
        .finally(() => submitEditButton.textContent = "Сохранить");
}

function handleFormAddSubmit(evt) {
    submitAddButton.textContent = "Сохранение...";
    addCard(titleInput.value, linkInput.value)
        .then(res => {
            const fetchedCard = Object.assign({}, res);
            fetchedCard.myCard = res.owner._id === currentUser.userId;
            const cardElement = createCard(fetchedCard);
            cards.prepend(cardElement);
            evt.target.reset();
            closePopup(popupAdd);
        })
        .catch((err) => console.log(err))
        .finally(() => submitAddButton.textContent = "Сохранить");
}