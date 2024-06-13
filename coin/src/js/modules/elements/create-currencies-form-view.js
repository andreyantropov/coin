import '../../../css/form.css';
import '../../../css/currencies-form.css';

import { el } from 'redom';

export default function createCurrenciesFormView({ cssClass, options, onSubmit }) {
  const form = el(
    'form',
    {
      class: `${cssClass} form currencies-form`,
      onsubmit: (e) => {
        e.preventDefault();

        const from = document.getElementById('currency-from').value.trim();
        const to = document.getElementById('currency-to').value.trim();
        const amount = document.getElementById('currency-amount').value.trim();

        onSubmit(from, to, amount);
      },
    },
    [
      el('h3', 'Обмен валюты', { class: 'form__title currency-title' }),
      el('div', { class: 'form__input-container form__input-container_exchange' }, [
        el('label', 'Из', {
          class: 'form__label form__from label',
        }),
        el('select', {
          class: 'form__control form__control_from control control_select',
          id: 'currency-from',
          required: true,
        }, [
          options.map(element => {
            return el('option', element, { class: 'option' });
          }),
        ]),
        el('label', 'в', {
          class: 'form__label form__label_to label',
        }),
        el('select', {
          class: 'form__control form__control_to control control_select',
          id: 'currency-to',
          required: true,
        }, [
          options.map(element => {
            return el('option', element, { class: 'option' });
          }),
        ]),
      ]),
      el('div', { class: 'form__input-container form__input-container_amount' }, [
        el('label', 'Сумма перевода', {
          class: 'form__label form__label_amount label',
        }),
        el('input', {
          class: 'form__control form__control_amount control',
          id: 'currency-amount',
          type: 'text',
          placeholder: 'Сумма',
          maxlength: 6,
          required: true,
        }),
      ]),
      el('button', 'Обменять', {
        class: 'form__submit-btn primary-btn btn-reset currencies-form-submit',
      }),
    ],
  );

  return form;
}
