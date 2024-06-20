import * as styles from '../../../css/table.module.css';

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
    const tr = el('tr', { class: `${styles.tr} transaction` }, [
      el('td', this._from, { class: `${styles.td} transaction__data` }),
      el('td', this._to, { class: `${styles.td} transaction__data` }),
      el('td', this.getFormattedAmount(), {
        class: `${styles.td} transaction__data ${this._to === this._accountId ? styles.data_positive : styles.data_negative}`,
      }),
      el('td', formatDate(this._date), {
        class: `${styles.td} transaction__data`,
      }),
    ]);
    return tr;
  }

  getFormattedAmount() {
    return this._to === this._accountId ? `+ ${ formatMoney(this._amount) } ₽` : `- ${ formatMoney(this._amount) } ₽`
  }
}
