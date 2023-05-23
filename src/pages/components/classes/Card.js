import {classes, selectors} from "../utils";

export default class Card {
    constructor(card, templateSelector, {handleClick, handleTrash, handleLike}) {
        this._card = {
            id: card._id,
            name: card.name,
            link: card.link,
            likes: card.likes,
            owner: card.owner
        }
        this._templateSelector = templateSelector;
        this._handleClick = handleClick;
        this._handleTrash = handleTrash;
        this._handleLike = handleLike;
    }

    _setListeners() {
        const toggled = this._cardLike.classList.contains('element__button-like-active') ? "DELETE" : "PUT";
        this._cardLike.addEventListener('click', this._handleLike(this._card.id, toggled))
        if (this._isCardOwner()) {
            this._cardTrash.addEventListener('click', this._handleTrash(this._card.id))
        }
        this._cardImage.addEventListener('click', this._handleClick(this._card.id))
    }

    updateLike(result) {
        this._cardLikeTitle.textContent = result.likes.length
        this._cardLike.classList.toggle('element__button-like-active');
    }

    _isCardOwner() {
        if (this._card.owner._id === sessionStorage.getItem('userId')) {
            return true;
        } else {
            this._cardTrash.classList.add(classes.elementTrashHidden);
            return false;
        }
    }

    generate() {
        this._cardTemplate = document.querySelector(this._templateSelector).content;
        this._cardElement = this._cardTemplate.querySelector(selectors.element).cloneNode(true);
        this._cardImage = this._cardElement.querySelector(selectors.elementImage);
        this._cardTitle = this._cardElement.querySelector(selectors.elementTitle);
        this._cardLike = this._cardElement.querySelector(selectors.elementButtonLike);
        this._cardTrash = this._cardElement.querySelector(selectors.elementTrash);
        this._cardLikeTitle = this._cardElement.querySelector(selectors.elementLikeTitle);

        this._cardImage.src = this._card.link;
        this._cardImage.alt = 'Картинка, изображающая ' + this._card.name;
        this._cardTitle.textContent = this._card.name;
        this._cardLikeTitle.textContent = this._card.likes.length;

        this._setListeners()

        return this._cardElement;
    }
}