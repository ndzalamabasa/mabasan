const hamburger = document.getElementById("hamburger-icon");
const navBarContainer = document.querySelector(".nav-bar__container");
const formLabels = document.querySelectorAll(".contact__form label");
const messageSubmitBtn = document.getElementById("send-message");
const contactFrom = document.getElementById("contact-form");
const feedbackContainer = document.querySelector(".feedback");
const feedbackHeading = document.querySelector(".feedback__heading");
const feedbackMessage = document.querySelector(".feedback__message");

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

messageSubmitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  messageSubmitBtn.disabled = true;

  try {
    const formData = new FormData(contactFrom);

    const response = await fetch(
      "https://ancient-reef-77698-e8323d8efe20.herokuapp.com/api/v1/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      }
    );

    const data = await response.json();

    if (response.ok) {
      feedbackHeading.textContent = "Success";
      feedbackMessage.textContent = data.message;

      feedbackContainer.style.backgroundColor = "var(--success-color)";
      contactFrom.reset();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    feedbackHeading.textContent = "Error";
    feedbackMessage.textContent = error.message;

    feedbackContainer.style.backgroundColor = "var(--error-color)";
  } finally {
    feedbackContainer.classList.add("feedback--show");
    setTimeout(() => {
      feedbackContainer.classList.remove("feedback--show");
      messageSubmitBtn.disabled = false;
    }, 5000);
  }
});
