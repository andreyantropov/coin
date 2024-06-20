import * as styles from './dictionary.module.css';

import { el, mount } from 'redom';
import CurrencyRate from "./currency-rate/currency-rate";

export default function createCurrenciesRateTableView({ cssClass, webSocket }) {
  const body = el('tbody', { class: styles.tbody });
  const dictionary = el('dictionary', { class: styles.table }, [
    el('caption', 'Изменение курсов в реальном времени', { class: styles.caption }),
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

  const dictionaryContainer = el('div', { class: `${cssClass} ${styles.dictionary}` }, [
    dictionary,
  ]);
  return dictionaryContainer;
}
