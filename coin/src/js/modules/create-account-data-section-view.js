import { el } from 'redom';
import createTransactionFormView from './create-transaction-form-view.js';
import createTransactionsPlotView from './create-transactions-plot-view.js';
import createTransactionsHistoryTableView from './create-transactions-history-table-view.js';
import createAccountDetailsView from './create-account-details-view.js';

export default function createAccountDataSectionView(
  { account, onBackBtnClick, onTransactionsTableClick }
) {
  const details = createAccountDetailsView({ cssClass: 'account-data__account-details', id: account.account, balance: account.balance, onBackBtnClick: onBackBtnClick });

  const transactionForm = createTransactionFormView({ cssClass: 'account-data__transaction-form', onTransactionSubmit: () => { alert('Транзакция') } });
  const plot = createTransactionsPlotView({ cssClass: 'account-data__plot', balance: account.balance, transactionList: account.transactions, monthCount: 6, onClick: onTransactionsTableClick, });
  const table = createTransactionsHistoryTableView({ cssClass: 'account-data__table', transactionList: account.transactions, onClick: onTransactionsTableClick, });
  const content = el('div', { class: 'account-data__content' }, [ transactionForm, plot, table ]);

  const wrapper = el('div', { class: 'account-data__wrapper' }, [ details, content ]);
  const accountContainer = el(
    'div',
    { class: 'account-data__container container' },
    [wrapper]
  );
  const section = el('section', { class: 'account-data' }, [accountContainer]);

  return section;
}
