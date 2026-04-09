const menu = document.getElementById('menu');
const menuTrigger = document.getElementById('menu-trigger');

menuTrigger.addEventListener('click', (event) => {
    event.stopPropagation();
    menu.classList.toggle('is-open');
});

document.addEventListener('click', (event) => {
    if (!menu.contains(event.target)) {
        menu.classList.remove('is-open');
    }
});
