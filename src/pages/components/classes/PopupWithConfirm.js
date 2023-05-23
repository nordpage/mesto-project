import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
    constructor({popup, handleClose, handleSubmit}) {
        super(popup, handleClose);
        this._handleSubmit = handleSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', this._handleSubmit);
    }

    openPopup() {
        this.setEventListeners()
        super.openPopup();
    }

    closePopup() {
        super.closePopup();
    }


}