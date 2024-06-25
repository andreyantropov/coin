import { el } from 'redom';
import Sortable from 'sortablejs';
import * as styles from './account-data-section.module.css';
import createTransactionFormView from './transaction-form/create-transaction-form-view.js';
import { createBalancePlotView } from '../shared/plot/create-plot-view.js';
import createTransactionsHistoryTableView from '../shared/transactions-history-table/create-transactions-history-table-view.js';
import createAccountDetailsView from '../shared/account-details/create-account-details-view.js';
import { ANIMATION_DURATION, ACCOUNT_DATA_MONTH_COUNT } from '../../const.js';

export default function createAccountDataSectionView({
  account,
  onBackBtnClick,
  numbers,
  onTransactionFormSubmit,
  onTransactionsTableClick,
}) {
  const details = createAccountDetailsView({
    cssClass: '',
    title: 'Просмотр счёта',
    id: account.account,
    balance: account.balance,
    onBackBtnClick,
  });

  const plot = createBalancePlotView({
    cssClass: styles.plot,
    account,
    monthCount: ACCOUNT_DATA_MONTH_COUNT,
    onClick: onTransactionsTableClick,
  });
  const table = createTransactionsHistoryTableView({
    cssClass: '',
    account,
    onClick: onTransactionsTableClick,
  });
  const transactionForm = createTransactionFormView({
    cssClass: '',
    id: account.account,
    numbers,
    onSubmit: async (from, to, amount) => {
      await onTransactionFormSubmit(from, to, amount);
      details.replaceWith(
        createAccountDetailsView({
          cssClass: '',
          title: 'Просмотр счёта',
          id: account.account,
          balance: account.balance,
          onBackBtnClick,
        })
      );
      table.replaceWith(
        createTransactionsHistoryTableView({
          cssClass: '',
          account,
          onClick: onTransactionsTableClick,
        })
      );
      plot.replaceWith(
        createBalancePlotView({
          cssClass: styles.plot,
          account,
          monthCount: ACCOUNT_DATA_MONTH_COUNT,
          onClick: onTransactionsTableClick,
        })
      );
    },
  });

  const topContainer = el('div', { class: styles.topContainer }, [
    transactionForm,
    plot,
  ]);

  const sortableTopContainer = new Sortable(topContainer, {
    animation: ANIMATION_DURATION,
    group: {
      name: 'account-data-top-group',
    },
  });

  const content = el('div', { class: styles.content }, [topContainer, table]);

  const sortableContent = new Sortable(content, {
    animation: ANIMATION_DURATION,
    group: {
      name: 'account-data-content-group',
    },
  });

  const wrapper = el('div', { class: `wrapper` }, [details, content]);
  const accountContainer = el('div', { class: `container` }, [wrapper]);
  const section = el('section', [accountContainer]);

  return section;
}
