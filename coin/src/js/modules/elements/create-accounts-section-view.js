import { el, mount } from 'redom';
import createAccountMenuView from './create-account-menu-view';
import createAccountsListView from './create-accounts-list-view';

export default function createAccountsSectionView({
  accountList,
  onAccountBtnClick,
  onSortSelectChange,
  onNewBtnClick,
}) {
  let accountListEl = createAccountsListView({
    accountList: accountList,
    onAccountBtnClick: onAccountBtnClick,
  });
  const menu = createAccountMenuView({
    onNewBtnClick: onNewBtnClick,
    onSortSelectChange: (value) => {
      onSortSelectChange(value);
      accountListEl.innerHTML = createAccountsListView({
        accountList: accountList,
        onAccountBtnClick: onAccountBtnClick,
      }).innerHTML;
    },
  });

  const wrapper = el('div', { class: 'accounts__wrapper wrapper' }, [
    menu,
    accountListEl,
  ]);
  const accountContainer = el(
    'div',
    { class: 'accounts__container container' },
    [wrapper]
  );
  const section = el('section', { class: 'accounts' }, [accountContainer]);

  return section;
}
