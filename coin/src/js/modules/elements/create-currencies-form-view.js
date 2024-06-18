import '../../../css/form.css';
import '../../../css/currencies-form.css';

import { el } from 'redom';

export default function createCurrenciesFormView({ cssClass, options, onSubmit }) {
  const title = el('h3', 'Обмен валюты', { class: 'form__title currencies-title' });
  const error = el('span', 'Некорректная сумма перевода: укажите неотрицательное число', { class: 'form__error hidden currencies-error', });
  const fromLabel = el('label', 'Из', {
    class: 'form__label form__from label',
  });
  const fromControl = el('select', {
    class: 'form__control form__control_from control control_select',
    required: true,
  }, [
    options.map(element => {
      return el('option', element.code, { class: 'option' });
    }),
  ]);
  const toLabel = el('label', 'в', {
    class: 'form__label form__label_to label',
  });
  const toControl = el('select', {
    class: 'form__control form__control_to control control_select',
    required: true,
  }, [
    options.map(element => {
      return el('option', element.code, { class: 'option' });
    }),
  ]);
  const exchangeContainer = el('div', { class: 'form__input-container form__input-container_exchange' }, [
    fromLabel, fromControl, toLabel, toControl,
  ]);
  const amountLabel = el('label', 'Сумма перевода', {
    class: 'form__label form__label_amount label',
  });
  const amountControl = el('input', {
    class: 'form__control form__control_amount control',
    type: 'text',
    placeholder: 'Сумма',
    onfocus: () => {
      error.classList.add('hidden');
    },
  });
  const amountContainer = el('div', { class: 'form__input-container form__input-container_amount' }, [
    amountLabel, amountControl,
  ]);
  const submitBtn = el('button', 'Обменять', {
    class: 'form__submit-btn primary-btn btn-reset currencies-form-submit',
  });

  const form = el(
    'form',
    {
      class: `${cssClass} form currencies-form`,
      onsubmit: (e) => {
        e.preventDefault();

        const from = fromControl.value.trim();
        const to = toControl.value.trim();
        const amount = amountControl.value.trim();

        if (isNaN(amount) || parseFloat(amount) <= 0) {
          error.classList.remove('hidden');
          return;
        }

        onSubmit(from, to, amount);
      },
    },
    [
      title, exchangeContainer, amountContainer, submitBtn, error,
    ],
  );

  return form;
}
