const hamburger = document.getElementById("hamburger-icon");
const navBarContainer = document.querySelector(".nav-bar__container");
const formLabels = document.querySelectorAll(".contact__form label");
const messageSubmitBtn = document.getElementById("send-message");
const contactFrom = document.getElementById("contact-form");
const feedbackContainer = document.querySelector(".feedback");
const feedbackHeading = document.querySelector(".feedback__heading");
const feedbackMessage = document.querySelector(".feedback__message");
const documentBody = document.querySelector("body");

hamburger.addEventListener("click", () => {
  if (navBarContainer.classList.contains("menu-open")) {
    navBarContainer.classList.remove("menu-open");
    documentBody.classList.remove("no-scroll");
    return;
  }
  navBarContainer.classList.add("menu-open");
  documentBody.classList.add("no-scroll");
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
  messageSubmitBtn.removeEventListener("click", () => {});

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
    if (error.message === "Failed to fetch") {
      error.message = "Something went wrong, please try again.";
    }
    feedbackMessage.textContent = error.message;

    feedbackContainer.style.backgroundColor = "var(--error-color)";
  } finally {
    feedbackContainer.classList.add("feedback--show");

    setTimeout(() => {
      feedbackContainer.classList.remove("feedback--show");
      feedbackHeading.textContent = "";
      feedbackMessage.textContent = "";
      feedbackContainer.style.backgroundColor = "";
      messageSubmitBtn.disabled = false;
      messageSubmitBtn.addEventListener("click", () => {});
    }, 3000);
  }
});
