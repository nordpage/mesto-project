export default class FormValidator {
    constructor(options, form) {
        this._inputSelector = options.inputSelector;
        this._submitButtonSelector = options.submitButtonSelector;
        this._inputErrorClass = options.inputErrorClass;
        this._errorClass = options.errorClass;
        this._form = form;
    }

    setEventListeners() {
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._buttonElement = this._form.querySelector(this._submitButtonSelector);
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    _checkInputValidity(inputElement) {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity("");
        }

        if (!inputElement.validity.valid) {
            this._showInputError(this._form, inputElement, inputElement.validationMessage);
        } else {
            this.hideInputError(this._form, inputElement);
        }
    };

    _showInputError (inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        if (inputElement.classList.contains(this._inputErrorClass) || inputElement.classList.contains(this._errorClass)) {
            inputElement.classList.remove(this._inputErrorClass);
            errorElement.classList.remove(this._errorClass);
            errorElement.textContent = '';
        }
    };

    enableValidation() {
        this.setEventListeners();
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.setAttribute('disabled', '');
        } else {
            this._buttonElement.removeAttribute('disabled');
        }
    }
}