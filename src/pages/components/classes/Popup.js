import {classes, selectors} from "../utils";

export default class Popup {

    constructor(popup, {handleClose}) {
        this._popup = popup;
        this._handleClose = handleClose;
    }

    setEventListeners() {
        const overlay = this._popup.querySelector(selectors.popupOverlay)
        overlay.addEventListener('click', () => this._handleClose);

        const closeButton = this._popup.querySelector(selectors.popupButtonClose);
        closeButton.addEventListener('click', () => this._handleClose)
    }

    openPopup() {
        document.addEventListener('keydown', this._escapeHandler)
        this._popup.classList.add(classes.popupOpened);
    }

    closePopup() {
        this._popup.classList.remove(classes.popupOpened);
        document.removeEventListener('keydown', this._escapeHandler);
    }

    _escapeHandler = (e) => {
        if (e.key === "Escape") {
            this.closePopup();
        }
    }
}