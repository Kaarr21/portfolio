(() => {
  const root = document.documentElement;
  const header = document.getElementById("site-header");
  const navMenu = document.getElementById("nav-menu");
  const menuToggle = document.querySelector(".menu-toggle");
  const themeToggle = document.querySelector(".theme-toggle");
  const scrollBtn = document.querySelector(".scroll-to-top");
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = document.querySelectorAll("section[id]");

  const getPreferredTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.content = theme === "dark" ? "#0f1419" : "#f6f3ee";
    }
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  };

  applyTheme(getPreferredTheme());

  themeToggle?.addEventListener("click", () => {
    const next =
      root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      if (!localStorage.getItem("theme")) {
        applyTheme(event.matches ? "dark" : "light");
      }
    });

  const setMenuOpen = (open) => {
    navMenu?.classList.toggle("is-open", open);
    menuToggle?.setAttribute("aria-expanded", String(open));
    menuToggle?.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  menuToggle?.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    setMenuOpen(open);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  const updateScrollTop = () => {
    if (!scrollBtn) return;
    const visible = window.scrollY > 360;
    scrollBtn.classList.toggle("is-visible", visible);
    scrollBtn.hidden = !visible;
  };

  const updateActiveNav = () => {
    let current = "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 220) {
        current = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${current}`);
    });
  };

  const onScroll = () => {
    updateHeader();
    updateScrollTop();
    updateActiveNav();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  scrollBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const revealEls = document.querySelectorAll(".reveal");
  // Hero content should appear immediately on first paint
  document.querySelectorAll(".hero .reveal").forEach((el) => {
    el.classList.add("is-visible");
  });

  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => {
      if (!el.classList.contains("is-visible")) observer.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const subject = document.getElementById("subject")?.value.trim() || "";
    const message = document.getElementById("message")?.value.trim() || "";

    if (!name || !email || !subject || !message) {
      if (formStatus) {
        formStatus.textContent = "Please fill in all fields.";
        formStatus.className = "form-status is-error";
      }
      return;
    }

    const body = `Hi Nancy,\n\nMy name is ${name} (${email}).\n\n${message}`;
    const mailto = `mailto:karokin35@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    if (formStatus) {
      formStatus.textContent = "Opening your email client…";
      formStatus.className = "form-status is-success";
    }

    window.location.href = mailto;
    contactForm.reset();
  });
})();
