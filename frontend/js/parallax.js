const bg = document.querySelector(".hero-bg");

let ticking = false;

function update() {
  const scrollY = window.scrollY;

  if (scrollY <= window.innerHeight * 1.5) {
    bg.style.transform = `
      translate3d(-50%, ${scrollY * 0.18}px, 0)
    `;
  }

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(update);
    ticking = true;
  }
});
