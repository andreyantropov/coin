import '../../../css/skeleton.css';

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

  const topContainer = el('div', { class: 'account-data__top' }, [
    transactionForm,
    plot,
  ]);

  const content = el('div', { class: 'account-data__content' }, [
    topContainer,
    table,
  ]);

  const wrapper = el('div', { class: 'account-data__wrapper wrapper' }, [
    details,
    content,
  ]);
  const accountContainer = el(
    'div',
    { class: 'account-data__container container' },
    [wrapper]
  );
  const section = el('section', { class: 'account-data' }, [accountContainer]);

  return section;
}
