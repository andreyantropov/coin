import '../../../css/history.css';

import { el } from 'redom';
import { createBalancePlotView, createTransactionsPlotView } from './create-plot-view.js';
import createTransactionsHistoryTableView from './create-transactions-history-table-view.js';
import createAccountDetailsView from './create-account-details-view.js';

export default function createTransactionsHistorySectionView({ account, onBackBtnClick }) {
  const details = createAccountDetailsView({ cssClass: 'history__account-details', title: 'История баланса', id: account.account, balance: account.balance, onBackBtnClick: onBackBtnClick });
  const balancePlot = createBalancePlotView({ cssClass: 'history__plot history__plot_balance', account: account, monthCount: 12, onClick: () => {}, });
  const transactionsPlot = createTransactionsPlotView({ cssClass: 'history__plot history__plot_transactions', account: account, monthCount: 12, onClick: () => {}, });
  const table = createTransactionsHistoryTableView({ cssClass: 'history__table', account: account, onClick: () => {}, });
  const content = el('div', { class: 'history__content' }, [ balancePlot, transactionsPlot, table ]);

  const wrapper = el('div', { class: 'history__wrapper wrapper' }, [ details, content ]);
  const accountContainer = el(
    'div',
    { class: 'history__container container' },
    [wrapper]
  );
  const section = el('section', { class: 'history' }, [accountContainer]);

  return section;
}
