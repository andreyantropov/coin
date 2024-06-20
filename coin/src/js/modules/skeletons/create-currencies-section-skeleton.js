import * as styles from '../../../css/currencies.module.css';

import { el } from 'redom';
import createTableSkeleton from './create-table-skeleton';

export default function createCurrenciesSectionSkeleton() {
    const userCurrencies = createTableSkeleton(12);
    const form = createTableSkeleton(3);
    const rate = createTableSkeleton(17);

  const leftContainer = el('div', { class: styles.leftContainer }, [
    userCurrencies,
    form,
  ]);

  const wrapper = el('div', { class: `${styles.wrapper} wrapper` }, [
    leftContainer,
    rate,
  ]);

  const accountContainer = el(
    'div',
    { class: 'container' },
    [wrapper]
  );
  const section = el('section', [accountContainer]);

  return section;
}
