async function loadPartial(selector, file) {
  const target = document.querySelector(selector);
  if (!target) return;

  const res = await fetch(file, { cache: "no-store" });
  if (!res.ok) {
    target.innerHTML = "";
    return;
  }
  target.innerHTML = await res.text();
}

function setActiveNav(key) {

  // desktop nav
  const desktopLinks = document.querySelectorAll('.nav a[data-nav]');
  desktopLinks.forEach(a => {
    a.classList.toggle('active', a.dataset.nav === key);
  });

  // mobile nav
  const mobileLinks = document.querySelectorAll('#mobileMenu a');
  mobileLinks.forEach(a => {
    const href = a.getAttribute('href') || "";

    if(key && href.includes(key)){
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

}

(async function () {
  await loadPartial("#siteHeader", "/brad-hobbswd/header.html");
  setActiveNav(document.body.dataset.page || "");
  await loadPartial("#siteFooter", "/brad-hobbswd/footer.html");
})();

/* ================= MENU TOGGLE ================= */

function toggleMenu(){
  const menu = document.getElementById("mobileMenu");
  const toggle = document.querySelector(".menuToggle");
  const overlay = document.getElementById("menuOverlay");

  if(menu) menu.classList.toggle("open");
  if(toggle) toggle.classList.toggle("active");
  if(overlay) overlay.classList.toggle("active");
}

/* ================= CLOSE MENU ================= */

document.addEventListener("click", function(e){

  const menu = document.getElementById("mobileMenu");
  const toggle = document.querySelector(".menuToggle");
  const overlay = document.getElementById("menuOverlay");

  if(!menu) return;

  if(
    e.target.closest("#mobileMenu a") ||
    e.target.id === "menuOverlay"
  ){
    menu.classList.remove("open");

    if(toggle) toggle.classList.remove("active");
    if(overlay) overlay.classList.remove("active");
  }

});
