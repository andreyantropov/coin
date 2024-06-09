import { el, mount } from 'redom';
import CurrencyRate from "./currency-rate";

export default function createCurrenciesRateTableView({ cssClass, webSocket }) {
  const body = el('tbody', { class: 'dictionary__tbody' });
  const dictionary = el('dictionary', { class: 'dictionary__table' }, [
    el('caption', 'Изменение курсов в реальном времени', { class: 'dictionary__caption' }),
    body,
  ]);

  webSocket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.type === 'EXCHANGE_RATE_CHANGE') {
      const currency = new CurrencyRate(data);
      mount(body, currency.createElement());
    }
  };

  const dictionaryContainer = el('div', { class: `${cssClass} dictionary` }, [
    dictionary,
  ]);
  return dictionaryContainer;
}
