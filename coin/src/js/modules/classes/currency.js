import { el } from 'redom';
import formatMoney from '../utils/format-money';

export default class Currency {
  constructor({ code, amount }) {
    this._code = code;
    this._amount = amount;
  }

  get code() {
    return this._code;
  }

  get amount() {
    return this._amount;
  }

  createElement() {
    const tr = el('tr', { class: 'dictionary__tr currency' }, [
      el('th', this._code, { class: 'dictionary__th currency__th' }),
      el('td', formatMoney(this._amount), { class: 'dictionary__td currency__td' }),
    ]);
    return tr;
  }
}
