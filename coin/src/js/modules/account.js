import { el } from 'redom';
import { formatDate, formatMoney } from './utils';

export default class Account {
  constructor({ id, balance, transactions, onClick }) {
    this._id = id;
    this._balance = balance;
    this._transactions = transactions;
    this.onClick = onClick;
  }

  get id() {
    return this._id;
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
        class: 'accounts__item account',
      },
      [
        el('h3', this._id, { class: 'account__title' }),
        el('span', formatMoney(this._balance), { class: 'account__balance' }),
        el('div', { class: 'account__container' }, [
          el('div', { class: 'account__transaction' }, [
            el('h4', 'Последняя транзакция', { class: 'account__subtitle' }),
            el('span', this.getLastTransactionFormattedDate(), {
              class: 'accoutn__date',
            }),
          ]),
          el('button', 'Открыть', {
            class: 'account__btn primary-btn btn-reset',
            onclick: () => this.onClick(),
          }),
        ]),
      ],
    );
    return li;
  }

  getLastTransactionFormattedDate() {
    if (!this._transactions.length) return '';

    return formatDate(this._transactions[0].date);
  }
}
