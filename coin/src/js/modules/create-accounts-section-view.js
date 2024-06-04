import { el, mount } from 'redom';
import Account from './account.js';

export default function createAccountsSectionView(container, accountList) {
    const items = accountList.map(element => {
        const account = new Account({ ...element, id: element.account, onClick: () => {} });
        return account.createElement();
    });
    const ul = el('ul', { class: 'accounts__list list-reset' }, [ ...items ]);
    const wrapper = el('div', { class: 'accounts__wrapper' }, [ ul ]);
    const accountContainer = el('div', { class: 'accounts__container container' }, [ wrapper ]);
    const section = el('section', { class: 'accounts' }, [ accountContainer ]);
    
    mount(container, section);
    return section;
}