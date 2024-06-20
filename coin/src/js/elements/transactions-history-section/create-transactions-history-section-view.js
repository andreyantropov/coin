import * as styles from './history.module.css';

import { el } from 'redom';
import Sortable from 'sortablejs';
import { createBalancePlotView, createTransactionsPlotView } from '../shared/plot/create-plot-view.js';
import createTransactionsHistoryTableView from '../shared/transactions-history-table/create-transactions-history-table-view.js';
import createAccountDetailsView from '../shared/account-details/create-account-details-view.js';

export default function createTransactionsHistorySectionView({ account, onBackBtnClick }) {
  const details = createAccountDetailsView({ cssClass: '', title: 'История баланса', id: account.account, balance: account.balance, onBackBtnClick: onBackBtnClick });
  const balancePlot = createBalancePlotView({ cssClass: `${styles.plot}`, account: account, monthCount: 12, onClick: () => {}, });
  const transactionsPlot = createTransactionsPlotView({ cssClass: `${styles.plot}`, account: account, monthCount: 12, onClick: () => {}, });
  const table = createTransactionsHistoryTableView({ cssClass: '', account: account, rowsCount: 25, onClick: () => {}, });
  const content = el('div', { class: styles.content }, [ balancePlot, transactionsPlot, table ]);

  const sortable = new Sortable(content, {
    animation: 150,
    group: {
      name: 'history-content-group',
    },
  });

  const wrapper = el('div', { class: `wrapper` }, [ details, content ]);
  const accountContainer = el(
    'div',
    { class: `container` },
    [wrapper]
  );
  const section = el('section', [accountContainer]);

  return section;
}
