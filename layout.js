async function loadPartial(selector, file) {
  const target = document.querySelector(selector);
  if (!target) return;
  const res = await fetch(file, { cache: "no-store" });
  if (!res.ok) return;
  target.innerHTML = await res.text();
}

function setActiveNav(key) {
  const links = document.querySelectorAll('.nav a[data-nav]');
  links.forEach(a => a.classList.toggle('active', a.dataset.nav === key));
}

(async function () {
  await loadPartial("#siteHeader", "/brad-hobbswd/header.html");
  const pageKey = document.body.dataset.page || "";
  setActiveNav(pageKey);
  await loadPartial("#siteFooter", "/brad-hobbswd/footer.html");
})();
