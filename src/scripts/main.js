document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.place-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.querySelectorAll('.carousel-slide'));
  const prevButton = carousel.querySelector('.carousel-button.prev');
  const nextButton = carousel.querySelector('.carousel-button.next');
  let currentIndex = 0;
  const slidesCount = slides.length;
  const autoplayInterval = 3500;
  let autoplayTimer = null;

  const updateCarousel = () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

    slides.forEach((slide, idx) => {
      slide.style.opacity = idx === currentIndex ? '1' : '0.5';
      slide.style.transform = idx === currentIndex ? 'scale(1)' : 'scale(0.96)';
    });
  };

  const goNext = () => {
    currentIndex = (currentIndex + 1) % slidesCount;
    updateCarousel();
  };

  const goPrev = () => {
    currentIndex = (currentIndex - 1 + slidesCount) % slidesCount;
    updateCarousel();
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer = setInterval(goNext, autoplayInterval);
  };

  const stopAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  if (prevButton) prevButton.addEventListener('click', goPrev);
  if (nextButton) nextButton.addEventListener('click', goNext);

  // carousel.addEventListener('mouseenter', stopAutoplay);
  // carousel.addEventListener('mouseleave', startAutoplay);
  // carousel.addEventListener('focusin', stopAutoplay);
  // carousel.addEventListener('focusout', startAutoplay);

  window.addEventListener('resize', updateCarousel);


  // Свайп
let startX = 0;
let isDragging = false;

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
}, { passive: true });

track.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  // Блокируем скролл страницы при горизонтальном свайпе
  const deltaX = e.touches[0].clientX - startX;
  if (Math.abs(deltaX) > 10) {
    e.preventDefault();
  }
}, { passive: false });

track.addEventListener('touchend', (e) => {
  if (!isDragging) return;
  isDragging = false;

  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  // Порог срабатывания свайпа — 50px
  if (diff > 50) goTo(current + 1);
  if (diff < -50) goTo(current - 1);
});

  updateCarousel();
  startAutoplay();
});