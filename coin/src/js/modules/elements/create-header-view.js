import '../../../css/header.css';

import { el } from 'redom';
import NavItem from '../classes/nav-item';

export default function createHeaderView(navItems) {
  const logo = el('a', { class: 'header__logo', href: '/' }, [
    el('img', { src: './img/logo.png', img: 'Логотип Coin' }),
  ]);

  const nav = el('nav', { class: 'header__nav nav' }, [
    el('ul', { class: 'nav__list list-reset' }, [
      navItems.map((element) => {
        const navItem = new NavItem(element);
        return navItem.createElement();
      }),
    ]),
  ]);

  const wrapper = el('div', { class: 'header__wrapper wrapper' }, [logo, nav]);
  const container = el('div', { class: 'header__container container' }, [
    wrapper,
  ]);

  return container;
}
