import { el } from 'redom';
import formatDate from '../utils/format-date';
import formatMoney from '../utils/format-money';

export default class Transaction {
  constructor({ accountId, amount, date, from, to }) {
    this._accountId = accountId;
    this._amount = amount;
    this._date = date;
    this._from = from;
    this._to = to;
  }

  get accountId() {
    return this._accountId;
  }

  get amount() {
    return this._amount;
  }

  get date() {
    return this._date;
  }

  get from() {
    return this._from;
  }

  get to() {
    return this._to;
  }

  createElement() {
    const tr = el('tr', { class: 'table__tr transaction' }, [
      el('td', this._from, { class: 'table__td transaction__data' }),
      el('td', this._to, { class: 'table__td transaction__data' }),
      el('td', formatMoney(this._amount), {
        class: `table__td transaction__data ${this._to === this._accountId ? 'transaction__data_positive' : 'transaction__data_negative'}`,
      }),
      el('td', formatDate(this._date), {
        class: 'table__td transaction__data',
      }),
    ]);
    return tr;
  }
}
