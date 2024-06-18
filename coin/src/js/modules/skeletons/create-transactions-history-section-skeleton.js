import '../../../css/skeleton.css';

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
  const content = el('div', { class: 'history__content' }, [
    balancePlot,
    transactionsPlot,
    table,
  ]);

  const wrapper = el('div', { class: 'history__wrapper wrapper' }, [
    details,
    content,
  ]);
  const accountContainer = el(
    'div',
    { class: 'history__container container' },
    [wrapper]
  );
  const section = el('section', { class: 'history' }, [accountContainer]);

  return section;
}
