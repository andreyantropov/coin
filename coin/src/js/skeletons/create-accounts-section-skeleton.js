import { el } from 'redom';
import createAccountSkeleton from './create-account-skeleton';
import { ACCOUNT_LIST_SKELETON_LENGTH } from '../const';

export default function createAccountsSectionSkeleton() {
  const menu = el('div', { class: 'skeleton skeleton-title' });

  const accounts = [];
  for (let i = 0; i < ACCOUNT_LIST_SKELETON_LENGTH; i++) {
    accounts.push(createAccountSkeleton());
  }
  const accountListEl = el('div', { class: 'skeleton-grid' }, [...accounts]);

  const wrapper = el('div', { class: 'wrapper' }, [menu, accountListEl]);
  const accountContainer = el('div', { class: 'container' }, [wrapper]);
  const section = el('section', [accountContainer]);

  return section;
}
