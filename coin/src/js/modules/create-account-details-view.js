import { el } from 'redom';
import { formatMoney } from './utils';

export default function createAccountDetailsView({ cssClass, title, id, balance, onBackBtnClick }) {
  const titleEl = el('h2', title, {
    class: 'account-details__title title',
  });
  const backBtn = el('button', '<- Вернуться назад', {
    class: 'account-details__back-btn primary-btn btn-reset',
    onclick: () => {
      onBackBtnClick();
    },
  });
  const accountId = el('span', `№ ${id}`, {
    class: 'account-details__number',
  });
  const balanceContainer = el(
    'div',
    { class: 'account-details__balance-container balance' },
    [
      el('h4', 'Баланс', { class: 'balance__title' }),
      el('span', formatMoney(balance), { class: 'balance__value' }),
    ]
  );
  const primaryDataContainer = el(
    'div',
    { class: `${cssClass} account-details` },
    [titleEl, backBtn, accountId, balanceContainer]
  );

  return primaryDataContainer;
}
