const initialCards = [
    {
        name: 'Клайпеда',
        link: 'https://images.unsplash.com/photo-1600110306971-6e13c9d52341?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80'
    },
    {
        name: 'Вильнюс',
        link: 'https://images.unsplash.com/photo-1571851550172-b085c783ed7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw5NDg3NDcwfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60'
    },
    {
        name: 'Паланга',
        link: 'https://images.unsplash.com/photo-1564149629498-30b54f564074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGFsYW5nYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60'
    },
    {
        name: 'Тракай',
        link: 'https://images.unsplash.com/photo-1592588763563-1e4bca14396c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fFRyYWthaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60'
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

const buttonAdd = document.querySelector('.profile__button-add');
const buttonEdit = document.querySelector('.profile__button-edit');
const cardTemplate = document.querySelector('#element').content;
const cards = document.querySelector('.elements');
const formElementAdd = document.querySelector('.popup__form_add');
const formElementEdit = document.querySelector('.popup__form_edit');
const linkInput = document.querySelector('.popup__input_text_link');
const nameInput = document.querySelector('.popup__input_text_name');
const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const popupImage = document.querySelector('.popup__image');
const popupPreview = document.querySelector('.popup_preview');
const popupPreviewTitle = document.querySelector('.popup__title_preview');
const previewContainer = document.querySelector('.popup__container_preview');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const statusInput = document.querySelector('.popup__input_text_status');
const titleInput = document.querySelector('.popup__input_text_title');
const closeButtons = document.querySelectorAll('.popup__button-close');
const previewImageClasses = ['popup__image_orientation_album', 'popup__image_orientation_portrait'];
const previewContainerClasses = ['popup__container_preview_album', 'popup__container_preview_portrait'];

function handleFormEditSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileStatus.textContent = statusInput.value;
    closePopup(popupEdit);
}

function handleFormAddSubmit(evt) {
    evt.preventDefault();
    const card = {name: titleInput.value, link: linkInput.value}
    createCard(card);
    formElementAdd.reset();
    closePopup(popupAdd);
}

function openPopup(element) {
    element.classList.add('popup_opened');
}

function closePopup(element) {
    element.classList.remove('popup_opened');
}

function loadEditValues() {
    nameInput.value = profileName.textContent;
    statusInput.value = profileStatus.textContent;
}

function loadCards() {
    while (cards.firstChild) cards.removeChild(cards.firstChild);
    initialCards.forEach(card => {
        createCard(card);
    });
}

function createCard(card) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const cardTitle = cardElement.querySelector('.element__title');
    const cardLike = cardElement.querySelector('.element__button-like');
    const cardTrash = cardElement.querySelector('.element__trash');
    cardImage.src = card.link;
    cardImage.alt = 'Картинка, изображающая ' + card.name;
    cardTitle.textContent = card.name;
    cards.prepend(cardElement);
    cardLike.addEventListener('click', (evt) => evt.target.classList.toggle('element__button-like-active'));
    cardTrash.addEventListener('click', (evt) => evt.target.closest('.element').remove());
    cardImage.addEventListener('click', () => {
        getMeta(card.link, (err, img) => {
            const index = img.naturalWidth > img.naturalHeight ? 0 : 1;

            // popupImage.classList.add(previewImageClasses[index]);
            // previewContainer.classList.add(previewContainerClasses[index]);

            addPreviewClasses(index);

        });
        openPopup(popupPreview);
        popupImage.src = card.link;
        popupImage.alt = `Изображение ${card.name} в превью элемента`
        popupPreviewTitle.textContent = card.name;
    });
}

const getMeta = (url, cb) => {
    const img = new Image();
    img.onload = () => cb(null, img);
    img.onerror = (err) => cb(err);
    img.src = url;
};

function addPreviewClasses(index) {
    const popupImageArray = Array.from(popupImage.classList);
    const popupImageMatches = popupImageArray.filter(value => previewImageClasses.includes(value));
   if (popupImageMatches !== null) {
      popupImage.classList.remove(...popupImageMatches);
      popupImage.classList.add(previewImageClasses[index]);
   } else {
       popupImage.classList.add(previewImageClasses[index]);
   }

    const popupImageContainerArray = Array.from(previewContainer.classList);
    const popupImageContainerMatches = popupImageContainerArray.filter(value => previewContainerClasses.includes(value));
    if (popupImageContainerMatches !== null) {
        previewContainer.classList.remove(...popupImageContainerMatches);
        previewContainer.classList.add(previewContainerClasses[index]);
    } else {
        previewContainer.classList.add(previewContainerClasses[index]);
    }


}

formElementEdit.addEventListener('submit', handleFormEditSubmit);
formElementAdd.addEventListener('submit', handleFormAddSubmit);
buttonAdd.addEventListener('click', () => openPopup(popupAdd));
buttonEdit.addEventListener('click', () => {
    openPopup(popupEdit);
    loadEditValues();
});
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});


loadCards();