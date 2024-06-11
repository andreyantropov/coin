import { el } from 'redom';
import createUserCurrenciesTableView from './create-user-currencies-table-view';
import createCurrenciesFormView from './create-currencies-form-view';
import createCurrenciesRateTableView from './create-currencies-rate-table-view';

export default function createCurrenciesSectionView({
  allCurrenciesList,
  currenciesList,
  webSocket,
  onCurrencyFormSubmit,
}) {
  const userCurrencies = createUserCurrenciesTableView({
    cssClass: 'currencies__table currencies__table_user',
    currenciesList: currenciesList,
  });
  const rate = createCurrenciesRateTableView({
    cssClass: 'currencies__table currencies__table_rate',
    webSocket: webSocket,
  });
  const form = createCurrenciesFormView({
    cssClass: 'currencies__form',
    options: allCurrenciesList,
    onSubmit: async (from, to, amount) => {
      await onCurrencyFormSubmit(from, to, amount);
      userCurrencies.replaceWith(
        createUserCurrenciesTableView({
          cssClass: 'currencies__table currencies__table_user',
          currenciesList: currenciesList,
        })
      );
    },
  });

  const wrapper = el('div', { class: 'currencies__wrapper wrapper' }, [
    userCurrencies,
    form,
    rate,
  ]);
  const accountContainer = el(
    'div',
    { class: 'currencies__container container' },
    [wrapper]
  );
  const section = el('section', { class: 'currencies' }, [accountContainer]);

  return section;
}
