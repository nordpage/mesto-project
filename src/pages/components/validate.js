import {closePopup} from "./modal";
import {createCard} from "./card";


const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};

export const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (inputElement.classList.contains('popup__input_type_error') || inputElement.classList.contains('popup__input-error_active')){
        inputElement.classList.remove('popup__input_type_error');
        errorElement.classList.remove('popup__input-error_active');
        errorElement.textContent = '';
    }
};

const checkInputValidity = (formElement, inputElement) => {

    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

export const inputListByForm = (formElement) => {
    return Array.from(formElement.querySelectorAll('.popup__input'))
}

const setEventListeners = (formElement) => {
    const inputList = inputListByForm(formElement);
    const buttonElement = formElement.querySelector('.popup__button-save');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
    document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
            closePopup(formElement.closest('.popup'))
        }
    })
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            if (evt.target.contains('popup__form_edit')) {
                handleFormEditSubmit(evt);
            } else if (evt.target.contains('popup__form_add')) {
                handleFormAddSubmit(evt);
            }
        });

        setEventListeners(formElement);
    });
};

function handleFormEditSubmit(evt) {
    evt.preventDefault();
    const popupEdit = document.querySelector('.popup_edit');
    const profileName = document.querySelector('.profile__name');
    const profileStatus = document.querySelector('.profile__status');
    const nameInput = document.querySelector('.popup__input_text_name');
    const statusInput = document.querySelector('.popup__input_text_status');
    profileName.textContent = nameInput.value;
    profileStatus.textContent = statusInput.value;
    closePopup(popupEdit);
}

function handleFormAddSubmit(evt) {
    evt.preventDefault();
    const popupAdd = document.querySelector('.popup_add');
    const titleInput = document.querySelector('.popup__input_text_title');
    const linkInput = document.querySelector('.popup__input_text_link');
    const card = {name: titleInput.value, link: linkInput.value}
    createCard(card);
    evt.target.reset();
    closePopup(popupAdd);
}

enableValidation();

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__button-inactive');
    } else {
        buttonElement.classList.remove('popup__button-inactive');
    }
}