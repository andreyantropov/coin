import '../../../css/skeleton.css';

import { el } from 'redom';
import createTableSkeleton from './create-table-skeleton';

export default function createCurrenciesSectionSkeleton() {
    const userCurrencies = createTableSkeleton(12);
    const form = createTableSkeleton(3);
    const rate = createTableSkeleton(17);

  const leftContainer = el('div', { class: 'currencies__left' }, [
    userCurrencies,
    form,
  ]);

  const wrapper = el('div', { class: 'currencies__wrapper wrapper' }, [
    leftContainer,
    rate,
  ]);

  const accountContainer = el(
    'div',
    { class: 'currencies__container container' },
    [wrapper]
  );
  const section = el('section', { class: 'currencies' }, [accountContainer]);

  return section;
}
