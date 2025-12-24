/* =================================
   GLOBAL SCRIPT — CLEAN & FINAL
================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ================================
     PAGE READY (NO FLASH)
  ================================ */
  document.body.classList.add("page-ready");


  /* ================================
     MOBILE MENU
  ================================ */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }


  /* ================================
     FOOTER YEAR
  ================================ */
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();


  /* ================================
     TESTIMONIAL SLIDER
  ================================ */
  const testimonials = document.querySelectorAll(".testimonial");
  let t = 0;

  if (testimonials.length > 0) {
    testimonials[0].classList.add("active");
    setInterval(() => {
      testimonials[t].classList.remove("active");
      t = (t + 1) % testimonials.length;
      testimonials[t].classList.add("active");
    }, 4500);
  }


  /* ================================
     SCROLL REVEAL
  ================================ */
  const items = document.querySelectorAll(".fade-in");
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.2 });

  items.forEach(el => reveal.observe(el));


  /* ================================
     LIVESTREAM COUNTDOWN (WORKING)
     Sunday 21 Dec 2025 — 10:30 AM
  ================================ */
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const titleEl = document.getElementById("countdownTitle");

  if (daysEl && hoursEl && minutesEl && secondsEl) {

    const nextService = new Date(2025, 11, 21, 10, 30, 0).getTime();

    function updateCountdown() {
      const now = Date.now();
      const diff = nextService - now;

      if (diff <= 0) {
        if (titleEl) titleEl.textContent = "We Are Live Now!";
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        return;
      }

      daysEl.textContent = Math.floor(diff / (1000*60*60*24));
      hoursEl.textContent = Math.floor((diff / (1000*60*60)) % 24);
      minutesEl.textContent = Math.floor((diff / (1000*60)) % 60);
      secondsEl.textContent = Math.floor((diff / 1000) % 60);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

});
/* ================================
   LIVESTREAM STATUS SWITCH
================================ */
const now = Date.now();
const serviceStart = new Date(2025, 11, 21, 10, 30, 0).getTime();
const serviceEnd = serviceStart + (2 * 60 * 60 * 1000); // 2 hours

const countdownBox = document.getElementById("countdownBox");
const titleEl = document.getElementById("countdownTitle");
const ytFrame = document.getElementById("ytLive");

if (now >= serviceStart && now <= serviceEnd) {
  // LIVE
  if (countdownBox) countdownBox.style.display = "none";
  if (titleEl) titleEl.textContent = "🔴 We Are Live Now!";
}

if (now > serviceEnd) {
  // AFTER SERVICE
  if (countdownBox) countdownBox.style.display = "none";
  if (titleEl) titleEl.textContent = "Service has ended — Watch the replay";

  if (ytFrame) {
    ytFrame.src = "https://www.youtube.com/embed/AEmIUpETbek";
  }
}
