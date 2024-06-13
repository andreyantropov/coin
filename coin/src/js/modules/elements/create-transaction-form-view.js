import '../../../css/form.css';
import '../../../css/transaction.css';

import { el } from 'redom';
import { getCreditCardNameByNumber } from 'creditcard.js';
import getSprite from '../utils/get-sprite';

export default function createTransactionFormView({ cssClass, id, onSubmit }) {
  const mailIcon = getSprite('./img/sprite.svg#sprite-mail', 'icon_mail');

  const cardImg = el('img', {
    class: 'form__img transaction-card hidden',
    id: 'card-img',
    src: '',
    alt: 'Платежная система',
  });
  const title = el('h3', 'Новый перевод', {
    class: 'form__title transaction-title',
  });
  const accountLabel = el('label', 'Номер счета получателя', {
    class: 'form__label form__label_account label',
  });
  const accountControl = el('input', {
    class: 'form__control form__control_account control',
    id: 'transaction-account',
    type: 'text',
    placeholder: 'Счет получателя',
    minlength: 3,
    required: true,
    onblur: () => {
      const cardName = getCreditCardNameByNumber( accountControl.value.trim() );

      switch (cardName) {
        case 'Visa':
          cardImg.src = './img/visa.webp';
          cardImg.classList.remove('hidden');
          break;

        case 'Mastercard':
          cardImg.src = './img/mastercard.webp';
          cardImg.classList.remove('hidden');
          break;

        default:
          cardImg.classList.add('hidden');
      }
    },
  });
  const amountLabel = el('label', 'Сумма перевода', {
    class: 'form__label form__label_amount label',
  });
  const amountControl = el('input', {
    class: 'form__control form__control_amount control',
    id: 'transaction-amount',
    type: 'text',
    placeholder: 'Сумма',
    maxlength: 6,
    required: true,
  });
  const submitBtn = el(
    'button',
    {
      class: 'form__submit-btn primary-btn btn-reset transaction-form-submit',
    },
    [mailIcon, el('span', 'Отправить')]
  );

  const form = el(
    'form',
    {
      class: `${cssClass} form transaction-form`,
      onsubmit: (e) => {
        e.preventDefault();

        const to = document.getElementById('transaction-account').value.trim();
        const amount = document
          .getElementById('transaction-amount')
          .value.trim();

        onSubmit(id, to, amount);
      },
    },
    [
      title,
      accountLabel,
      accountControl,
      amountLabel,
      amountControl,
      cardImg,
      submitBtn,
    ]
  );

  return form;
}
