import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor({popup, handleClose, handleSubmit}, formSelector, submitSelector) {
        super(popup, handleClose)
        this._handleSubmit = handleSubmit;
        this._popupForm = popup.querySelector(formSelector);
        this._buttonSubmit = popup.querySelector(submitSelector);
    }
    openPopup() {
        super.openPopup();
    }

    closePopup() {
        super.closePopup();
      //  this._popupForm.reset();
    }

    _submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData(this._popupForm);
        const obj = Object.fromEntries(formData);
        console.log(obj);
        this._handleSubmit(obj);
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', this._submitForm);
    }


}