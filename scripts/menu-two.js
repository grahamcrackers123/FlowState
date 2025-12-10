const menu = document.getElementById('menu-button');
const navPart = document.getElementById('nav');

menu.addEventListener('click', () => {
    navPart.classList.toggle('active');
} );