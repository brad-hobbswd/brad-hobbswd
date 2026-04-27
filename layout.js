document.addEventListener("DOMContentLoaded", async function () {

  await loadHeader();
  await loadFooter();

});


// =========================
// LOAD HEADER
// =========================
async function loadHeader() {
  try {
    const res = await fetch("/brad-hobbswd/header.html");
    if (!res.ok) throw new Error("Header not found");

    const html = await res.text();

    const header = document.getElementById("siteHeader");
    if (!header) return;

    header.innerHTML = html;

    // RUN AFTER INJECTION
    setActiveNav();
    attachScrollEffect();

  } catch (err) {
    console.error("Header load error:", err);
  }
}


// =========================
// LOAD FOOTER
// =========================
async function loadFooter() {
  try {
    const res = await fetch("/brad-hobbswd/footer.html");
    if (!res.ok) throw new Error("Footer not found");

    const html = await res.text();

    const footer = document.getElementById("siteFooter");
    if (!footer) return;

    footer.innerHTML = html;

  } catch (err) {
    console.error("Footer load error:", err);
  }
}


// =========================
// ACTIVE NAV
// =========================
function setActiveNav() {

  const currentPage = document.body.getAttribute("data-page");
  const links = document.querySelectorAll(".nav a");

  let matchFound = false;

  links.forEach(link => {
    const nav = link.getAttribute("data-nav");

    link.classList.remove("active");

    if (nav === currentPage) {
      link.classList.add("active");
      matchFound = true;
    }
  });

  if (!matchFound) {
    const path = window.location.pathname;

    links.forEach(link => {
      const href = link.getAttribute("href");
      if (href && path.includes(href)) {
        link.classList.add("active");
      }
    });
  }

}


// =========================
// MOBILE MENU
// =========================
function toggleMenu() {

  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("menuOverlay");

  if (!menu || !overlay) return;

  menu.classList.toggle("open");
  overlay.classList.toggle("active");

}


// =========================
// SCROLL EFFECT (FIXED TRANSFORM)
// =========================
let scrollAttached = false;

function attachScrollEffect() {

  if (scrollAttached) return;
  scrollAttached = true;

  const topbar = document.querySelector(".topbar");
  if (!topbar) return;

  let lastScroll = 0;

  window.addEventListener("scroll", () => {

    const currentScroll = window.scrollY;

    // GLOW EFFECT
    if (currentScroll > 10) {
      topbar.classList.add("scrolled");
    } else {
      topbar.classList.remove("scrolled");
    }

    // FLOAT EFFECT (FIXED TRANSFORM)
    if (currentScroll > lastScroll && currentScroll > 100) {
      topbar.style.transform = "translateX(-50%) translateY(-20px)";
      topbar.style.opacity = "0.95";
    } else {
      topbar.style.transform = "translateX(-50%) translateY(0)";
      topbar.style.opacity = "1";
    }

    lastScroll = currentScroll;

  });

}
