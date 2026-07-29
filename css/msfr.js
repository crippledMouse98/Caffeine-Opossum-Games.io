document.addEventListener('DOMContentLoaded', () => {
  const bg = document.querySelector('.parallax-bg');
  
  if (!bg) {
    console.error('parallax-bg element not found!');
    return;
  }

  window.addEventListener('scroll', () => {
    const speed = 0.4; // try 0.3 – 0.5
    bg.style.transform = `translate3d(0, ${window.scrollY * speed}px, 0)`;
  }, { passive: true });
});