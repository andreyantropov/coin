import '../../../css/account-data.css';

import { el } from 'redom';
import createTransactionFormView from './create-transaction-form-view.js';
import { createBalancePlotView } from './create-plot-view.js';
import createTransactionsHistoryTableView from './create-transactions-history-table-view.js';
import createAccountDetailsView from './create-account-details-view.js';

export default function createAccountDataSectionView({
  account,
  onBackBtnClick,
  onTransactionFormSubmit,
  onTransactionsTableClick,
}) {
  const details = createAccountDetailsView({
    cssClass: 'account-data__account-details',
    title: 'Просмотр счёта',
    id: account.account,
    balance: account.balance,
    onBackBtnClick: onBackBtnClick,
  });

  const plot = createBalancePlotView({
    cssClass: 'account-data__plot',
    account: account,
    monthCount: 6,
    onClick: onTransactionsTableClick,
  });
  const table = createTransactionsHistoryTableView({
    cssClass: 'account-data__table',
    account: account,
    onClick: onTransactionsTableClick,
  });
  const transactionForm = createTransactionFormView({
    cssClass: 'account-data__transaction-form',
    id: account.account,
    onSubmit: async (from, to, amount) => {
      await onTransactionFormSubmit(from, to, amount);
      details.replaceWith(
        createAccountDetailsView({
          cssClass: 'account-data__account-details',
          title: 'Просмотр счёта',
          id: account.account,
          balance: account.balance,
          onBackBtnClick: onBackBtnClick,
        })
      );
      table.replaceWith(
        createTransactionsHistoryTableView({
          cssClass: 'account-data__table',
          account: account,
          onClick: onTransactionsTableClick,
        })
      );
      plot.replaceWith(
        createBalancePlotView({
          cssClass: 'account-data__plot',
          account: account,
          monthCount: 6,
          onClick: onTransactionsTableClick,
        })
      );
    },
  });
  const content = el('div', { class: 'account-data__content' }, [
    transactionForm,
    plot,
    table,
  ]);

  const wrapper = el('div', { class: 'account-data__wrapper wrapper' }, [
    details,
    content,
  ]);
  const accountContainer = el(
    'div',
    { class: 'account-data__container container' },
    [wrapper]
  );
  const section = el('section', { class: 'account-data' }, [accountContainer]);

  return section;
}
