const buttonEdit = document.querySelector('.profile__button-edit');
const buttonClose = document.querySelector('.popup__button-close');


const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_text_name');
const statusInput = document.querySelector('.popup__input_text_status');
const profile__name = document.querySelector('.profile__name');
const profile__status = document.querySelector('.profile__status');
const popup = document.querySelector('.popup');


function handleFormSubmit(evt) {
    evt.preventDefault();
    profile__name.textContent = nameInput.value;
    profile__status.textContent = statusInput.value;
    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profile__name.textContent;
    statusInput.value = profile__status.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

buttonEdit.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);
