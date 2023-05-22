export default class Section {
    constructor({ data, renderer }, selector) {
        this._data = data;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    renderItems() {
        this._data.forEach((item) => {
            this._renderer(item);
        })
    }

    setItem(element) {
        this._container.prepend(element);
    }

    setNewItem(element) {
        this._container.append(element);
    }
}