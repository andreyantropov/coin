import { el, mount } from 'redom';

export default function createAuthFormView(container, { onAuthSubmit }) {
  const form = el(
    'form',
    [
      el('h2', 'Вход в аккаунт', { class: 'auth__title' }),
      el('label', 'Логин', { class: 'auth__label auth__label_login label' }),
      el('input', {
        class: 'auth__control auth__control_login control',
        id: 'auth-login',
        type: 'text',
        placeholder: 'Логин',
        minlength: 6,
        required: true,
      }),
      el('label', 'Пароль', {
        class: 'auth__label auth__label_password label',
      }),
      el('input', {
        class: 'auth__control auth__control_password control',
        id: 'auth-password',
        type: 'password',
        placeholder: 'Пароль',
        minlength: 6,
        required: true,
      }),
      el('button', 'Войти', {
        class: 'auth__submit-btn primary-btn btn-reset',
      }),
    ],
    {
      class: 'auth',
      onsubmit: (e) => {
        e.preventDefault();

        const login = document.getElementById('auth-login').value.trim();
        const password = document.getElementById('auth-password').value.trim();

        onAuthSubmit(login, password);
      },
    }
  );

  mount(container, form);
}
