const initialCards = [
    {
      name: 'Клайпеда',
      link: 'https://images.unsplash.com/photo-1600110306971-6e13c9d52341?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80'
    },
    {
      name: 'Вильнюс',
      link: 'https://images.unsplash.com/photo-1577372309907-1b384c4db21b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
    },
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const cardTemplate = document.querySelector('#element').content;
const cards = document.querySelector('.elements');

function loadCards() {
    while (cards.firstChild) cards.removeChild(cards.firstChild);
    initialCards.forEach(card => {
        const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
        cardElement.querySelector('.element__image').src = card.link;
        cardElement.querySelector('.element__image').alt = card.name;
        cardElement.querySelector('.element__title').textContent = card.name;
        cards.append(cardElement);
    });
}

function eventListeners() {
    const addPopup = document.querySelector('.add-place__popup');
    const addElementButton = document.querySelector('.profile__button-add');
    const addPopupClose = document.querySelector('.add-place__popup-button-close');
    const addPopupSave = document.querySelector('.add-place__popup-button-save');
    const elements = document.querySelectorAll('.element');

    elements.forEach(cardElement => {
        cardElement.querySelector('.element__button-like').addEventListener('click', function (evt) {
            evt.target.classList.toggle('element__button-like-active');
        });
        cardElement.querySelector('.element__trash').addEventListener('click', function (evt) {
            evt.target.parentNode.remove()
        });
        const cardImage = cardElement.querySelector('.element__image').src;
        const cardName = cardElement.querySelector('.element__title').textContent;
        cardElement.querySelector('.element__image').addEventListener('click', function (evt) {
            document.querySelector('.elements_popup').classList.add('elements_popup_opened');
            document.querySelector('.elements_popup__image').src = cardImage;
            document.querySelector('.elements_popup__title').textContent = cardName;
        });
        document.querySelector('.elements_popup__button-close').addEventListener('click', () => {
            document.querySelector('.elements_popup').classList.remove('elements_popup_opened');
        });
    });

    addElementButton.addEventListener('click', function () {
        addPopup.classList.add('add-place__popup-opened');
    });

    addPopupClose.addEventListener('click', function (){
        addPopup.classList.remove('add-place__popup-opened');
    })

    addPopupSave.addEventListener('click', function (evt) {
        evt.preventDefault();
        const nameInput = document.querySelector('.add-place__popup-input_text_name');
        const linkInput = document.querySelector('.add-place__popup-input_text_link');
        const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
        cardElement.querySelector('.element__image').src = linkInput.value;
        cardElement.querySelector('.element__image').alt = nameInput.value;
        cardElement.querySelector('.element__title').textContent = nameInput.value;
        cards.append(cardElement);
        const card = {name: nameInput.value, link: linkInput.value}
        initialCards.push(card);
        eventListeners();
        addPopup.classList.remove('add-place__popup-opened');
    })
}

loadCards();
eventListeners();