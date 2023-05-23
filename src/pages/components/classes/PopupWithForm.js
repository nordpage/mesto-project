import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor({popup, handleClose, handleSubmit}, formSelector, submitSelector) {
        super(popup, {handleClose});
        this._handleSubmit = handleSubmit;
        this._popupForm = this._popup.querySelector(formSelector);
        this._buttonSubmit = this._popup.querySelector(submitSelector);
    }
    openPopup() {
        this.setEventListeners();
        super.openPopup();
    }

    closePopup() {
        super.closePopup();
        this._popupForm.reset();
    }

    _submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData(this._popupForm);
        const obj = Object.fromEntries(formData);
        this._handleSubmit(obj);
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', this._submitForm);
    }
}