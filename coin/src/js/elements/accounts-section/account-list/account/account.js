import { el } from 'redom';
import * as styles from './account.module.css';

import formatDate from '../../../../utils/format-date';
import formatMoney from '../../../../utils/format-money';

export default class Account {
  constructor({ account, balance, transactions, onClick }) {
    this._account = account;
    this._balance = balance;
    this._transactions = transactions;
    this.onClick = onClick;
  }

  get account() {
    return this._account;
  }

  get balance() {
    return this._balance;
  }

  get transactions() {
    return this._transactions;
  }

  createElement() {
    const li = el(
      'li',
      {
        class: `${styles.account} accounts-item`,
      },
      [
        el('h3', this._account, { class: styles.title }),
        el('span', formatMoney(this._balance), { class: styles.balance }),
        el('div', { class: styles.container }, [
          el('div', { class: styles.transaction }, [
            el('h4', 'Последняя транзакция', { class: styles.subtitle }),
            el('span', this.getLastTransactionFormattedDate(), {
              class: styles.date,
            }),
          ]),
          el('button', 'Открыть', {
            class: `${styles.btn} primary-btn btn-reset account-btn`,
            onclick: () => this.onClick(),
          }),
        ]),
      ]
    );
    return li;
  }

  getLastTransactionFormattedDate() {
    if (!this._transactions.length) return '';

    return formatDate(this._transactions[0].date);
  }
}
