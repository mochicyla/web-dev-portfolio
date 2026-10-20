document.addEventListener("DOMContentLoaded", () => {
  // 1. DYNAMIC FOOTER YEAR
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. MOBILE HAMBURGER MENU TOGGLE
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-active");
      navToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", false);
      });
    });
  }

  // 3. DARK / LIGHT THEME TOGGLE WITH LOCALSTORAGE
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      if (isDark) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("portfolio-theme", "light");
        themeToggle.textContent = "🌙";
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("portfolio-theme", "dark");
        themeToggle.textContent = "☀️";
      }
    });
  }

  // 4. ACTIVE NAVIGATION LINK ON SCROLL (IntersectionObserver)
  const sections = document.querySelectorAll("section.section");
  const observerOptions = {
    threshold: 0.3,
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => navObserver.observe(sec));

  // 5. PROJECT CATEGORY FILTER
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const selectedCategory = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (selectedCategory === "all" || cardCategory === selectedCategory) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 6. PROJECT DETAILS MODAL
  const modal = document.getElementById("projectModal");
  const modalClose = document.getElementById("modalClose");
  const modalTitle = document.getElementById("modalTitle");
  const modalStack = document.getElementById("modalStack");
  const modalDesc = document.getElementById("modalDesc");
  const openModalButtons = document.querySelectorAll(".modal-open-btn");

  openModalButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      modalTitle.textContent = btn.getAttribute("data-title");
      modalStack.innerHTML = `<strong>Stack:</strong> ${btn.getAttribute("data-stack")}`;
      modalDesc.textContent = btn.getAttribute("data-details");
      modal.showModal();
    });
  });

  if (modalClose && modal) {
    modalClose.addEventListener("click", () => modal.close());
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.close();
    });
  }

  // 7. MESSAGE CHARACTER COUNTER
  const messageInput = document.getElementById("message");
  const charCounter = document.getElementById("charCounter");

  if (messageInput && charCounter) {
    messageInput.addEventListener("input", () => {
      charCounter.textContent = messageInput.value.length;
    });
  }

  // 8. FRONT-END FORM VALIDATION & FEEDBACK
  const contactForm = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const formSuccess = document.getElementById("formSuccess");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      // Reset errors
      nameError.textContent = "";
      emailError.textContent = "";
      messageError.textContent = "";
      formSuccess.hidden = true;

      if (!nameInput.value.trim()) {
        nameError.textContent = "Please provide your name.";
        isValid = false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = "Please provide a valid email address.";
        isValid = false;
      }

      if (messageInput.value.trim().length < 10) {
        messageError.textContent = "Your message must be at least 10 characters.";
        isValid = false;
      }

      if (isValid) {
        formSuccess.hidden = false;
        contactForm.reset();
        charCounter.textContent = "0";
      }
    });
  }

  // 9. COPY EMAIL TO CLIPBOARD
  const copyBtn = document.getElementById("copyEmailBtn");
  const emailText = document.getElementById("emailText");

  if (copyBtn && emailText) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(emailText.textContent);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      } catch (err) {
        console.error("Clipboard copy failed: ", err);
      }
    });
  }

  // 10. SCROLL-TO-TOP BUTTON
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
      scrollTopBtn.style.display = "flex";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});