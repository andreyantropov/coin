import '../../../css/form.css';
import '../../../css/transaction.css';

import { el } from 'redom';
import getSprite from '../utils/get-sprite';

export default function createTransactionFormView({ cssClass, id, onSubmit }) {
  const mailIcon = getSprite('./img/sprite.svg#sprite-mail', 'icon_mail');

  const form = el(
    'form',
    {
      class: `${cssClass} form transaction-form`,
      onsubmit: (e) => {
        e.preventDefault();

        const to = document.getElementById('transaction-account').value.trim();
        const amount = document.getElementById('transaction-amount').value.trim();

        onSubmit(id, to, amount);
      },
    },
    [
      el('h3', 'Новый перевод', { class: 'form__title transaction-title' }),
      el('label', 'Номер счета получателя', { class: 'form__label form__label_account label' }),
      el('input', {
        class: 'form__control form__control_account control',
        id: 'transaction-account',
        type: 'text',
        placeholder: 'Счет получателя',
        minlength: 3,
        required: true,
      }),
      el('label', 'Сумма перевода', {
        class: 'form__label form__label_amount label',
      }),
      el('input', {
        class: 'form__control form__control_amount control',
        id: 'transaction-amount',
        type: 'text',
        placeholder: 'Сумма',
        maxlength: 6,
        required: true,
      }),
      el('button', {
        class: 'form__submit-btn primary-btn btn-reset transaction-form-submit',
      },
      mailIcon, el('span', 'Отправить')),
    ],
  );

  return form;
}
