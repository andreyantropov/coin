import { el } from 'redom';
import Sortable from 'sortablejs';
import * as styles from './account-list.module.css';
import Account from './account/account';
import { ACCOUNT_DATA_MONTH_COUNT } from '../../../const';

export default function createAccountsListView({
  accountList,
  onAccountBtnClick,
}) {
  const ul = el('ul', { class: `${styles.list} list-reset accounts-list` }, [
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
    animation: ACCOUNT_DATA_MONTH_COUNT,
    group: {
      name: 'account-list-group',
    },
  });

  return ul;
}
