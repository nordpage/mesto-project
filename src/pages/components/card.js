import {openPopup} from "./modal";
import {
    cards,
    cardTemplate, currentUser, popupDelete,
    popupImage,
    popupPreview,
    popupPreviewTitle,
    previewContainer,
    previewContainerClasses,
    previewImageClasses, selectedCard
} from "./utils";
import {addLike, removeLike} from "./api";

export function loadCards(result) {
    while (cards.firstChild) cards.removeChild(cards.firstChild);
    result.forEach(card => {
        const fetchedCard = {
            id: card._id,
            name: card.name,
            link: card.link,
            likes: card.likes.length,
            myCard: card.owner._id === currentUser.userId
        }
        const cardElement = createCard(fetchedCard);
        cards.prepend(cardElement);
    });
}

export function createCard(card) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const cardTitle = cardElement.querySelector('.element__title');
    const cardLike = cardElement.querySelector('.element__button-like');
    const cardTrash = cardElement.querySelector('.element__trash');
    const cardLikeTitle = cardElement.querySelector('.element__like_title');
    cardImage.src = card.link;
    cardImage.alt = 'Картинка, изображающая ' + card.name;
    cardTitle.textContent = card.name;
    cardLikeTitle.textContent = card.likes;
    cardLike.addEventListener('click', () => {
        const toggled = cardLike.classList.toggle('element__button-like-active');
        if (toggled) {
            addLike(card.id)
                .then(result => cardLikeTitle.textContent = result.likes.length)
                .catch((err) => {
                    console.log(err);
                });
        } else {
            removeLike(card.id)
                .then(result => cardLikeTitle.textContent = result.likes.length)
                .catch((err) => {
                    console.log(err);
                });
        }
    });
    if (card.myCard) {
        cardTrash.addEventListener('click', () => {
            selectedCard.id = card.id;
            selectedCard.element = cardElement;
            openPopup(popupDelete);
        })
    } else {
        cardTrash.classList.add('element__trash_hidden')
    }

    cardImage.addEventListener('click', () => {
        getMeta(card.link, (err, img) => {
            const index = img.naturalWidth > img.naturalHeight ? 0 : 1;

            addPreviewClasses(index);

        });
        openPopup(popupPreview);
        popupImage.src = card.link;
        popupImage.alt = `Изображение ${card.name} в превью элемента`
        popupPreviewTitle.textContent = card.name;
    });
    return cardElement;
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