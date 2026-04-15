/* ================= LOAD PARTIALS ================= */

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

/* ================= ACTIVE NAV ================= */

function setActiveNav(key) {

  // desktop nav
  document.querySelectorAll('.nav a[data-nav]').forEach(a => {
    a.classList.toggle('active', a.dataset.nav === key);
  });

  // mobile nav
  document.querySelectorAll('#mobileMenu a[data-nav]').forEach(a => {
    a.classList.toggle('active', a.dataset.nav === key);
  });

}

/* ================= INIT ================= */

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

/* ================= CONTACT FORM HANDLER ================= */

document.addEventListener("DOMContentLoaded", function(){

  const form = document.getElementById("quoteForm");
  const status = document.getElementById("formStatus");
  const btn = document.getElementById("sendBtn");

  if (!form || !btn) return;

  form.addEventListener("submit", async function (e) {

    e.preventDefault();

    if (btn.disabled) return;

    const formData = new FormData(form);

    // spam protection
    if (formData.get("_gotcha")) return;

    status.textContent = "Sending...";
    status.style.color = "#b8c7e6";

    btn.textContent = "Sending...";
    btn.disabled = true;

    try {

      const res = await fetch("https://formspree.io/f/mzdajjkb", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData
      });

      if (res.ok) {

        form.reset();

        status.textContent = "Message sent successfully!";
        status.style.color = "#7dd3ff";

        // ✨ shimmer effect
        btn.classList.add("shimmer");

        setTimeout(() => {
          btn.classList.remove("shimmer");
          window.location.href = "thanks.html";
        }, 900);

        return;
      }

      status.textContent = "Submission failed. Please try again.";
      status.style.color = "#ff6b6b";

    } catch (err) {

      status.textContent = "Network error. Please try again.";
      status.style.color = "#ff6b6b";

    } finally {

      btn.disabled = false;
      btn.textContent = "Send Message";

    }

  });

});
