import '../index.css';
import {openPopup, closePopup} from "./modal";
import {loadCards} from "./card";

const buttonAdd = document.querySelector('.profile__button-add');
const buttonEdit = document.querySelector('.profile__button-edit');
const closeButtons = document.querySelectorAll('.popup__button-close');

function loadEditValues() {
    const profileName = document.querySelector('.profile__name');
    const profileStatus = document.querySelector('.profile__status');
    const nameInput = document.querySelector('.popup__input_text_name');
    const statusInput = document.querySelector('.popup__input_text_status');
    nameInput.value = profileName.textContent;
    statusInput.value = profileStatus.textContent;
}

buttonAdd.addEventListener('click', () => {
    const popupAdd = document.querySelector('.popup_add');
    openPopup(popupAdd)
});
buttonEdit.addEventListener('click', () => {
    const popupEdit = document.querySelector('.popup_edit');
    openPopup(popupEdit);
    loadEditValues();
});

closeButtons.forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});


loadCards();