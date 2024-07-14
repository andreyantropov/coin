import { el } from 'redom';
import * as styles from '../elements/currencies-section/currencies-section.module.css';

import createTableSkeleton from './create-table-skeleton';
import {
  CURRENCY_SKELETON_USER_CURRENCIES_TABLE_ROWS,
  CURRENCY_SKELETON_FORM_ROWS,
  CURRENCY_SKELETON_RATE_TABLE_ROWS,
} from '../const';

export default function createCurrenciesSectionSkeleton() {
  const userCurrencies = createTableSkeleton(
    CURRENCY_SKELETON_USER_CURRENCIES_TABLE_ROWS
  );
  const form = createTableSkeleton(CURRENCY_SKELETON_FORM_ROWS);
  const rate = createTableSkeleton(CURRENCY_SKELETON_RATE_TABLE_ROWS);

  const leftContainer = el('div', { class: styles.leftContainer }, [
    userCurrencies,
    form,
  ]);

  const wrapper = el('div', { class: `${styles.wrapper} wrapper` }, [
    leftContainer,
    rate,
  ]);

  const accountContainer = el('div', { class: 'container' }, [wrapper]);
  const section = el('section', [accountContainer]);

  return section;
}
