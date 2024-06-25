import { el } from 'redom';
import Sortable from 'sortablejs';
import * as styles from './transactions-history-section.module.css';
import {
  createBalancePlotView,
  createTransactionsPlotView,
} from '../shared/plot/create-plot-view.js';
import createTransactionsHistoryTableView from '../shared/transactions-history-table/create-transactions-history-table-view.js';
import createAccountDetailsView from '../shared/account-details/create-account-details-view.js';
import {
  ANIMATION_DURATION,
  TRANSACTIONS_HISTORY_MONTH_COUNT,
  TRANSACTIONS_HISTORY_TABLE_ROWS_COUNT,
} from '../../const.js';

export default function createTransactionsHistorySectionView({
  account,
  onBackBtnClick,
}) {
  const details = createAccountDetailsView({
    cssClass: '',
    title: 'История баланса',
    id: account.account,
    balance: account.balance,
    onBackBtnClick,
  });
  const balancePlot = createBalancePlotView({
    cssClass: `${styles.plot}`,
    account,
    monthCount: TRANSACTIONS_HISTORY_MONTH_COUNT,
    onClick: () => {},
  });
  const transactionsPlot = createTransactionsPlotView({
    cssClass: `${styles.plot}`,
    account,
    monthCount: TRANSACTIONS_HISTORY_MONTH_COUNT,
    onClick: () => {},
  });
  const table = createTransactionsHistoryTableView({
    cssClass: '',
    account,
    rowsCount: TRANSACTIONS_HISTORY_TABLE_ROWS_COUNT,
    onClick: () => {},
  });
  const content = el('div', { class: styles.content }, [
    balancePlot,
    transactionsPlot,
    table,
  ]);

  const sortable = new Sortable(content, {
    animation: ANIMATION_DURATION,
    group: {
      name: 'history-content-group',
    },
  });

  const wrapper = el('div', { class: `wrapper` }, [details, content]);
  const accountContainer = el('div', { class: `container` }, [wrapper]);
  const section = el('section', [accountContainer]);

  return section;
}
