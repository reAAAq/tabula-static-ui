/* Local UI demo only: this is not server-side authentication. */
(() => {
  'use strict';

  const sessionKey = 'tabula-static-demo-session';
  const demoUsername = 'u5593635';
  const demoPassword = 'ZhanxingClawx0924*';
  const loginPage = location.pathname.endsWith('/login.html');

  function isSignedIn() {
    try {
      return sessionStorage.getItem(sessionKey) === 'signed-in';
    } catch {
      return false;
    }
  }

  function destination() {
    return 'index.html';
  }

  function requireSession() {
    if (!loginPage && !isSignedIn()) {
      document.documentElement.classList.add('auth-pending');
      location.replace('login.html');
      return false;
    }
    document.documentElement.classList.remove('auth-pending');
    return true;
  }

  window.TabulaDemoAuth = Object.freeze({
    isSignedIn,
    destination,
    async signIn(username, password) {
      if (username !== demoUsername || password !== demoPassword) return false;
      // Store only a demo session flag, never the entered credentials.
      sessionStorage.setItem(sessionKey, 'signed-in');
      return true;
    },
    signOut() {
      try {
        sessionStorage.removeItem(sessionKey);
      } catch {
        // A blocked storage area cannot contain an accessible session.
      }
      document.documentElement.classList.add('auth-pending');
      location.replace('login.html');
    }
  });

  requireSession();
  window.addEventListener('pageshow', requireSession);

  if (!loginPage) {
    document.addEventListener('DOMContentLoaded', () => {

      const account = document.querySelector('.sso-link.sign-out');
      if (!account) return;
      const container = account.closest('li');
      container.classList.add('demo-account');
      account.setAttribute('aria-controls', 'demo-account-menu');
      const menu = document.createElement('div');
      menu.id = 'demo-account-menu';
      menu.className = 'demo-account-menu';
      menu.hidden = true;
      const signOut = document.createElement('button');
      signOut.type = 'button';
      signOut.textContent = 'Sign out';
      signOut.addEventListener('click', window.TabulaDemoAuth.signOut);
      menu.append(signOut);
      container.append(menu);
      function close() {
        menu.hidden = true;
        account.setAttribute('aria-expanded', 'false');
      }
      account.addEventListener('click', event => {
        event.preventDefault();
        menu.hidden = !menu.hidden;
        account.setAttribute('aria-expanded', String(!menu.hidden));
      });
      document.addEventListener('click', event => {
        if (!container.contains(event.target)) close();
      });
      container.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
          close();
          account.focus();
        }
      });
    });
  }
})();
