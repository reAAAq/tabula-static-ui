/* A local two-step demonstration; no requests or form submissions. */
(() => {
  'use strict';
  const form = document.getElementById('loginform');
  const username = document.getElementById('userName');
  const password = document.getElementById('demoPassword');
  const usernameGroup = document.getElementById('username-group');
  const passwordGroup = document.getElementById('password-group');
  const summary = document.getElementById('username-summary');
  const selectedUsername = document.getElementById('selected-username');
  const submit = document.getElementById('signinbutton');
  const error = document.getElementById('login-error');
  let step = 'username';

  function showError(message) {
    error.textContent = message;
    error.hidden = !message;
    password.setAttribute('aria-invalid', String(Boolean(message)));
  }

  document.getElementById('change-username').addEventListener('click', () => {
    step = 'username';
    password.value = '';
    password.disabled = true;
    password.required = false;
    passwordGroup.hidden = true;
    summary.hidden = true;
    username.disabled = false;
    usernameGroup.hidden = false;
    submit.textContent = 'Next';
    showError('');
    username.focus();
  });

  password.addEventListener('input', () => showError(''));
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (step === 'username') {
      username.value = username.value.trim();
      if (!username.value) {
        username.reportValidity();
        return;
      }
      step = 'password';
      selectedUsername.textContent = username.value;
      usernameGroup.hidden = true;
      username.disabled = true;
      passwordGroup.hidden = false;
      password.disabled = false;
      password.required = true;
      summary.hidden = false;
      submit.textContent = 'Sign in';
      password.focus();
      return;
    }

    submit.disabled = true;
    password.readOnly = true;
    try {
      if (await window.TabulaDemoAuth.signIn(username.value, password.value)) {
        password.value = '';
        location.replace(window.TabulaDemoAuth.destination());
      } else {
        showError('The username or password is incorrect. Please try again.');
        password.value = '';
        password.focus();
      }
    } catch {
      showError('Browser session storage is unavailable. Enable it to use this local demo.');
    } finally {
      submit.disabled = false;
      password.readOnly = false;
    }
  });
})();
