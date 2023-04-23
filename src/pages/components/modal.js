import {createCard} from "./card";
import {
    avatarInput,
    cards, currentUser,
    linkInput,
    nameInput,
    popupAdd, popupAvatar, popupDelete,
    popupEdit,
    profileName,
    profileStatus, selectedCard,
    statusInput,
    titleInput
} from "./utils";
import {addCard, deleteCard, updateUserInfo, uploadAvatarImage} from "./api";

export function openPopup(element) {
    document.addEventListener('keydown', escapeHandler)
    element.classList.add('popup_opened');
}

const escapeHandler = (e) => {
    if (e.key === "Escape") {
        const element = document.querySelector('.popup_opened');
        closePopup(element);
    }
}

export function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', escapeHandler);
}

export function handleFormAvatarSubmit(evt) {
    const submitButton = popupAvatar.querySelector('.popup__button-save');
    submitButton.textContent = "Сохранение...";
    uploadAvatarImage(avatarInput.value)
        .then(res => console.log(res.message))
        .catch((err) => console.log(err))
        .finally(() => {
            submitButton.textContent = "Сохранить";
            evt.target.reset();
            closePopup(popupAvatar);
        })
}

export function handleFormDeleteSubmit() {
    deleteCard(selectedCard.id)
        .then(res => console.log(res.message))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            selectedCard.element.remove();
            closePopup(popupDelete);
            selectedCard.id = '';
            selectedCard.element = null;
        })
}

export function handleFormEditSubmit(evt) {
    const submitButton = popupEdit.querySelector('.popup__button-save');
    profileName.textContent = nameInput.value;
    profileStatus.textContent = statusInput.value;
    submitButton.textContent = "Сохранение...";
    updateUserInfo(nameInput.value, statusInput.value)
        .then(() => console.log('Данные профиля успешно изменены!'))
        .catch((err) => console.log(err))
        .finally(() => {
            submitButton.textContent = "Сохранить";
            evt.target.reset();
            closePopup(popupEdit);
        })
}

export function handleFormAddSubmit(evt) {
    const submitButton = popupAdd.querySelector('.popup__button-save');
    submitButton.textContent = "Сохранение...";
    addCard(titleInput.value, linkInput.value)
        .then(res => {
            const fetchedCard = {
                id: res._id,
                name: res.name,
                link: res.link,
                likes: res.likes.length,
                myCard: res.owner._id === currentUser.userId
            }
            const cardElement = createCard(fetchedCard);
            cards.prepend(cardElement);
        })
        .catch((err) => console.log(err))
        .finally(() => {
            submitButton.textContent = "Сохранить";
            evt.target.reset();
            closePopup(popupAdd);
        });
}