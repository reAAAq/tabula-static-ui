/* UI-only behavior. This page makes no API requests or login submissions. */
document.querySelectorAll('.activity-stream .collapsible').forEach((content) => {
  const toggle = () => {
    const expanded = content.classList.toggle('open');
    content.setAttribute('aria-expanded', String(expanded));
  };
  content.addEventListener('click', (event) => {
    if (!event.target.closest('a')) toggle();
  });
  content.addEventListener('keydown', (event) => {
    if (event.target === content && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      toggle();
    }
  });
});

document.querySelectorAll('.activity-stream .activity > .close').forEach((button) => {
  button.addEventListener('click', () => button.closest('.activity').remove());
});

document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
});
