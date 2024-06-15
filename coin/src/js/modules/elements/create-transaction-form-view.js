import '../../../css/form.css';
import '../../../css/transaction.css';

import { el } from 'redom';
import { getCreditCardNameByNumber } from 'creditcard.js';
import autocomplete from 'autocompleter';
import getSprite from '../utils/get-sprite';

export default function createTransactionFormView({
  cssClass,
  id,
  numbers,
  onSubmit,
}) {
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
  const error = el('span', 'Некорректный номер счета или сумма перевода', { class: 'form__error hidden transaction-error', });
  const accountLabel = el('label', 'Номер счета получателя', {
    class: 'form__label form__label_account label',
  });
  const accountControl = el('input', {
    class: 'form__control form__control_account control',
    id: 'transaction-account',
    type: 'text',
    placeholder: 'Счет получателя',
    onfocus: () => {
      error.classList.add('hidden');
    },
    onblur: () => {
      const cardName = getCreditCardNameByNumber(accountControl.value.trim());

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
    type: 'number',
    placeholder: 'Сумма',
    onfocus: () => {
      error.classList.add('hidden');
    },
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

        const to = accountControl.value.trim();
        const amount = amountControl
          .value.trim();

          if (!to || !amount) {
            error.textContent = 'Некорректный номер счета или сумма перевода: заполните все поля';
            error.classList.remove('hidden');
            return;
          }

          if (isNaN(amount) || parseFloat(amount) <= 0) {
            error.textContent = 'Некорректная сумма перевода: укажите неотрицательное число';
            error.classList.remove('hidden');
            return;
          }

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
      error,
    ]
  );

  autocomplete({
    input: accountControl,
    fetch: function (num, update) {
      console.log(numbers)
      const suggestions = numbers.filter((n) => n.label.startsWith(num));
      update(suggestions);
    },
    onSelect: function (item) {
      accountControl.value = item.label;
    },
  });

  return form;
}
