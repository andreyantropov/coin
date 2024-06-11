import { el } from 'redom';

export default function createTransactionFormView({ cssClass, id, onSubmit }) {
  const form = el(
    'form',
    {
      class: `${cssClass} transaction-form`,
      onsubmit: (e) => {
        e.preventDefault();

        const to = document.getElementById('transaction-account').value.trim();
        const amount = document.getElementById('transaction-amount').value.trim();

        onSubmit(id, to, amount);
      },
    },
    [
      el('h3', 'Новый перевод', { class: 'transaction-form__title' }),
      el('label', 'Номер счета получателя', { class: 'transaction-form__label transaction-form__label_account label' }),
      el('input', {
        class: 'transaction-form__control transaction-form__control_account control',
        id: 'transaction-account',
        type: 'text',
        placeholder: 'Счет получателя',
        minlength: 3,
        required: true,
      }),
      el('label', 'Сумма перевода', {
        class: 'transaction-form__label transaction-form__label_amount label',
      }),
      el('input', {
        class: 'transaction-form__control transaction-form__control_amount control',
        id: 'transaction-amount',
        type: 'text',
        placeholder: 'Сумма',
        maxlength: 6,
        required: true,
      }),
      el('button', 'Отправить', {
        class: 'transaction-form__submit-btn primary-btn btn-reset',
      }),
    ],
  );

  return form;
}
