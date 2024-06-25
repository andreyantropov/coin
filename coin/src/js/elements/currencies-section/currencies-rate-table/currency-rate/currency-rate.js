import { el } from 'redom';
import * as styles from './currency-rate.module.css';

import formatMoney from '../../../../utils/format-money';
import getSprite from '../../../../utils/get-sprite';

const Rate = {
  POSITIVE: 1,
  NEGATIVE: -1,
};

export default class CurrencyRate {
  constructor({ from, to, rate, change }) {
    this._from = from;
    this._to = to;
    this._rate = rate;
    this._change = change;
  }

  get from() {
    return this._from;
  }

  get to() {
    return this._to;
  }

  get rate() {
    return this._rate;
  }

  get change() {
    return this._change;
  }

  createElement() {
    const arrowIcon = getSprite(this.getIcon(), 'icon_rate-arrow');

    const tr = el(
      'tr',
      { class: `${styles.tr} currency ${this.getRateClass()}` },
      [
        el('th', `${this._from}/${this._to}`, {
          class: `${styles.th} currency__th`,
        }),
        el('td', { class: `${styles.td} currency__td` }, [
          el('span', formatMoney(this._rate)),
          arrowIcon,
        ]),
      ]
    );
    return tr;
  }

  getIcon() {
    switch (this._change) {
      case Rate.NEGATIVE:
        return './img/icons.svg#icon-arrow-down';
      case Rate.POSITIVE:
        return './img/icons.svg#icon-arrow-up';
      default:
        return '';
    }
  }

  getRateClass() {
    switch (this._change) {
      case Rate.NEGATIVE:
        return styles.td_negative;
      case Rate.POSITIVE:
        return styles.td_positive;
      default:
        return '';
    }
  }
}
