import '../../../css/map.css';

import { el } from 'redom';
import initMap from '../utils/init-map';

export default function createMapSectionView({ markerList }) {
  const title = el('h2', 'Карта банкоматов', { class: 'banks__title title' });
  const map = el('div', { class: 'banks__map map', id: 'map' });
  const wrapper = el('div', { class: 'banks__wrapper wrapper' }, [title, map]);
  const banksContainer = el('div', { class: 'banks__container container' }, [
    wrapper,
  ]);
  const section = el('section', { class: 'banks' }, [banksContainer]);

  initMap(map, markerList);

  return section;
}

