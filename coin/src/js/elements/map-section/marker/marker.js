import { el } from 'redom';
import * as styles from './marker.module.css';

export default class Marker {
  constructor({ lat, lon }) {
    this._lat = lat;
    this._lon = lon;
  }

  get lat() {
    return this._lat;
  }

  get lon() {
    return this._lon;
  }

  createElement() {
    const markerElement = el('div', { class: styles.marker }, [
      el('img', { src: './img/marker.png' }),
    ]);

    const { YMapMarker } = ymaps3;
    const marker = new YMapMarker(
      {
        coordinates: [this._lon, this._lat],
      },
      markerElement
    );
    return marker;
  }
}
