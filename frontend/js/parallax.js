const heroBackground = document.querySelector(".hero-bg");

let parallaxTicking = false;

function updateHeroParallax() {
  if (!heroBackground) {
    return;
  }

  const scrollY = window.scrollY;
  const maxParallaxDistance = window.innerHeight * 1.5;

  if (scrollY <= maxParallaxDistance) {
    heroBackground.style.transform = `translate3d(-50%, ${scrollY * 0.18}px, 0)`;
  }

  parallaxTicking = false;
}

if (heroBackground) {
  window.addEventListener(
    "scroll",
    () => {
      if (!parallaxTicking) {
        requestAnimationFrame(updateHeroParallax);
        parallaxTicking = true;
      }
    },
    { passive: true }
  );
}
