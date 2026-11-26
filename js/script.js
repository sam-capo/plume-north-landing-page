// Mobile navigation elements and panel controls
const burgerMenu = document.getElementById('burger-btn');
const xBtn = document.getElementById('x-btn');
const mobileMenu = document.querySelector('.mobile-nav');

// Expand the mobile navigation panel.
function openMenu(){
    mobileMenu.style.width = '30vw';
}

// Collapse the mobile navigation panel.
function closeMenu(){
    mobileMenu.style.width = '0vw';
}

// Attach navigation actions only when their controls are present.
if (burgerMenu && mobileMenu) {
    burgerMenu.addEventListener('click', openMenu);
}
if (xBtn && mobileMenu) {
    xBtn.addEventListener('click', closeMenu);
}



// Prepare both newsletter forms and their confirmation states.
document.addEventListener("DOMContentLoaded", () => {
    const heroForm = document.getElementById("hero-form");
    const heroThankYouMsg = document.getElementById("hero-thank-you");
    const footerForm = document.querySelector(".footer form");

    if (heroForm) {
        const heroButton = heroForm.querySelector("button");
        if (heroButton) {
            heroButton.type = "submit";
            heroButton.removeAttribute("onclick");
        }
    }

    let footerThankYouMsg;
    if (footerForm) {
        const footerEmail = footerForm.querySelector("input");
        if (footerEmail) {
            footerEmail.type = "email";
            footerEmail.required = true;
        }

        const subscribeLink = footerForm.querySelector("a");
        if (subscribeLink) {
            const submitButton = document.createElement("button");
            submitButton.type = "submit";
            submitButton.textContent = subscribeLink.textContent;
            subscribeLink.replaceWith(submitButton);
        }

        footerThankYouMsg = document.createElement("div");
        footerThankYouMsg.className = "thank-you-msg";
        footerThankYouMsg.setAttribute("role", "status");
        footerThankYouMsg.setAttribute("aria-live", "polite");
        footerThankYouMsg.textContent = "Thank you for subscribing to our newsletter!";
        footerThankYouMsg.hidden = true;
        footerForm.insertAdjacentElement("afterend", footerThankYouMsg);
    }

    // Validate each address before hiding its form and showing confirmation.
    [
        {
            form: heroForm,
            thankYouMsg: heroThankYouMsg,
            submit: (email) => sendEmail(email)
        },
        {
            form: footerForm,
            thankYouMsg: footerThankYouMsg
        }
    ].forEach(({ form, thankYouMsg, submit }) => {
        if (!form || !thankYouMsg) {
            return;
        }

        const emailInput = form.querySelector('input[type="email"]');
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!emailInput || !emailInput.checkValidity()) {
                if (emailInput) {
                    emailInput.reportValidity();
                }
                return;
            }

            const showThankYou = () => {
                form.hidden = true;
                thankYouMsg.hidden = false;
            };

            if (submit) {
                submit(emailInput.value)
                    .then(showThankYou)
                    .catch((error) => {
                        console.error("Newsletter submission failed.", error);
                        alert("Your sign-up could not be completed. Please try again.");
                    });
                return;
            }

            showThankYou();
        });
    });
});

// Send the hero sign-up address to the configured email service.
function sendEmail(email) {
    const templateParams = { email };
    return emailjs.send("service_f41qdor", "template_t7qpnsu", templateParams);
}