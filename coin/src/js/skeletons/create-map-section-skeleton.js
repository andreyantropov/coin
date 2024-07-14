import { el } from 'redom';
import * as styles from '../elements/map-section/map.module.css';

export default function createMapSectionSkeleton() {
  const title = el('div', { class: 'skeleton skeleton-title' });
  const map = el('div', { class: 'skeleton skeleton-map' });
  const wrapper = el('div', { class: `${styles.wrapper} wrapper` }, [
    title,
    map,
  ]);
  const banksContainer = el('div', { class: 'container' }, [wrapper]);
  const section = el('section', [banksContainer]);

  return section;
}
