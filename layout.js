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

  if (!currentPage) {
    console.warn("No data-page set on body");
    return;
  }

  const links = document.querySelectorAll(".nav a");

  links.forEach(link => {
    const nav = link.getAttribute("data-nav");

    // reset first (important for reloads)
    link.classList.remove("active");

    if (nav === currentPage) {
      link.classList.add("active");
    }
  });

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
