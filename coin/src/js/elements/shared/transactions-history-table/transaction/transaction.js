import * as styles from './transaction.module.css';

import { el } from 'redom';
import formatDate from '../../../../utils/format-date';
import formatMoney from '../../../../utils/format-money';

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
    const tr = el('tr', { class: `${styles.tr}` }, [
      el('td', this._from, { class: `${styles.td}` }),
      el('td', this._to, { class: `${styles.td}` }),
      el('td', this.getFormattedAmount(), {
        class: `${styles.td} ${this._to === this._accountId ? styles.td_positive : styles.td_negative}`,
      }),
      el('td', formatDate(this._date), {
        class: `${styles.td}`,
      }),
    ]);
    return tr;
  }

  getFormattedAmount() {
    return this._to === this._accountId ? `+ ${ formatMoney(this._amount) } ₽` : `- ${ formatMoney(this._amount) } ₽`
  }
}
