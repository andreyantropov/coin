import { el, mount } from 'redom';
import createTransactionFormView from './create-transaction-form-view.js';
import createTransactionsPlotView from './create-transactions-plot-view.js';

export default function createAccountDataSectionView(
  container,
  account,
  { onBackBtnClick, onTransactionsTableClick }
) {
  const title = el('h2', 'Просмотр счёта', {
    class: 'account-data__title title',
  });
  const backBtn = el('button', '<- Вернуться назад', {
    class: 'account-data__back-btn primary-btn reset-btn',
    onclick: () => {
      onBackBtnClick();
    },
  });
  const accountId = el('span', `№ ${account.account}`, {
    class: 'account-data__number',
  });
  const balanceContainer = el(
    'div',
    { class: 'account-data__balance-container' },
    [
      el('h4', 'Баланс', { class: 'account-data__balance-title' }),
      el('span', account.balance, { class: 'account-data__balance-value' }),
    ]
  );
  const primaryDataContainer = el(
    'div',
    { class: 'account-data__primary-data' },
    [title, backBtn, accountId, balanceContainer]
  );

  const content = el('div', { class: 'account-data__content' });
  const transactionForm = createTransactionFormView(content, { onTransactionSubmit: () => { alert('Транзакция') } });
  const transactionsPlot = createTransactionsPlotView(content, account.balance, account.transactions);

  const wrapper = el('div', { class: 'account-data__wrapper' }, [primaryDataContainer, content]);
  const accountContainer = el(
    'div',
    { class: 'account-data__container container' },
    [wrapper]
  );
  const section = el('section', { class: 'account-data' }, [accountContainer]);

  mount(container, section);
  return section;
}
