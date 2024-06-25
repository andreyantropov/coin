import { el } from 'redom';
import * as styles from './transactions-history-table.module.css';

import Transaction from './transaction/transaction';

export default function createTransactionsHistoryTableView({
  cssClass,
  account,
  rowsCount = 10,
  onClick,
}) {
  const table = el(
    'table',
    {
      class: styles.table,
      onclick: () => {
        onClick();
      },
    },
    [
      el('caption', 'История переводов', { class: styles.caption }),
      el('thead', { class: styles.thead }, [
        el('tr', [
          el('th', 'Счёт отправителя', {
            class: `${styles.th} ${styles.th_from}`,
          }),
          el('th', 'Счёт получателя', { class: `${styles.th}` }),
          el('th', 'Сумма', { class: `${styles.th}` }),
          el('th', 'Дата', { class: `${styles.th} ${styles.th_date}` }),
        ]),
      ]),
      el('tbody', [
        account.transactions
          .slice(-rowsCount)
          .reverse()
          .map((element) => {
            const transaction = new Transaction({
              accountId: account.account,
              ...element,
            });
            return transaction.createElement();
          }),
      ]),
    ]
  );

  const tableContainer = el(
    'div',
    { class: `${cssClass} ${styles.tableContainer}` },
    [table]
  );

  return tableContainer;
}
