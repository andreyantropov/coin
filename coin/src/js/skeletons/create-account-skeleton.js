import { el } from 'redom';

export default function createAccountSkeleton() {
    return el('div', { class: 'skeleton-container' }, [
        el('div', { class: 'skeleton skeleton-title-sm' }),
        el('div', { class: 'skeleton skeleton-paragraph' }),
        el('div', { class: 'skeleton skeleton-paragraph' }),
        el('div', { class: 'skeleton skeleton-paragraph-sm' }),
    ])
}