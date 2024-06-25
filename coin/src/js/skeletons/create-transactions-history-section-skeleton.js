import { el } from 'redom';
import * as styles from '../elements/transactions-history-section/transactions-history-section.module.css';

import createPlotSkeleton from './create-plot-skeleton';
import createTableSkeleton from './create-table-skeleton';
import {
  TRANSACTIONS_HISTORY_SKELETON_PLOT_BARS,
  TRANSACTIONS_HISTORY_SKELETON_TABLE_ROWS_COUNT,
} from '../const';

export default function createTransactionsHistorySectionSkeleton() {
  const details = el('div', [
    el('div', { class: 'skeleton skeleton-title' }),
    el('div', { class: 'skeleton skeleton-title' }),
  ]);
  const balancePlot = createPlotSkeleton(
    TRANSACTIONS_HISTORY_SKELETON_PLOT_BARS
  );
  const transactionsPlot = createPlotSkeleton(
    TRANSACTIONS_HISTORY_SKELETON_PLOT_BARS
  );
  const table = createTableSkeleton(
    TRANSACTIONS_HISTORY_SKELETON_TABLE_ROWS_COUNT
  );
  const content = el('div', { class: styles.content }, [
    balancePlot,
    transactionsPlot,
    table,
  ]);

  const wrapper = el('div', { class: 'wrapper' }, [details, content]);
  const accountContainer = el('div', { class: 'container' }, [wrapper]);
  const section = el('section', [accountContainer]);

  return section;
}
