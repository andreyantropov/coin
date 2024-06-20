import * as styles from'../../../css/account-details.module.css';

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
  const backIcon = getSprite('./img/icons.svg#icon-back', 'icon_back');

  const titleEl = el('h2', title, {
    class: `${styles.title} title`,
  });
  const backBtn = el(
    'button',
    {
      class: `${styles.backBtn} primary-btn btn-reset`,
      onclick: () => {
        onBackBtnClick();
      },
    },
    [backIcon, el('span', 'Вернуться назад')]
  );
  const accountId = el('span', `№ ${id}`, {
    class: styles.number,
  });
  const balanceContainer = el(
    'div',
    { class: `${styles.balance}` },
    [
      el('h4', 'Баланс', { class: styles.balanceTitle }),
      el('span', formatMoney(balance), { class: styles.balanceValue }),
    ]
  );
  const primaryDataContainer = el(
    'div',
    { class: `${cssClass} ${styles.details}` },
    [titleEl, backBtn, accountId, balanceContainer]
  );

  return primaryDataContainer;
}
