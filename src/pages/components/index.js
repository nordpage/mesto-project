import '../index.css';
import {closePopup, handleFormAddSubmit, handleFormEditSubmit, openPopup} from "./modal";
import {loadCards} from "./card";
import {enableValidation} from "./validate";
import {
    buttonAdd,
    buttonEdit,
    closeButtons,
    nameInput, overlays,
    popupAdd,
    popupEdit, popupFormAdd, popupFormEdit,
    profileName,
    profileStatus,
    statusInput
} from "./utils";


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
    handleFormEditSubmit(e)
})

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input_error_active'
});

loadCards();