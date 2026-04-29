const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  hero.style.setProperty("--parallax-y", `${scrollY * 0.18}px`);
});
