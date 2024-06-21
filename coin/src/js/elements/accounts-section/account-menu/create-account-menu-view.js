import * as styles from './account-menu.module.css';

import { el } from 'redom';
import getSprite from '../../../utils/get-sprite';

export default function createAccountMenuView({
  onSortSelectChange,
  onNewBtnClick,
}) {
  const plusIcon = getSprite('./img/icons.svg#icon-plus', 'icon_plus');

  const title = el('h2', 'Ваши счета', { class: `${styles.title} title accounts-title` });
  const select = el(
    'select',
    {
      class: `${styles.select} control control_select`,
      onchange: () => {
        onSortSelectChange(select.value);
      },
    },
    [
      el('option', 'Сортировка', {
        class: 'option',
        hidden: true,
        disabled: true,
        selected: true,
      }),
      el('option', 'По номеру', { class: 'option' }),
      el('option', 'По балансу', {
        class: 'option',
      }),
      el('option', 'По последней транзакции', { class: 'option' }),
    ]
  );
  const newBtn = el(
    'button',
    {
      class: `${styles.newBtn} primary-btn btn-reset accounts-new-btn`,
      onclick: async () => {
        await onNewBtnClick();
        onSortSelectChange(select.value);
      },
    },
    [plusIcon, el('span', 'Создать новый счет')]
  );
  const topMenu = el('div', { class: styles.menu }, [
    title,
    select,
    newBtn,
  ]);

  return topMenu;
}
