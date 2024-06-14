import '../../../css/account-menu.css';

import { el } from 'redom';
import getSprite from '../utils/get-sprite';

export default function createAccountMenuView({
  onSortSelectChange,
  onNewBtnClick,
}) {
  const plusIcon = getSprite('./img/sprite.svg#sprite-plus', 'icon_plus');

  const title = el('h2', 'Ваши счета', { class: 'accounts__title title' });
  const select = el(
    'select',
    {
      class: 'accounts__select control control_select',
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
      class: 'accounts__new-btn primary-btn btn-reset',
      onclick: async () => {
        await onNewBtnClick();
        onSortSelectChange(select.value);
      },
    },
    [plusIcon, el('span', 'Создать новый счет')]
  );
  const topMenu = el('div', { class: 'accounts__menu' }, [
    title,
    select,
    newBtn,
  ]);

  return topMenu;
}
