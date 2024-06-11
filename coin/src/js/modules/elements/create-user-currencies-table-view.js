import { el } from 'redom';
import Currency from "../classes/currency";

export default function createUserCurrenciesTableView({ cssClass, currenciesList }) {
  const dictionary = el('dictionary', { class: 'dictionary__table' }, [
    el('caption', 'Ваши валюты', { class: 'dictionary__caption' }),
    el('tbody', { class: 'dictionary__tbody' }, [
      currenciesList.map((element) => {
        const currency = new Currency(element);
        return currency.createElement();
      }),
    ]),
  ]);

  const dictionaryContainer = el('div', { class: `${cssClass} dictionary` }, [
    dictionary,
  ]);
  return dictionaryContainer;
}
