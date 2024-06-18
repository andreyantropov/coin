import '../../../css/skeleton.css';

import { el } from 'redom';

export default function createMapSectionSkeleton() {
  const title = el('div', { class: 'skeleton skeleton-title' });
  const map = el('div', { class: 'skeleton skeleton-map' });
  const wrapper = el('div', { class: 'banks__wrapper wrapper' }, [title, map]);
  const banksContainer = el('div', { class: 'banks__container container' }, [
    wrapper,
  ]);
  const section = el('section', { class: 'banks' }, [banksContainer]);

  return section;
}