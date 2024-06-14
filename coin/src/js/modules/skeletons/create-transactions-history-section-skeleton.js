import '../../../css/skeleton.css';

import { el } from 'redom';

export default function createTransactionsHistorySectionSkeleton() {
    const details = el('div', [
        el('div', { class: 'skeleton skeleton_title' }),
        el('div', { class: 'skeleton skeleton_title' }),
    ]);
    const balancePlot = el('div', { class: 'skeleton-map' }, [
        el('div', { class: 'skeleton skeleton_bar' }),
        el('div', { class: 'skeleton skeleton_bar' }),
        el('div', { class: 'skeleton skeleton_bar' }),
        el('div', { class: 'skeleton skeleton_bar' }),
        el('div', { class: 'skeleton skeleton_bar' }),
        el('div', { class: 'skeleton skeleton_bar' }),
        el('div', { class: 'skeleton skeleton_bar' }),
        el('div', { class: 'skeleton skeleton_bar' }),
        el('div', { class: 'skeleton skeleton_bar' }),
        el('div', { class: 'skeleton skeleton_bar' }),
        el('div', { class: 'skeleton skeleton_bar' }),
        el('div', { class: 'skeleton skeleton_bar' }),
    ]);
    const transactionsPlot = el('div', { class: 'skeleton-map' }, [
        el('div', { class: 'skeleton skeleton_bar' }),
        el('div', { class: 'skeleton skeleton_bar' }),
        el('div', { class: 'skeleton skeleton_bar' }),
        el('div', { class: 'skeleton skeleton_bar' }),
        el('div', { class: 'skeleton skeleton_bar' }),
        el('div', { class: 'skeleton skeleton_bar' }),
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
    const content = el('div', { class: 'history__content' }, [ balancePlot, transactionsPlot, table ]);
  
    const wrapper = el('div', { class: 'history__wrapper wrapper' }, [ details, content ]);
    const accountContainer = el(
      'div',
      { class: 'history__container container' },
      [wrapper]
    );
    const section = el('section', { class: 'history' }, [accountContainer]);
  
    return section;
  }
  