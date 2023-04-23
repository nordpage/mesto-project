export const cards = document.querySelector('.elements');
export const buttonAdd = document.querySelector('.profile__button-add');
export const buttonEdit = document.querySelector('.profile__button-edit');
export const closeButtons = document.querySelectorAll('.popup__button-close');
export const overlays = document.querySelectorAll('.popup__overlay');
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileName = document.querySelector('.profile__name');
export const profileStatus = document.querySelector('.profile__status');
export const nameInput = document.querySelector('.popup__input_text_name');
export const statusInput = document.querySelector('.popup__input_text_status');
export const avatarInput = document.querySelector('.popup__input_text_avatar');
export const popupAdd = document.querySelector('.popup_add');
export const popupEdit = document.querySelector('.popup_edit');
export const titleInput = document.querySelector('.popup__input_text_title');
export const linkInput = document.querySelector('.popup__input_text_link');
export const cardTemplate = document.querySelector('#element').content;
export const popupImage = document.querySelector('.popup__image');
export const popupPreview = document.querySelector('.popup_preview');
export const popupPreviewTitle = document.querySelector('.popup__title_preview');
export const previewContainer = document.querySelector('.popup__container_preview');
export const previewImageClasses = ['popup__image_orientation_album', 'popup__image_orientation_portrait'];
export const previewContainerClasses = ['popup__container_preview_album', 'popup__container_preview_portrait'];
export const popupFormAdd = document.querySelector('.popup__form_add');
export const popupFormEdit = document.querySelector('.popup__form_edit');
export const popupFormAvatar = document.querySelector('.popup__form_avatar');
export const popupFormDelete = document.querySelector('.popup__form_delete');
export const popupAvatar = document.querySelector('.popup_avatar');
export const popupDelete = document.querySelector('.popup_delete');
export const profileAvatarContainer = document.querySelector('.profile__avatar_container');

export let currentUser = {
    userId: ''
};

export let selectedCard = {
    id: '',
    element: null
}

