const hamburger = document.getElementById("hamburger-icon");
const navBarContainer = document.querySelector(".nav-bar__container");
const formLabels = document.querySelectorAll(".contact__form label");

hamburger.addEventListener("click", () => {
  if (navBarContainer.classList.contains("menu-open")) {
    navBarContainer.classList.remove("menu-open");
    return;
  }
  navBarContainer.classList.add("menu-open");
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
