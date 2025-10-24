// --- HEADER BUTTON ---
document.getElementById("homeBtn")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- ABOUT US CAROUSEL ---
// Seleccionamos el carrusel y el link
const gameCarousel = document.getElementById('gameCarousel');
const checkLink = document.getElementById('checkLink');

// Cada vez que el carrusel cambie de slide
gameCarousel.addEventListener('slid.bs.carousel', function () {
    // Buscamos el item activo
    const activeItem = gameCarousel.querySelector('.carousel-item.active');
    // Tomamos el data-link
    const newLink = activeItem.getAttribute('data-link');
    // Actualizamos el href del link
    checkLink.href = newLink;
});


// --- GOTXY TEST BUTTON ---
document.getElementById("gotoxyTest")?.addEventListener("click", () => {
  window.location.href = "index2.html";
});
    document.querySelectorAll('#gameCarousel .carousel-item').forEach(item => {
            item.addEventListener('click', () => {
                const link = item.getAttribute('data-link');
                if (link) window.open(link, "_blank");
            });
        });