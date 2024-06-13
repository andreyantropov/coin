import '../../../css/dictionary.css';

import { el, mount } from 'redom';
import CurrencyRate from "../classes/currency-rate";

export default function createCurrenciesRateTableView({ cssClass, webSocket }) {
  const body = el('tbody', { class: 'dictionary__tbody' });
  const dictionary = el('dictionary', { class: 'dictionary__table' }, [
    el('caption', 'Изменение курсов в реальном времени', { class: 'dictionary__caption' }),
    body,
  ]);

  const rateList = [];
  webSocket.onmessage = (e) => {
    const data = JSON.parse(e.data);

    if (data.type === 'EXCHANGE_RATE_CHANGE') {
      rateList.unshift(data);
      if (rateList.length > 12) {
        rateList.pop();
      }

      body.innerHTML = '';
      rateList.forEach(element => {
        const currency = new CurrencyRate(element);
      mount(body, currency.createElement());
      });
    }
  };

  const dictionaryContainer = el('div', { class: `${cssClass} dictionary` }, [
    dictionary,
  ]);
  return dictionaryContainer;
}
