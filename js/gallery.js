/* ==============================
   Screenshot Gallery / Lightbox
   Caffeine Opossum Games
   ============================== */

document.addEventListener('DOMContentLoaded', function () {
  const screenshots = Array.from(document.querySelectorAll('.screenshot-grid .screenshot'));
  if (!screenshots.length) return;

  // Build the overlay
  const overlay = document.createElement('div');
  overlay.className = 'gallery-overlay';
  overlay.innerHTML = `
    <button class="gallery-close" aria-label="Close">×</button>
    <button class="gallery-prev" aria-label="Previous">‹</button>
    <button class="gallery-next" aria-label="Next">›</button>
    <div class="gallery-content">
      <img class="gallery-img" src="" alt="">
      <div class="gallery-counter"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const imgEl     = overlay.querySelector('.gallery-img');
  const counterEl = overlay.querySelector('.gallery-counter');
  const btnClose  = overlay.querySelector('.gallery-close');
  const btnPrev   = overlay.querySelector('.gallery-prev');
  const btnNext   = overlay.querySelector('.gallery-next');

  let currentIndex = 0;

  function openGallery(index) {
    currentIndex = index;
    updateImage();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeGallery() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateImage() {
    const shot = screenshots[currentIndex];
    imgEl.src = shot.src;
    imgEl.alt = shot.alt || `Screenshot ${currentIndex + 1}`;
    counterEl.textContent = `${currentIndex + 1} / ${screenshots.length}`;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
    updateImage();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % screenshots.length;
    updateImage();
  }

  // Open on click
  screenshots.forEach((img, i) => {
    img.addEventListener('click', () => openGallery(i));
  });

  // Controls
  btnClose.addEventListener('click', closeGallery);
  btnPrev.addEventListener('click', showPrev);
  btnNext.addEventListener('click', showNext);

  // Click outside image closes
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeGallery();
  });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape')     closeGallery();
    if (e.key === 'ArrowLeft')  showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  // Mobile swipe
  let touchStartX = 0;
  overlay.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  overlay.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 60) {
      diff > 0 ? showPrev() : showNext();
    }
  }, { passive: true });
});