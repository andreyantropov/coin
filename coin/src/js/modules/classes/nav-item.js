import { el } from 'redom';

export default class NavItem {
    constructor({ text, href, isActive }) {
        this._text = text;
        this._href = href;
        this._isActive = isActive;
    }

    get text() {
        return this._text;
    }

    get href() {
        return this._href;
    }

    get isActive() {
        return this._isActive;
    }

    createElement() {
        const li = el('li', { class: 'nav__item' }, [
            el('a', this._text, { class: `nav__link ${this._isActive ? 'nav__link_active' : ''}`, href: this._href, }),
        ]);
        return li;
    }
}