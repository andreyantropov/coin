import * as styles from './nav-item.module.css';

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
        const li = el('li', [
            el('a', this._text, { class: `${styles.navLink} ${this._isActive ? styles.navLink_active : ''}`, href: this._href, }),
        ]);
        return li;
    }
}