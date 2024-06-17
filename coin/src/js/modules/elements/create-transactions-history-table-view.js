import '../../../css/table.css';

import { el } from 'redom';
import Transaction from '../classes/transaction';

export default function createTransactionsHistoryTableView(
  { cssClass, account, rowsCount = 10, onClick }
) {
  const table = el(
    'table',
    {
      class: 'table__table',
      onclick: () => {
        onClick();
      },
    },
    [
      el('caption', 'История переводов', { class: 'table__caption' }),
      el('thead', { class: 'table__thead' }, [
        el('tr', { class: 'table__tr' }, [
          el('th', 'Счёт отправителя', { class: 'table__th table__th_from' }),
          el('th', 'Счёт получателя', { class: 'table__th table__th_to' }),
          el('th', 'Сумма', { class: 'table__th table__th_amount' }),
          el('th', 'Дата', { class: 'table__th table__th_date' }),
        ]),
      ]),
      el('tbody', { class: 'table__tbody' }, [
        account.transactions.slice(- rowsCount).reverse().map((element) => {
          const transaction = new Transaction({ accountId: account.account, ...element });
          return transaction.createElement();
        }),
      ]),
    ]
  );

  const tableContainer = el('div', { class: `${cssClass} table` }, [
    table,
  ]);

  return tableContainer;
}
