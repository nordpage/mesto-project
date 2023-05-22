import {openPopup} from "./modal";
import {
    cards,
    cardTemplate, currentUser, popupDelete,
    popupImage,
    popupPreview,
    popupPreviewTitle,
    selectedCard
} from "./utils";
import {likes} from "./api";

export function loadCards(result) {
    cards.innerHTML = '';
    result.forEach(card => {
        const fetchedCard = Object.assign({}, card);
        fetchedCard.myCard = card.owner._id === currentUser.userId;
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
    cardLikeTitle.textContent = card.likes.length;
    cardLike.addEventListener('click', () => {
        const toggled = cardLike.classList.contains('element__button-like-active') ? "DELETE" : "PUT";
        likes(toggled , card._id)
            .then(result => {
                cardLikeTitle.textContent = result.likes.length
                cardLike.classList.toggle('element__button-like-active');
            })
            .catch((err) => {
                console.log(err);
            });

    });
    if (card.myCard) {
        cardTrash.addEventListener('click', () => {
            Object.assign(selectedCard, card);
            openPopup(popupDelete);
        })
    } else {
        cardTrash.classList.add('element__trash_hidden')
    }

    cardImage.addEventListener('click', () => {
        openPopup(popupPreview);
        popupImage.src = card.link;
        popupImage.alt = `Изображение ${card.name} в превью элемента`
        popupPreviewTitle.textContent = card.name;
    });
    return cardElement;
}