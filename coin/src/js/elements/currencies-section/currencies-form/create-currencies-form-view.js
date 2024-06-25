import { el } from 'redom';
import * as formStyles from '../../shared/form/form.module.css';
import * as styles from './currencies-form.module.css';

export default function createCurrenciesFormView({
  cssClass,
  options,
  onSubmit,
}) {
  const title = el('h3', 'Обмен валюты', {
    class: `${formStyles.title} ${styles.title}`,
  });
  const error = el(
    'span',
    'Некорректная сумма перевода: укажите неотрицательное число',
    { class: `${formStyles.error} hidden ${styles.error}` }
  );
  const fromLabel = el('label', 'Из', {
    class: `${formStyles.label} ${styles.label_from} label`,
  });
  const fromControl = el(
    'select',
    {
      class: `${formStyles.control} ${styles.control_from} control control_select`,
      required: true,
    },
    [options.map((element) => el('option', element.code, { class: 'option' }))]
  );
  const toLabel = el('label', 'в', {
    class: `${formStyles.label} ${styles.label_to} label`,
  });
  const toControl = el(
    'select',
    {
      class: `${formStyles.control} ${styles.control_to} control control_select`,
      required: true,
    },
    [options.map((element) => el('option', element.code, { class: 'option' }))]
  );
  const exchangeContainer = el(
    'div',
    { class: `${formStyles.inputContainer} ${styles.inputContainer_exchange}` },
    [fromLabel, fromControl, toLabel, toControl]
  );
  const amountLabel = el('label', 'Сумма перевода', {
    class: `${formStyles.label} ${styles.label_amount} label`,
  });
  const amountControl = el('input', {
    class: `${formStyles.control} ${styles.control_amount} control`,
    type: 'text',
    placeholder: 'Сумма',
    onfocus: () => {
      error.classList.add('hidden');
    },
  });
  const amountContainer = el(
    'div',
    { class: `${formStyles.inputContainer} ${styles.inputContainer_amount}` },
    [amountLabel, amountControl]
  );
  const submitBtn = el('button', 'Обменять', {
    class: `primary-btn btn-reset ${styles.submit}`,
  });

  const form = el(
    'form',
    {
      class: `${cssClass} ${formStyles.form} ${styles.form}`,
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
    [title, exchangeContainer, amountContainer, submitBtn, error]
  );

  return form;
}
