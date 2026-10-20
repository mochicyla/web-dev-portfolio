// Wait for the HTML elements to finish loading
document.addEventListener("DOMContentLoaded", function () {

  // -----------------------------------------------------------
  // 1. Dark Mode Toggle
  // Finds the button and toggles the 'dark-mode' class on the <body>
  // -----------------------------------------------------------
  const themeBtn = document.getElementById("themeBtn");
  themeBtn.addEventListener("click", function () {
    const isDark = document.body.classList.toggle("dark-mode");
    themeBtn.textContent = isDark ? "🌙" : "☀️";
  });

  // -----------------------------------------------------------
  // 2. Welcome Button Alert
  // Displays a simple JavaScript alert popup
  // -----------------------------------------------------------
  const welcomeBtn = document.getElementById("welcomeBtn");
  welcomeBtn.addEventListener("click", function () {
    alert("Hello! Thanks for checking out my portfolio website.");
  });

  // -----------------------------------------------------------
  // 3. (Read More buttons removed — extra info is always visible)
  // -----------------------------------------------------------

  // -----------------------------------------------------------
  // 4. Live Character Counter for the Message Field
  // Updates text as the user types
  // -----------------------------------------------------------
  const messageInput = document.getElementById("userMessage");
  const charCount = document.getElementById("charCount");

  messageInput.addEventListener("input", function () {
    const totalTyped = messageInput.value.length;
    charCount.textContent = totalTyped + " characters typed";
  });

  // -----------------------------------------------------------
  // 5. Contact Form Submission Feedback
  // Prevents the page from refreshing and shows a confirmation message
  // -----------------------------------------------------------
  const contactForm = document.getElementById("simpleForm");
  const nameInput = document.getElementById("userName");
  const feedbackMsg = document.getElementById("formFeedback");

  contactForm.addEventListener("submit", function (event) {
    // Stop form from reloading the browser page
    event.preventDefault();

    const name = nameInput.value.trim();

    if (name === "") {
      feedbackMsg.style.color = "red";
      feedbackMsg.textContent = "Please fill in your name before submitting.";
    } else {
      feedbackMsg.style.color = "green";
      feedbackMsg.textContent = "Thank you, " + name + "! Your note has been recorded.";
      contactForm.reset();
      charCount.textContent = "0 characters typed";
    }
  });

  // -----------------------------------------------------------
  // Extra: Automatically updates the year in the footer
  // -----------------------------------------------------------
  const yearSpan = document.getElementById("currentYear");
  yearSpan.textContent = new Date().getFullYear();

});