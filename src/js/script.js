"use strict";

document.addEventListener("DOMContentLoaded", () => {
  
  let elementsToAnimate = document.querySelectorAll(".animate-on-scroll");

let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-in-view");
    } else {
      entry.target.classList.remove("is-in-view");
    }
  });
}, {
  threshold: 0.2,
});

elementsToAnimate.forEach((element) => {
  observer.observe(element);
});

  
  let cardsContainer = document.querySelector("#tjanster .row");
  let cards = document.querySelectorAll(".card-item-animate");

  let cardObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          cards.forEach((card, index) => {
            card.style.animation = `fadeInSlideUp 0.8s ease-out forwards`;
            card.style.animationDelay = `${index * 0.2}s`;
            card.classList.add("is-in-view");
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  if (cardsContainer) {
    cardObserver.observe(cardsContainer);
  }


  let contactForm = document.getElementById("contactForm");
  let successMessage = document.getElementById("successMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let nameInput = document.getElementById("name");
      let emailInput = document.getElementById("email");
      let messageInput = document.getElementById("message");

      let nameError = document.getElementById("nameError");
      let emailError = document.getElementById("emailError");
      let messageError = document.getElementById("messageError");

      let formIsValid = true;

      function resetValidation() {
        nameInput.classList.remove("is-invalid", "is-valid");
        emailInput.classList.remove("is-invalid", "is-valid");
        messageInput.classList.remove("is-invalid", "is-valid");

        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";
      }
      emailjs.sendForm('service_z1u1g0k', 'template_g119sbi', this, {
        publicKey: 'Q0YhC8pvaK6XTd1ST',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );

      resetValidation();

      if (nameInput.value.trim() === "") {
        nameInput.classList.add("is-invalid");
        nameError.textContent = "Vänligen ange ditt namn.";
        formIsValid = false;
      } else {
        nameInput.classList.add("is-valid");
      }

      if (emailInput.value.trim() === "") {
        emailInput.classList.add("is-invalid");
        emailError.textContent = "Vänligen ange din e-postadress.";
        formIsValid = false;
      } else if (
        !emailInput.value.includes("@") ||
        !emailInput.value.includes(".")
      ) {
        emailInput.classList.add("is-invalid");
        emailError.textContent =
          'E-postadressen måste innehålla både "@" och ".".';
        formIsValid = false;
      } else {
        emailInput.classList.add("is-valid");
      }

      if (messageInput.value.trim() === "") {
        messageInput.classList.add("is-invalid");
        messageError.textContent = "Vänligen skriv ditt meddelande.";
        formIsValid = false;
      } else {
        messageInput.classList.add("is-valid");
      }

      if (formIsValid) {
        contactForm.classList.add("d-none");
        if (successMessage) {
          successMessage.classList.remove("d-none");
          successMessage.classList.add("d-block", "fade-in");
        }

        contactForm.reset();
        resetValidation();
      }
    });
  }
});
