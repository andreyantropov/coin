import { el } from 'redom';
import createAccountMenuView from './account-menu/create-account-menu-view';
import createAccountsListView from './account-list/create-accounts-list-view';

export default function createAccountsSectionView({
  accountList,
  onAccountBtnClick,
  onSortSelectChange,
  onNewBtnClick,
}) {
  const accountListEl = createAccountsListView({
    accountList,
    onAccountBtnClick,
  });
  const menu = createAccountMenuView({
    onNewBtnClick,
    onSortSelectChange: (value) => {
      onSortSelectChange(value);
      accountListEl.innerHTML = createAccountsListView({
        accountList,
        onAccountBtnClick,
      }).innerHTML;
    },
  });

  const wrapper = el('div', { class: `wrapper` }, [menu, accountListEl]);
  const accountContainer = el('div', { class: `container` }, [wrapper]);
  const section = el('section', [accountContainer]);

  return section;
}
