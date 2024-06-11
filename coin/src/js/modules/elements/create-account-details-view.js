import { el } from 'redom';
import formatMoney from '../utils/format-money';
import getSprite from '../utils/get-sprite';

export default function createAccountDetailsView({
  cssClass,
  title,
  id,
  balance,
  onBackBtnClick,
}) {
  const backIcon = getSprite('./img/sprite.svg#sprite-back', 'icon_back');

  const titleEl = el('h2', title, {
    class: 'account-details__title title',
  });
  const backBtn = el(
    'button',
    {
      class: 'account-details__back-btn primary-btn btn-reset',
      onclick: () => {
        onBackBtnClick();
      },
    },
    [backIcon, el('span', 'Вернуться назад')]
  );
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
