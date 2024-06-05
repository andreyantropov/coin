import { el, mount } from 'redom';
import Marker from './marker';

export default function createMapSectionView(container, markerList) {
  const title = el('h2', 'Карта банкоматов', { class: 'banks__title' });
  const map = el('div', { class: 'banks__map map', id: 'map' });
  const wrapper = el('div', { class: 'banks__wrapper' }, [title, map]);
  const accountContainer = el('div', { class: 'banks__container container' }, [
    wrapper,
  ]);
  const section = el('section', { class: 'banks' }, [accountContainer]);

  initMap(map, markerList);

  mount(container, section);
  return section;
}

async function initMap(container, markerList) {
  await ymaps3.ready;
  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = ymaps3;

  const map = new YMap(container, {
    location: {
      center: [37.588144, 55.733842],
      zoom: 10,
    },
  });
  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(new YMapDefaultFeaturesLayer());

  markerList.forEach((element) => {
    const marker = new Marker({ ...element });
    const markerElement = marker.createElement();
    map.addChild(markerElement);
  });
}
