import { el, mount } from 'redom';

export default function createTransactionFormView(container, { onTransactionSubmit }) {
  const form = el(
    'form',
    [
      el('h2', 'Новый перевод', { class: 'transaction__title' }),
      el('label', 'Номер счета получателя', { class: 'transaction__label transaction__label_account label' }),
      el('input', {
        class: 'transaction__control transaction__control_account control',
        id: 'transaction-account',
        type: 'text',
        placeholder: 'Счет получателя',
        minlength: 3,
        required: true,
      }),
      el('label', 'Сумма перевода', {
        class: 'transaction__label transaction__label_amount label',
      }),
      el('input', {
        class: 'transaction__control transaction__control_amount control',
        id: 'transaction-amount',
        type: 'text',
        placeholder: 'Сумма',
        maxlength: 6,
        required: true,
      }),
      el('button', 'Отправить', {
        class: 'transaction__submit-btn primary-btn btn-reset',
      }),
    ],
    {
      class: 'transaction account-data__transaction',
      onsubmit: (e) => {
        e.preventDefault();

        const account = document.getElementById('auth-account').value.trim();
        const amount = document.getElementById('auth-amount').value.trim();

        onTransactionSubmit(account, amount);
      },
    }
  );

  mount(container, form);
  return form;
}
