// let nav = document.querySelector("header");
let menu = document.querySelectorAll('.menu-btn');
let mobileMenu = document.querySelector('.header-menu');
// let mobileMenu2 = document.querySelector(".home-and-menu");

let showMenu = document.querySelector('.menu');

menu.forEach((btn) => {
  btn.addEventListener('click', () => {
    showMenu.classList.toggle('show-menu');
    mobileMenu.classList.toggle('menu-open');
    // mobileMenu2.classList.toggle("menu-open");

    // nav.classList.toggle("transparent");
  });
});
