import * as styles from '../../../css/history.module.css';

import { el } from 'redom';
import createPlotSkeleton from './create-plot-skeleton';
import createTableSkeleton from './create-table-skeleton';

export default function createTransactionsHistorySectionSkeleton() {
  const details = el('div', [
    el('div', { class: 'skeleton skeleton-title' }),
    el('div', { class: 'skeleton skeleton-title' }),
  ]);
  const balancePlot = createPlotSkeleton(12);
  const transactionsPlot = createPlotSkeleton(12);
  const table = createTableSkeleton(16);
  const content = el('div', { class: styles.content }, [
    balancePlot,
    transactionsPlot,
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
