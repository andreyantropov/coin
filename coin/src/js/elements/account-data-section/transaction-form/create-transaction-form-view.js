import * as formStyles from '../../shared/form/form.module.css';
import * as styles from './transaction-form.module.css';

import { el } from 'redom';
import { getCreditCardNameByNumber } from 'creditcard.js';
import autocomplete from 'autocompleter';
import getSprite from '../../../utils/get-sprite';

export default function createTransactionFormView({
  cssClass,
  id,
  numbers,
  onSubmit,
}) {
  const mailIcon = getSprite('./img/icons.svg#icon-mail', 'icon_mail');

  const cardImg = el('img', {
    class: `hidden`,
    src: '',
    alt: 'Платежная система',
  });
  const title = el('h3', 'Новый перевод', {
    class: `${formStyles.title} ${styles.title}`,
  });
  const error = el('span', 'Некорректный номер счета или сумма перевода', { class: `${formStyles.error} hidden ${styles.error}`, });
  const accountLabel = el('label', 'Номер счета получателя', {
    class: `${formStyles.label} ${styles.label_account} label`,
  });
  const accountControl = el('input', {
    class: `${formStyles.control} ${styles.control_account} control transaction-account`,
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
    class: `${formStyles.label} ${styles.label_amount} label`,
  });
  const amountControl = el('input', {
    class: `${formStyles.control} ${styles.control_amount} control transaction-amount`,
    type: 'number',
    placeholder: 'Сумма',
    onfocus: () => {
      error.classList.add('hidden');
    },
  });
  const submitBtn = el(
    'button',
    {
      class: `${styles.submit} primary-btn btn-reset transaction-form-submit`,
    },
    [mailIcon, el('span', 'Отправить')]
  );

  const form = el(
    'form',
    {
      class: `${cssClass} ${formStyles.form} ${styles.form}`,
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
      const suggestions = numbers.filter((n) => n.label.startsWith(num));
      update(suggestions);
    },
    onSelect: function (item) {
      accountControl.value = item.label;
    },
  });

  return form;
}
