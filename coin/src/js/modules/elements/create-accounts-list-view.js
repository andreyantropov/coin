import * as styles from '../../../css/accounts.module.css';

import { el } from 'redom';
import Sortable from 'sortablejs';
import Account from '../classes/account';

export default function createAccountsListView({
  accountList,
  onAccountBtnClick,
}) {
  const ul = el('ul', { class: `${styles.list} list-reset` }, [
    accountList.map((element) => {
      const account = new Account({
        ...element,
        onClick: () => {
          onAccountBtnClick(element.account);
        },
      });
      return account.createElement();
    }),
  ]);

  const sortable = new Sortable(ul, {
    animation: 150,
    group: {
      name: 'account-list-group',
    },
  });

  return ul;
}
