document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const carouselContent = carousel.querySelector(".carousel-content");
  const images = carouselContent.querySelectorAll("img");
  const leftBtn = carousel.querySelector(".carousel-control-left");
  const rightBtn = carousel.querySelector(".carousel-control-right");

  let index = 1;
  let imageWidth = carousel.offsetWidth;
  let autoSlide;

  function updateTransform() {
    carouselContent.style.transition = "transform 0.5s ease";
    carouselContent.style.transform = `translateX(-${index * imageWidth}px)`;
  }

  function startAutoSlide() {
    autoSlide = setInterval(() => {
      index++;
      updateTransform();
    }, 3000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  function jumpToRealImage() {
    carouselContent.style.transition = "none";
    if (index === 0) {
      index = images.length - 2;
    } else if (index === images.length - 1) {
      index = 1;
    }
    carouselContent.style.transform = `translateX(-${index * imageWidth}px)`;
  }

  // Initial position
  carouselContent.style.transform = `translateX(-${index * imageWidth}px)`;

  // Auto slide
  startAutoSlide();

  // Controls
  rightBtn.addEventListener("click", () => {
    stopAutoSlide();
    index++;
    updateTransform();
    startAutoSlide();
  });

  leftBtn.addEventListener("click", () => {
    stopAutoSlide();
    index--;
    updateTransform();
    startAutoSlide();
  });

  // Infinite loop effect
  carouselContent.addEventListener("transitionend", jumpToRealImage);

  // Pause on hover
  carousel.addEventListener("mouseenter", stopAutoSlide);
  carousel.addEventListener("mouseleave", startAutoSlide);

  // Handle resize
  window.addEventListener("resize", () => {
    imageWidth = carousel.offsetWidth;
    carouselContent.style.transition = "none";
    carouselContent.style.transform = `translateX(-${index * imageWidth}px)`;
  });
});
