import * as styles from './header.module.css';

import { el } from 'redom';
import NavItem from './nav-item/nav-item';

export default function createHeaderView(navItems) {
  const logo = el('a', { class: styles.logo, href: '/' }, [
    el('img', { src: './img/logo.png', img: 'Логотип Coin' }),
  ]);

  const nav = el('nav', [
    el('ul', { class: `${styles.navList} list-reset` }, [
      navItems.map((element) => {
        const navItem = new NavItem(element);
        return navItem.createElement();
      }),
    ]),
  ]);

  const wrapper = el('div', { class: `${styles.wrapper} wrapper` }, [logo, nav]);
  const container = el('div', { class: `container` }, [
    wrapper,
  ]);

  return container;
}
