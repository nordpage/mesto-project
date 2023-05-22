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
export const popupFormAdd = document.querySelector('.popup__form_add');
export const popupFormEdit = document.querySelector('.popup__form_edit');
export const popupFormAvatar = document.querySelector('.popup__form_avatar');
export const popupFormDelete = document.querySelector('.popup__form_delete');
export const popupAvatar = document.querySelector('.popup_avatar');
export const popupDelete = document.querySelector('.popup_delete');
export const profileAvatarContainer = document.querySelector('.profile__avatar_container');
export const submitAvatarButton = popupAvatar.querySelector('.popup__button-save');
export const submitAddButton = popupAdd.querySelector('.popup__button-save');
export const submitEditButton = popupEdit.querySelector('.popup__button-save');

export const selectors = {
    elements: '.elements',
    elementTemplate: '#element',
    element: '.element',
    elementImage: '.element__image',
    elementTitle: '.element__title',
    elementButtonLike: '.element__button-like',
    elementTrash: '.element__trash',
    elementLikeTitle: '.element__like_title',
    popupOverlay: '.popup__overlay',
    popupButtonClose: '.popup__button-close',
    popupButtonSave: '.popup__button-save',
    popupButtonAdd: '.profile__button-add',
    popupFormAdd: '.popup__form_add'
}

export const classes = {
    popupOpened: 'popup_opened',
    elementTrashHidden: 'element__trash_hidden'
}

export let currentUser = {
    userId: ''
};

export let selectedCard = {}