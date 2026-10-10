
console.log("Government Polytechnic Ranchi Website Loaded!");

/* ================================
   MOBILE MENU
================================ */
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector("header nav");
const navLinks = document.querySelectorAll("header nav a");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
        const isOpen = nav.classList.toggle("open");

        menuBtn.textContent = isOpen ? "✕" : "☰";
        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            nav.classList.remove("open");
            menuBtn.textContent = "☰";
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });

    // Close the mobile menu with Escape
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            nav.classList.remove("open");
            menuBtn.textContent = "☰";
            menuBtn.setAttribute("aria-expanded", "false");
        }
    });
}

/* ================================
   SCROLL TO TOP
================================ */
const scrollTopBtn = document.getElementById("scrollTopBtn");

function updateScrollTopButton() {
    if (!scrollTopBtn) return;

    scrollTopBtn.classList.toggle("show", window.scrollY > 400);
}

window.addEventListener("scroll", updateScrollTopButton, {
    passive: true
});

updateScrollTopButton();

if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* ================================
   SCROLL REVEAL
================================ */
const revealElements = document.querySelectorAll(
    ".about, .academics, .course-card, .service"
);

if ("IntersectionObserver" in window) {
    revealElements.forEach(function (element) {
        element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
        function (entries, observerInstance) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observerInstance.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealElements.forEach(function (element) {
        observer.observe(element);
    });
}

/* ================================
   ACTIVE NAVIGATION
================================ */
function updateActiveNavigation() {
    const sections = document.querySelectorAll("section[id]");
    let currentSection = "";

    sections.forEach(function (section) {
        const sectionTop =
            section.getBoundingClientRect().top + window.scrollY - 160;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(function (link) {
        const href = link.getAttribute("href");
        const isHome =
            (!href || href === "#") && window.scrollY < 200;

        const isCurrentSection =
            currentSection && href === "#" + currentSection;

        link.classList.toggle(
            "active",
            Boolean(isHome || isCurrentSection)
        );
    });
}

window.addEventListener("scroll", updateActiveNavigation, {
    passive: true
});

window.addEventListener("load", updateActiveNavigation);
