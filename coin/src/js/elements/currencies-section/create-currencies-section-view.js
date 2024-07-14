import { el } from 'redom';
import Sortable from 'sortablejs';
import * as styles from './currencies-section.module.css';
import createUserCurrenciesTableView from './user-currencies-table/create-user-currencies-table-view';
import createCurrenciesFormView from './currencies-form/create-currencies-form-view';
import createCurrenciesRateTableView from './currencies-rate-table/create-currencies-rate-table-view';
import { ANIMATION_DURATION } from '../../const';

export default function createCurrenciesSectionView({
  allCurrenciesList,
  currenciesList,
  webSocket,
  onCurrencyFormSubmit,
}) {
  const userCurrencies = createUserCurrenciesTableView({
    cssClass: `${styles.table_user}`,
    currenciesList,
  });
  const rate = createCurrenciesRateTableView({
    cssClass: `${styles.table_rate}`,
    webSocket,
  });
  const form = createCurrenciesFormView({
    cssClass: '',
    options: allCurrenciesList,
    onSubmit: async (from, to, amount) => {
      await onCurrencyFormSubmit(from, to, amount);
      userCurrencies.replaceWith(
        createUserCurrenciesTableView({
          cssClass: `${styles.table_user}`,
          currenciesList,
        })
      );
    },
  });

  const leftContainer = el('div', { class: `${styles.leftContainer}` }, [
    userCurrencies,
    form,
  ]);

  const sortableLeftContainer = new Sortable(leftContainer, {
    animation: ANIMATION_DURATION,
    group: {
      name: 'currencies-left-group',
    },
  });

  const wrapper = el('div', { class: `${styles.wrapper} wrapper` }, [
    leftContainer,
    rate,
  ]);

  const sortableWrapper = new Sortable(wrapper, {
    animation: ANIMATION_DURATION,
    group: {
      name: 'currencies-wrapper-group',
    },
  });

  const accountContainer = el('div', { class: `container` }, [wrapper]);
  const section = el('section', [accountContainer]);

  return section;
}
