import '../index.css';
import {closePopup, openPopup} from "./modal";
import {loadCards} from "./card";
import {enableValidation} from "./validate";
import {
    buttonAdd,
    buttonEdit,
    closeButtons,
    nameInput, overlays,
    popupAdd,
    popupEdit,
    profileName,
    profileStatus,
    statusInput
} from "./utils";


function loadEditValues() {
    nameInput.value = profileName.textContent;
    statusInput.value = profileStatus.textContent;
}

buttonAdd.addEventListener('click', () => {
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
})

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input_error_active',
    popupAdd: 'popup__form_add',
    popupEdit: 'popup__form_edit'
});

loadCards();