import { el } from 'redom';

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
      [
        el('h3', this._id, { class: 'account__title' }),
        el('span', this._balance, { class: 'account__balance' }),
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
      {
        class: 'accounts__item account',
      }
    );
    return li;
  }

  getLastTransactionFormattedDate() {
    if (!this._transactions.length) return '';

    const date = new Date(this._transactions[0].date);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('ru-RU', options);

    return formattedDate;
  }
}
