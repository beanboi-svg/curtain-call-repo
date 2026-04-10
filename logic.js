const menu = document.getElementById('menu');
const menuTrigger = document.getElementById('menu-trigger');
const helpItem = document.getElementById('help-item');
const secondaryWindow = document.getElementById('secondary-window');
const helpExpandChevron = document.getElementById('help-expand-chevron');

function closeSecondaryWindow() {
  secondaryWindow.classList.remove('is-open');
  helpItem.setAttribute('aria-expanded', 'false');
}

function positionSecondaryWindow() {
  const chevronRect = helpExpandChevron.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();
  const secondaryWidth = secondaryWindow.offsetWidth || 189;
  const left = chevronRect.right - menuRect.left - secondaryWidth;
  const top = chevronRect.bottom - menuRect.top + 5;
  secondaryWindow.style.left = `${left}px`;
  secondaryWindow.style.top = `${top}px`;
}

menuTrigger.addEventListener('click', (event) => {
  event.stopPropagation();
  menu.classList.toggle('is-open');
  if (!menu.classList.contains('is-open')) {
    closeSecondaryWindow();
  }
});

helpItem.addEventListener('click', (event) => {
  event.stopPropagation();
  if (!menu.classList.contains('is-open')) {
    menu.classList.add('is-open');
  }
  const shouldOpen = !secondaryWindow.classList.contains('is-open');
  if (shouldOpen) {
    positionSecondaryWindow();
    secondaryWindow.classList.add('is-open');
    helpItem.setAttribute('aria-expanded', 'true');
  } else {
    closeSecondaryWindow();
  }
});

document.addEventListener('click', (event) => {
  if (!menu.contains(event.target)) {
    menu.classList.remove('is-open');
    closeSecondaryWindow();
    return;
  }
  if (!event.target.closest('#help-item') && !event.target.closest('#secondary-window')) {
    closeSecondaryWindow();
  }
});

window.addEventListener('resize', () => {
  if (secondaryWindow.classList.contains('is-open')) {
    positionSecondaryWindow();
  }
});