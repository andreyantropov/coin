import { el, mount } from 'redom';
import Transaction from './transaction.js';

export default function createTransactionsHistoryTableView(
  container,
  transactionList
) {
  const title = el('h3', 'История переводов', {
    class: 'table__title',
  });
  const table = el('table', { class: 'table__table' }, [
    el('thead', { class: 'table__thead' }, [
      el('tr', { class: 'table__tr' }, [
        el('th', 'Счёт отправителя', { class: 'table__th table__th_from' }),
        el('th', 'Счёт получателя', { class: 'table__th table__th_to' }),
        el('th', 'Сумма', { class: 'table__th table__th_amount' }),
        el('th', 'Дата', { class: 'table__th table__th_date' }),
      ]),
    ]),
    el('tbody', { class: 'table__tbody' }, [
      transactionList.slice(0, 10).map((element) => {
        const transaction = new Transaction(element);
        return transaction.createElement();
      })
    ]),
  ]);

  const tableContainer = el('div', { class: 'account-data__table table' }, [
    title,
    table,
  ]);

  mount(container, tableContainer);
  return tableContainer;
}
