/* Local UI demo only: this is not server-side authentication. */
(() => {
  'use strict';

  const sessionKey = 'tabula-static-demo-session';
  const pages = new Set(['index.html', 'profile.html', 'modules.html']);
  const loginPage = location.pathname.endsWith('/login.html');
  const currentPage = location.pathname.split('/').pop() || 'index.html';

  function isSignedIn() {
    try {
      return sessionStorage.getItem(sessionKey) === 'signed-in';
    } catch {
      return false;
    }
  }

  function destination() {
    const requested = new URLSearchParams(location.search).get('next');
    return pages.has(requested) ? requested : 'index.html';
  }

  function requireSession() {
    if (!loginPage && !isSignedIn()) {
      document.documentElement.classList.add('auth-pending');
      const next = pages.has(currentPage) ? currentPage : 'index.html';
      location.replace(`login.html?next=${encodeURIComponent(next)}`);
      return false;
    }
    document.documentElement.classList.remove('auth-pending');
    return true;
  }

  window.TabulaDemoAuth = Object.freeze({
    isSignedIn,
    destination,
    async signIn(username, password) {
      if (username !== 'u5593635') return false;
      const bytes = new TextEncoder().encode(password);
      const digest = await crypto.subtle.digest('SHA-256', bytes);
      const hex = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
      if (hex !== 'a9bc53be5a7a47c0b13c995f4db67aee0c57db4cd7f4617f71c00c9d68746be2') return false;
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
      const badge = document.createElement('aside');
      badge.className = 'static-demo-badge';
      badge.textContent = '本地静态演示 · 非学校正式系统';
      document.body.append(badge);

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
