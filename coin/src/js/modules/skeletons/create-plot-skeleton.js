import { el } from 'redom';

export default function createPlotSkeleton(barsCount) {
  const bars = [];
  let cssClass;
  for (let i = 0; i < barsCount; i++) {
    switch (i % 3) {
      case 0:
        cssClass = 'skeleton-bar-sm';
        break;
      case 1:
        cssClass = 'skeleton-bar';
        break;
      case 2:
        cssClass = 'skeleton-bar-lg';
        break;
    }
    bars.push(
      el('div', {
        class: `skeleton ${cssClass}`,
      })
    );
  }

  return el('div', { class: 'skeleton-plot' }, [...bars]);
}
