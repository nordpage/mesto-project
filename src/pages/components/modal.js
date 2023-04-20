import {createCard} from "./card";
import {
    cards,
    linkInput,
    nameInput,
    popupAdd,
    popupEdit,
    profileName,
    profileStatus,
    statusInput,
    titleInput
} from "./utils";

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


export function handleFormEditSubmit(evt) {
    profileName.textContent = nameInput.value;
    profileStatus.textContent = statusInput.value;
    evt.target.reset();
    closePopup(popupEdit);
}

export function handleFormAddSubmit(evt) {
    const card = {name: titleInput.value, link: linkInput.value}
    const cardElement = createCard(card);
    cards.prepend(cardElement);
    evt.target.reset();
    closePopup(popupAdd);
}