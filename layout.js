document.addEventListener("DOMContentLoaded", async function () {

  // =========================
  // LOAD HEADER
  // =========================
  try {
    const res = await fetch("/brad-hobbswd/header.html");
    if (!res.ok) throw new Error("Header not found");

    const html = await res.text();

    const header = document.getElementById("siteHeader");
    if (header) {
      header.innerHTML = html;
    }

  } catch (err) {
    console.error("Header load error:", err);
  }

  // =========================
  // LOAD FOOTER (optional)
  // =========================
  try {
    const res = await fetch("/brad-hobbswd/footer.html");
    if (res.ok) {
      const html = await res.text();
      const footer = document.getElementById("siteFooter");
      if (footer) footer.innerHTML = html;
    }
  } catch (err) {
    console.error("Footer load error:", err);
  }

});


// =========================
// MOBILE MENU TOGGLE
// =========================
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("menuOverlay");

  if (!menu || !overlay) return;

  menu.classList.toggle("open");
  overlay.classList.toggle("active");
}


// =========================
// SCROLL EFFECT (WAIT FOR HEADER)
// =========================
window.addEventListener("scroll", function () {

  const topbar = document.querySelector(".topbar");

  if (!topbar) return;

  if (window.scrollY > 10) {
    topbar.classList.add("scrolled");
  } else {
    topbar.classList.remove("scrolled");
  }

});
