const menu = document.getElementById('menu-button');
const nav = document.getElementById('main-nav');

menu.addEventListener('click', () => {
    nav.classList.toggle('active');
} );