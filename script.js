const hamburger = document.getElementById("hamburger-icon");
const navBarContainer = document.querySelector(".nav-bar__container");
const formLabels = document.querySelectorAll(".contact__form label");
const messageSubmitBtn = document.getElementById("send-message");
const contactFrom = document.getElementById("contact-form");

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

messageSubmitBtn.addEventListener("click", sendMessage);

async function sendMessage(e) {
  e.preventDefault();

  const formData = new FormData(contactFrom);

  const response = await fetch(
    "https://ancient-reef-77698-e8323d8efe20.herokuapp.com/api/v1/messages",
    {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(Object.fromEntries(formData)),
    }
  );
}
