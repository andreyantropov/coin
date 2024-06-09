import { el, mount } from 'redom';
import Account from './account.js';

export default function createAccountsSectionView(
  { accountList, onaccountBtnClick, onSortSelectChange, onNewBtnClick }
) {
  const ul = el('ul', { class: 'accounts__list list-reset' });

  const title = el('h2', 'Ваши счета', { class: 'accounts__title title' });
  const select = el(
    'select',
    {
      class: 'accounts__select control control_select',
      onchange: () => {
        sortAndRenderAccounts(ul, accountList, onaccountBtnClick, select.value);
      },
    },
    [
      el('option', 'По номеру', { class: 'option' }),
      el('option', 'По балансу', {
        class: 'option',
        selected: true,
      }),
      el('option', 'По последней транзакции', { class: 'option' }),
    ]
  );
  const newBtn = el('button', '+ Создать новый счет', {
    class: 'accounts__new-btn primary-btn btn-reset',
    onclick: async () => {
      await onNewBtnClick();
      sortAndRenderAccounts(ul, accountList, onaccountBtnClick, select.value);
    },
  });
  const topMenu = el('div', { class: 'accounts__menu' }, [
    title,
    select,
    newBtn,
  ]);

  const wrapper = el('div', { class: 'accounts__wrapper wrapper' }, [topMenu, ul]);
  const accountContainer = el(
    'div',
    { class: 'accounts__container container' },
    [wrapper]
  );
  const section = el('section', { class: 'accounts' }, [accountContainer]);

  sortAndRenderAccounts(ul, accountList, onaccountBtnClick, select.value);

  return section;

  function renderAccounts(container, accountList, onClick) {
    container.innerHTML = '';
    accountList.forEach((element) => {
      const account = new Account({
        ...element,
        id: element.account,
        onClick: () => { onClick(element.account) },
      });
      mount(container, account.createElement());
    });
  }

  function sortAndRenderAccounts(container, accountList, onClick, sortOption = '') {
    onSortSelectChange(sortOption);
    renderAccounts(container, accountList, onClick);
  }
}
