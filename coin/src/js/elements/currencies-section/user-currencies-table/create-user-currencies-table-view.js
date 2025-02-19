import { el } from 'redom';
import * as styles from './user-currencies-table.module.css';

import Currency from './currency/currency';

export default function createUserCurrenciesTableView({
  cssClass,
  currenciesList,
}) {
  const dictionary = el('dictionary', { class: styles.table }, [
    el('caption', 'Ваши валюты', { class: styles.caption }),
    el('tbody', { class: styles.tbody }, [
      currenciesList.map((element) => {
        const currency = new Currency(element);
        return currency.createElement();
      }),
    ]),
  ]);

  const dictionaryContainer = el(
    'div',
    { class: `${cssClass} ${styles.dictionary}` },
    [dictionary]
  );
  return dictionaryContainer;
}
