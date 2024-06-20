import * as styles from '../../../css/account-data.module.css';

import { el } from 'redom';
import createPlotSkeleton from './create-plot-skeleton';
import createTableSkeleton from './create-table-skeleton';

export default function createAccountDataSectionSkeleton() {
  const details = el('div', [
    el('div', { class: 'skeleton skeleton-title' }),
    el('div', { class: 'skeleton skeleton-title' }),
  ]);

  const plot = createPlotSkeleton(6);
  const table = createTableSkeleton(16);
  const transactionForm = el('div', { class: 'skeleton-container' }, [
    el('div', { class: 'skeleton skeleton-paragraph' }),
    el('div', { class: 'skeleton skeleton-paragraph' }),
    el('div', { class: 'skeleton skeleton-paragraph' }),
  ]);

  const topContainer = el('div', { class: styles.topContainer }, [
    transactionForm,
    plot,
  ]);

  const content = el('div', { class: styles.content }, [
    topContainer,
    table,
  ]);

  const wrapper = el('div', { class: 'wrapper' }, [
    details,
    content,
  ]);
  const accountContainer = el(
    'div',
    { class: 'container' },
    [wrapper]
  );
  const section = el('section', [accountContainer]);

  return section;
}
