import {handleFormAddSubmit, handleFormEditSubmit} from "./modal";

let input;
let buttonSelector;
let inputTypeError;
let inputTypeErrorActive;

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputTypeError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(inputTypeErrorActive);
};

export const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (inputElement.classList.contains(inputTypeError) || inputElement.classList.contains(inputTypeErrorActive)) {
        inputElement.classList.remove(inputTypeError);
        errorElement.classList.remove(inputTypeErrorActive);
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

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(input));
    const buttonElement = formElement.querySelector(buttonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

export const enableValidation = ({
                                     formSelector,
                                     inputSelector,
                                     submitButtonSelector,
                                     inputErrorClass,
                                     errorClass,
                                     popupAdd,
                                     popupEdit
                                 }) => {
    input = inputSelector;
    buttonSelector = submitButtonSelector;
    inputTypeError = inputErrorClass;
    inputTypeErrorActive = errorClass;

    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault()
            if (evt.target.classList.contains(popupEdit)) {
                handleFormEditSubmit(evt);
            } else if (evt.target.classList.contains(popupAdd)) {
                handleFormAddSubmit(evt);
            }
        });

        setEventListeners(formElement);
    });
};


function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', '');
    } else {
        buttonElement.removeAttribute('disabled');
    }
}