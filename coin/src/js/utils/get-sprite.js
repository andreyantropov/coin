export default function getSprite(path, cssClass) {
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS(
    'http://www.w3.org/1999/xlink',
    'xlink:href',
    path,
  );
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('icon', cssClass);
  svg.appendChild(use);

  return svg;
}
