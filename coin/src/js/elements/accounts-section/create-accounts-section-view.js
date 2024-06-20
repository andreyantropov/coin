import { el } from 'redom';
import createAccountMenuView from './account-menu/create-account-menu-view';
import createAccountsListView from './account-list/create-accounts-list-view';

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

  const wrapper = el('div', { class: `wrapper` }, [
    menu,
    accountListEl,
  ]);
  const accountContainer = el(
    'div',
    { class: `container` },
    [wrapper]
  );
  const section = el('section', [accountContainer]);

  return section;
}
