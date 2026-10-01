/* Local display controls for the captured module details. */
document.querySelectorAll('.striped-section.collapsible').forEach((section, index) => {
  const trigger = section.querySelector('.collapse-trigger');
  const contents = section.querySelector('.striped-section-contents');
  const icon = trigger.querySelector('i');
  contents.id = `module-details-${index + 1}`;
  trigger.setAttribute('aria-controls', contents.id);
  trigger.setAttribute('aria-expanded', String(section.classList.contains('expanded')));

  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    const expanded = section.classList.toggle('expanded');
    trigger.setAttribute('aria-expanded', String(expanded));
    icon.classList.toggle('fa-chevron-right', !expanded);
    icon.classList.toggle('fa-chevron-down', expanded);
  });
});

document.querySelectorAll('a[href="#"]:not(.collapse-trigger)').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
});
