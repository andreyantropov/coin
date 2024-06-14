import '../../../css/skeleton.css';

import { el } from 'redom';

export default function createAccountDataSectionSkeleton() {
  const details = el('div', [
    el('div', { class: 'skeleton skeleton_title' }),
    el('div', { class: 'skeleton skeleton_title' }),
  ]);

  const plot = el('div', { class: 'skeleton-map' }, [
    el('div', { class: 'skeleton skeleton_bar' }),
    el('div', { class: 'skeleton skeleton_bar' }),
    el('div', { class: 'skeleton skeleton_bar' }),
    el('div', { class: 'skeleton skeleton_bar' }),
    el('div', { class: 'skeleton skeleton_bar' }),
    el('div', { class: 'skeleton skeleton_bar' }),
]);
  const table = el('div', { class: 'skeleton-container' }, [
    el('div', { class: 'skeleton skeleton_paragraph' }),
    el('div', { class: 'skeleton skeleton_paragraph' }),
    el('div', { class: 'skeleton skeleton_paragraph' }),
    el('div', { class: 'skeleton skeleton_paragraph' }),
    el('div', { class: 'skeleton skeleton_paragraph' }),
    el('div', { class: 'skeleton skeleton_paragraph' }),
    el('div', { class: 'skeleton skeleton_paragraph' }),
    el('div', { class: 'skeleton skeleton_paragraph' }),
    el('div', { class: 'skeleton skeleton_paragraph' }),
    el('div', { class: 'skeleton skeleton_paragraph' }),
    el('div', { class: 'skeleton skeleton_paragraph' }),
    el('div', { class: 'skeleton skeleton_paragraph' }),
    el('div', { class: 'skeleton skeleton_paragraph' }),
    el('div', { class: 'skeleton skeleton_paragraph' }),
    el('div', { class: 'skeleton skeleton_paragraph' }),
    el('div', { class: 'skeleton skeleton_paragraph' }),
    el('div', { class: 'skeleton skeleton_paragraph' }),
]);
  const transactionForm = el('div', { class: 'skeleton-container' }, [
    el('div', { class: 'skeleton skeleton_paragraph' }),
    el('div', { class: 'skeleton skeleton_paragraph' }),
    el('div', { class: 'skeleton skeleton_paragraph' }),
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
