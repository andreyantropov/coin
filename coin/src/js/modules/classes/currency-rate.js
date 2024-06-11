import { el } from 'redom';
import formatMoney from '../utils/format-money';

export default class CurrencyRate {
  constructor({ from, to, rate, change }) {
    this._from = from;
    this._to = to;
    this._rate = rate;
    this._change = change;
  }

  get from() {
    return this._from;
  }

  get to() {
    return this._to;
  }

  get rate() {
    return this._rate;
  }

  get change() {
    return this._change;
  }

  createElement() {
    const use = document.createElementNS("http://www.w3.org/2000/svg", 'use');
    use.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', this.getIcon());
    const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    svg.classList.add('icon_rate-arrow');
    svg.appendChild(use);

    const tr = el('tr', { class: 'dictionary__tr currency' }, [
      el('th', `${this._from}/${this._to}`, { class: 'dictionary__th currency__th' }),
      el('td', { class: 'dictionary__td currency__td' }, [
        el('span', formatMoney(this._rate)),
        svg,
      ]),
    ]);
    return tr;
  }

  getIcon() {
    switch(this._change) {
      case -1:
        return './img/sprite.svg#sprite-arrow-down';
      case 1:
        return './img/sprite.svg#sprite-arrow-up';
      default:
        return '';
    }
  }
}
