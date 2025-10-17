// --- HEADER BUTTON ---
document.getElementById("homeBtn")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- ABOUT US CAROUSEL ---
const checkLink = document.getElementById("checkLink");
const carousel = document.getElementById("gameCarousel");

// Cada slide tiene su link en data-link
carousel.addEventListener("slid.bs.carousel", function () {
  const activeItem = carousel.querySelector(".carousel-item.active");
  const link = activeItem.getAttribute("data-link");
  checkLink.href = link;
});

// --- GOTXY TEST BUTTON ---
document.getElementById("gotoxyTest")?.addEventListener("click", () => {
  window.location.href = "index2.html";
});