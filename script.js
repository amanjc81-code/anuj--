document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.carousel');
  const slides = document.querySelectorAll('.carousel-slide');
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');
  const heroTitle = document.getElementById('hero-title');
  const heroDescription = document.getElementById('hero-description');
  const heroBuyBtn = document.getElementById('hero-buy-btn');
  const heroVideoBtn = document.getElementById('hero-video-btn');
  const heroContent = document.querySelector('.hero-content');

  let currentIndex = 0;

  // Set initial active slide
  slides[currentIndex].classList.add('active');

  let isAnimating = false;

  function updateCarousel() {
    if (isAnimating) return;
    isAnimating = true;

    // Trigger hero content fade out
    heroContent.classList.add('updating');

    // Find the currently active slide to mark it as 'leaving'
    const prevActive = carousel.querySelector('.carousel-slide.active');
    if (prevActive) {
      prevActive.classList.remove('active');
      prevActive.classList.add('leaving');

      // Clean up the 'leaving' class after the animation completes (1500ms)
      setTimeout(() => {
        prevActive.classList.remove('leaving');
        isAnimating = false; // Reset flag after full transition
      }, 1500);
    } else {
      setTimeout(() => { isAnimating = false; }, 1500);
    }

    // Add active class to current slide and trigger animation
    slides[currentIndex].classList.add('active');

    // Update content and fade back in
    const currentSlide = slides[currentIndex];
    setTimeout(() => {
      heroTitle.textContent = currentSlide.dataset.title;
      heroDescription.textContent = currentSlide.dataset.description;

      // Update Button Links
      if (currentSlide.dataset.buyLink) {
        heroBuyBtn.href = currentSlide.dataset.buyLink;
      }
      if (currentSlide.dataset.videoLink) {
        heroVideoBtn.href = currentSlide.dataset.videoLink;
      }

      // Fade content back in
      heroContent.classList.remove('updating');
    }, 400); // 400ms matches the CSS transition duration
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  let autoSlideInterval = setInterval(nextSlide, 7000);

  function resetTimer() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 7000);
  }

  // Event listeners
  leftArrow.addEventListener('click', () => {
    prevSlide();
    resetTimer();
  });

  rightArrow.addEventListener('click', () => {
    nextSlide();
    resetTimer();
  });

  // Smooth Scroll for Navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Only handle internal links
      if (href !== '#' && href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);

        if (targetElement) {
          const headerOffset = 80; // height of your sticky header
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
