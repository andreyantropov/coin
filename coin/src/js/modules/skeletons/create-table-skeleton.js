import { el } from 'redom';

export default function createTableSkeleton(rowsCount) {
  const rows = [];
  for (let i = 0; i < rowsCount; i++) {
    rows.push(el('div', { class: 'skeleton skeleton-paragraph' }));
  }

  return el('div', { class: 'skeleton-container' }, [...rows]);
}
