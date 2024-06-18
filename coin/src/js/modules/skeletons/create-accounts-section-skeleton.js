import '../../../css/skeleton.css';

import { el } from 'redom';
import createAccountSkeleton from './create-account-skeleton';

export default function createAccountsSectionSkeleton() {
  const menu = el('div', { class: 'skeleton skeleton-title' });

  const accounts = [];
  for (let i = 0; i < 8; i++) {
    accounts.push(createAccountSkeleton());
  }
  const accountListEl = el('div', { class: 'skeleton-grid' }, [...accounts]);

  const wrapper = el('div', { class: 'accounts__wrapper wrapper' }, [
    menu,
    accountListEl,
  ]);
  const accountContainer = el(
    'div',
    { class: 'accounts__container container' },
    [wrapper]
  );
  const section = el('section', { class: 'accounts' }, [accountContainer]);

  return section;
}
