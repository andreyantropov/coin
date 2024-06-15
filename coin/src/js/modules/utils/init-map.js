import Marker from '../classes/marker';

export default async function initMap(container, markerList = []) {
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
