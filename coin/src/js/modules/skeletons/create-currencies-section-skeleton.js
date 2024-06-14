import '../../../css/skeleton.css';

import { el } from 'redom';

export default function createCurrenciesSectionSkeleton() {
    const userCurrencies = el('div', { class: 'skeleton-container' }, [
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
    const form = el('div', { class: 'skeleton-container' }, [
        el('div', { class: 'skeleton skeleton_paragraph' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
    ]);
    const rate = el('div', { class: 'skeleton-container' }, [
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
