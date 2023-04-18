import {hideInputError, inputListByForm} from "./validate";

export function openPopup(element) {
    const overlay = element.querySelector('.popup__overlay');
    overlay.addEventListener('click', () => closePopup(element));
    element.classList.add('popup_opened');
}

export function closePopup(element) {
    const inputList = inputListByForm(element);
    inputList.forEach(inputElement => {
        hideInputError(element, inputElement);
    });
    element.classList.remove('popup_opened');
}