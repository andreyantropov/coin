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
    const tr = el('tr', { class: 'dictionary__tr currency' }, [
      el('th', `${this._from}/${this._to}`, { class: 'dictionary__th currency__th' }),
      el('td', { class: 'dictionary__td currency__td' }, [
        el('span', formatMoney(this._rate)),
        el('span', this._change),
      ]),
    ]);
    return tr;
  }
}
