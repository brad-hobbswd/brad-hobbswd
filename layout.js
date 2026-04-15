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

    // ✅ VERY IMPORTANT: run AFTER inject
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
// ACTIVE NAV GLOW
// =========================
function setActiveNav() {

  const currentPage = document.body.getAttribute("data-page");
  console.log("Current page:", currentPage);

  const links = document.querySelectorAll(".nav a");

  let matchFound = false;

  links.forEach(link => {
    const nav = link.getAttribute("data-nav");

    console.log("Checking:", nav);

    link.classList.remove("active");

    if (nav === currentPage) {
      console.log("MATCH FOUND:", nav);
      link.classList.add("active");
      matchFound = true;
    }
  });

  // ✅ FALLBACK (ONLY runs if no match)
  if (!matchFound) {
    console.log("No data-page match, using URL fallback");

    const path = window.location.pathname;

    links.forEach(link => {
      const href = link.getAttribute("href");

      if (href && path.includes(href)) {
        console.log("URL MATCH:", href);
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
// SCROLL EFFECT (SAFE ATTACH)
// =========================
function attachScrollEffect() {

  const topbar = document.querySelector(".topbar");
  if (!topbar) return;

  window.addEventListener("scroll", () => {
    topbar.classList.toggle("scrolled", window.scrollY > 10);
  });

}
