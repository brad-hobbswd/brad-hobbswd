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
  const links = document.querySelectorAll('.nav a[data-nav]');
  links.forEach(a => a.classList.toggle('active', a.dataset.nav === key));
}

(async function () {
  await loadPartial("#siteHeader", "/brad-hobbswd/header.html");
  setActiveNav(document.body.dataset.page || "");
  await loadPartial("#siteFooter", "/brad-hobbswd/footer.html");
})();

function toggleMenu(){
  const menu = document.getElementById("mobileMenu");
  const toggle = document.querySelector(".menuToggle");
  const overlay = document.getElementById("menuOverlay");

  if(menu){
    menu.classList.toggle("open");
  }

  if(toggle){
    toggle.classList.toggle("active");
  }

  if(overlay){
    overlay.classList.toggle("active");
  }
}

document.addEventListener("click", function(e){

  const menu = document.getElementById("mobileMenu");
  const toggle = document.querySelector(".menuToggle");
  const overlay = document.getElementById("menuOverlay");

  if(!menu) return;

  // close when clicking a link OR overlay
  if(
    e.target.closest("#mobileMenu a") ||
    e.target.id === "menuOverlay"
  ){
    menu.classList.remove("open");

    if(toggle) toggle.classList.remove("active");
    if(overlay) overlay.classList.remove("active");
  }

});
