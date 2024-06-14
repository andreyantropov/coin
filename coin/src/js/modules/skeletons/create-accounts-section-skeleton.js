import '../../../css/skeleton.css';

import { el } from 'redom';

export default function createAccountsSectionSkeleton() {
  const menu = el('div', { class: 'skeleton skeleton_title' });
  const accountListEl = el('div', { class: 'skeleton-grid' }, [
    el('div', { class: 'skeleton-container' }, [
        el('div', { class: 'skeleton skeleton_title' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
    ]),
    el('div', { class: 'skeleton-container' }, [
        el('div', { class: 'skeleton skeleton_title' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
    ]),
    el('div', { class: 'skeleton-container' }, [
        el('div', { class: 'skeleton skeleton_title' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
    ]),
    el('div', { class: 'skeleton-container' }, [
        el('div', { class: 'skeleton skeleton_title' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
    ]),
    el('div', { class: 'skeleton-container' }, [
        el('div', { class: 'skeleton skeleton_title' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
    ]),
    el('div', { class: 'skeleton-container' }, [
        el('div', { class: 'skeleton skeleton_title' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
    ]),
    el('div', { class: 'skeleton-container' }, [
        el('div', { class: 'skeleton skeleton_title' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
    ]),
    el('div', { class: 'skeleton-container' }, [
        el('div', { class: 'skeleton skeleton_title' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
        el('div', { class: 'skeleton skeleton_paragraph' }),
    ]),
  ]);

  const wrapper = el('div', { class: 'accounts__wrapper wrapper' }, [
    menu,
    accountListEl,
  ]);
  const accountContainer = el(
    'div',
    { class: 'accounts__container container' },
    [wrapper]
  );
  const section = el('section', { class: 'accounts' }, [accountContainer]);

  return section;
}
