import { el } from 'redom';
import * as styles from '../elements/account-data-section/account-data-section.module.css';

import createPlotSkeleton from './create-plot-skeleton';
import createTableSkeleton from './create-table-skeleton';
import {
  ACCOUNT_DATA_SKELETON_PLOT_BARS,
  ACCOUNT_DATA_SKELETON_TABLE_ROWS,
} from '../const';

export default function createAccountDataSectionSkeleton() {
  const details = el('div', [
    el('div', { class: 'skeleton skeleton-title' }),
    el('div', { class: 'skeleton skeleton-title' }),
  ]);

  const plot = createPlotSkeleton(ACCOUNT_DATA_SKELETON_PLOT_BARS);
  const table = createTableSkeleton(ACCOUNT_DATA_SKELETON_TABLE_ROWS);
  const transactionForm = el('div', { class: 'skeleton-container' }, [
    el('div', { class: 'skeleton skeleton-paragraph' }),
    el('div', { class: 'skeleton skeleton-paragraph' }),
    el('div', { class: 'skeleton skeleton-paragraph' }),
  ]);

  const topContainer = el(
    'div',
    { class: `${styles.topContainer} account-data-top-container-skeleton` },
    [transactionForm, plot]
  );

  const content = el('div', { class: styles.content }, [topContainer, table]);

  const wrapper = el('div', { class: 'wrapper' }, [details, content]);
  const accountContainer = el('div', { class: 'container' }, [wrapper]);
  const section = el('section', [accountContainer]);

  return section;
}
