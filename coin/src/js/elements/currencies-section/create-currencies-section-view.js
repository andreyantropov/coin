import * as styles from './currencies-section.module.css';

import { el } from 'redom';
import Sortable from 'sortablejs';
import createUserCurrenciesTableView from './user-currencies-table/create-user-currencies-table-view';
import createCurrenciesFormView from './currencies-form/create-currencies-form-view';
import createCurrenciesRateTableView from './currencies-rate-table/create-currencies-rate-table-view';

export default function createCurrenciesSectionView({
  allCurrenciesList,
  currenciesList,
  webSocket,
  onCurrencyFormSubmit,
}) {
  const userCurrencies = createUserCurrenciesTableView({
    cssClass: `${styles.table_user}`,
    currenciesList: currenciesList,
  });
  const rate = createCurrenciesRateTableView({
    cssClass: `${styles.table_rate}`,
    webSocket: webSocket,
  });
  const form = createCurrenciesFormView({
    cssClass: '',
    options: allCurrenciesList,
    onSubmit: async (from, to, amount) => {
      await onCurrencyFormSubmit(from, to, amount);
      userCurrencies.replaceWith(
        createUserCurrenciesTableView({
          cssClass: `${styles.table_user}`,
          currenciesList: currenciesList,
        })
      );
    },
  });

  const leftContainer = el('div', { class: `${styles.leftContainer}` }, [
    userCurrencies,
    form,
  ]);

  const sortableLeftContainer = new Sortable(leftContainer, {
    animation: 150,
    group: {
      name: 'currencies-left-group',
    },
  });

  const wrapper = el('div', { class: `${styles.wrapper} wrapper` }, [
    leftContainer,
    rate,
  ]);

  const sortableWrapper = new Sortable(wrapper, {
    animation: 150,
    group: {
      name: 'currencies-wrapper-group',
    },
  });

  const accountContainer = el(
    'div',
    { class: `container` },
    [wrapper]
  );
  const section = el('section', [accountContainer]);

  return section;
}
