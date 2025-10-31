document.addEventListener("DOMContentLoaded", () => {
  // --- HEADER BUTTON ---
  document.getElementById("homeBtn")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // --- ABOUT US CAROUSEL ---
  const gameCarousel = document.getElementById('gameCarousel');
  const checkLink = document.getElementById('checkLink');

  if (gameCarousel) {
    gameCarousel.addEventListener('slid.bs.carousel', function () {
      const activeItem = gameCarousel.querySelector('.carousel-item.active');
      const newLink = activeItem?.getAttribute('data-link');
      if (checkLink && newLink) checkLink.href = newLink;
    });

    document.querySelectorAll('#gameCarousel .carousel-item').forEach(item => {
      item.addEventListener('click', () => {
        const link = item.getAttribute('data-link');
        if (link) window.open(link, "_blank");
      });
    });
  }

  // --- GOTXY TEST BUTTON ---
  document.getElementById("gotoxyTest")?.addEventListener("click", () => {
    window.location.href = "index2.html";
  });
});



