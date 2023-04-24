export function openPopup(element) {
    document.addEventListener('keydown', escapeHandler)
    element.classList.add('popup_opened');
}

const escapeHandler = (e) => {
    if (e.key === "Escape") {
        const element = document.querySelector('.popup_opened');
        closePopup(element);
    }
}

export function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', escapeHandler);
}