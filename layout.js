document.addEventListener("DOMContentLoaded", function(){

  const form = document.getElementById("quoteForm");
  const btn = document.getElementById("sendBtn");
  const status = document.getElementById("formStatus");

  if (!form) return;

  form.addEventListener("submit", async function(e){

    e.preventDefault();

    if (btn.disabled) return;

    const formData = new FormData(form);

    // spam protection
    if (formData.get("_gotcha")) return;

    // UI state
    btn.disabled = true;
    btn.textContent = "Sending...";
    status.textContent = "";
    status.style.color = "#b8c7e6";

    try {

      const res = await fetch("https://formspree.io/f/mzdajjkb", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      if (res.ok) {

        form.reset();

        status.textContent = "Message sent successfully!";
        status.style.color = "#7dd3ff";

        // ✨ shimmer animation
        btn.classList.add("shimmer");

        setTimeout(() => {
          btn.classList.remove("shimmer");
          window.location.href = "thanks.html";
        }, 900);

        return;
      }

      status.textContent = "Submission failed. Please try again.";
      status.style.color = "#ff6b6b";

    } catch (error) {

      status.textContent = "Network error. Please try again.";
      status.style.color = "#ff6b6b";

    } finally {

      btn.disabled = false;
      btn.textContent = "Send Message";

    }

  });

});
