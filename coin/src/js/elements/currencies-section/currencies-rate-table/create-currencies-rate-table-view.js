import { el, mount } from 'redom';
import * as styles from './currencies-rate-table.module.css';

import CurrencyRate from './currency-rate/currency-rate';
import {
  CURRENCY_MAX_RATE_LIST_LENGTH,
  CURRENCY_EXCHANGE_RATE_CHANGE_TYPE,
} from '../../../const';

export default function createCurrenciesRateTableView({ cssClass, webSocket }) {
  const body = el('tbody', { class: styles.tbody });
  const dictionary = el('dictionary', { class: styles.table }, [
    el('caption', 'Изменение курсов в реальном времени', {
      class: styles.caption,
    }),
    body,
  ]);

  const rateList = [];
  webSocket.onmessage = (e) => {
    const data = JSON.parse(e.data);

    if (data.type === CURRENCY_EXCHANGE_RATE_CHANGE_TYPE) {
      rateList.unshift(data);
      if (rateList.length > CURRENCY_MAX_RATE_LIST_LENGTH) {
        rateList.pop();
      }

      body.innerHTML = '';
      rateList.forEach((element) => {
        const currency = new CurrencyRate(element);
        mount(body, currency.createElement());
      });
    }
  };

  const dictionaryContainer = el(
    'div',
    { class: `${cssClass} ${styles.dictionary}` },
    [dictionary]
  );
  return dictionaryContainer;
}
