const menu = document.querySelectorAll(".menu-btn");
const mobileMenu = document.querySelector(".header-menu");
const formLabels = document.querySelectorAll(".contact__form label");

const showMenu = document.querySelector(".menu");

menu.forEach((btn) => {
  btn.addEventListener("click", () => {
    showMenu.classList.toggle("show-menu");
    mobileMenu.classList.toggle("menu-open");
  });
});

formLabels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map((letter, idx) => {
      if (letter === " ") return letter;
      return `<span style="transition-delay:${idx * 30}ms">${letter}</span>`;
    })
    .join("");
});
