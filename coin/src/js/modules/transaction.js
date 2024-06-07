import { el } from 'redom';

export default class Transaction {
  constructor({ amount, date, from, to }) {
    this._amount = amount;
    this._date = date;
    this._from = from;
    this._to = to;
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
      el('td', this._amount, {
        class: `table__td transaction__data ${this._amount > 0 ? 'transaction__data_positive' : 'transaction__data_negative'}`,
      }),
      el('td', this.formatDate(this._date), {
        class: 'table__td transaction__data',
      }),
    ]);
    return tr;
  }

  formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
  }
}
