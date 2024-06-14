import '../../../css/accounts.css';

import { el } from 'redom';
import Account from '../classes/account';

export default function createAccountsListView({
  accountList,
  onAccountBtnClick,
}) {
  const ul = el('ul', { class: 'accounts__list list-reset' }, [
    accountList.map((element) => {
      const account = new Account({
        ...element,
        id: element.account,
        onClick: () => {
          onAccountBtnClick(element.account);
        },
      });
      return account.createElement();
    }),
  ]);

  return ul;
}
