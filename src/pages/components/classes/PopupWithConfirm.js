import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
    constructor(popup, handleClose, {handleSubmit}) {
        super(popup, handleClose);
        this._handleSubmit = handleSubmit;
    }
}