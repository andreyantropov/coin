import * as styles from '../../../css/map.module.css';

import { el } from 'redom';
import initMap from '../utils/init-map';

export default function createMapSectionView({ markerList }) {
  const title = el('h2', 'Карта банкоматов', { class: `title` });
  const map = el('div', { class: `${styles.map}`, id: 'map' });
  const wrapper = el('div', { class: `${styles.wrapper} wrapper` }, [title, map]);
  const banksContainer = el('div', { class: `container` }, [
    wrapper,
  ]);
  const section = el('section', [banksContainer]);

  initMap(map, markerList);

  return section;
}

