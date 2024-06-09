import { el } from 'redom';
import createUserCurrenciesTableView from './create-user-currencies-table-view';

export default function createCurrenciesSectionView({ currenciesList }) {
  const userCurrencies = createUserCurrenciesTableView({ cssClass: 'currencies__table currencies__table_user', currenciesList: currenciesList, });

  const wrapper = el('div', { class: 'currencies__wrapper' }, [ userCurrencies ]);
  const accountContainer = el(
    'div',
    { class: 'currencies__container container' },
    [wrapper]
  );
  const section = el('section', { class: 'currencies' }, [accountContainer]);

  return section;
}
