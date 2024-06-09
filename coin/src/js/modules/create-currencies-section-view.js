import { el } from 'redom';
import createUserCurrenciesTableView from './create-user-currencies-table-view';
import createCurrenciesFormView from './create-currencies-form-view';

export default function createCurrenciesSectionView({ allCurrenciesList, currenciesList, onCurrencyFormSubmit }) {
  const userCurrencies = createUserCurrenciesTableView({ cssClass: 'currencies__table currencies__table_user', currenciesList: currenciesList, });
  const form = createCurrenciesFormView({ cssClass: 'currencies__form', options: allCurrenciesList, onSubmit: onCurrencyFormSubmit });

  const wrapper = el('div', { class: 'currencies__wrapper' }, [ userCurrencies, form ]);
  const accountContainer = el(
    'div',
    { class: 'currencies__container container' },
    [wrapper]
  );
  const section = el('section', { class: 'currencies' }, [accountContainer]);

  return section;
}
