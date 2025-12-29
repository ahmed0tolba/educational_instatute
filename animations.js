document.addEventListener('DOMContentLoaded', function () {
    // Get all elements with scroll animation classes
    const scrollElements = document.querySelectorAll('.scroll-fade, .scroll-fade-left, .scroll-fade-right');

    // Function to check if element is in viewport
    const elementInView = (el, percentageScroll = 100) => {
      const elementTop = el.getBoundingClientRect().top;
      const elementHeight = el.getBoundingClientRect().height;

      return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100)
      );
    };

    // Function to handle scroll animation
    const handleScrollAnimation = () => {
      scrollElements.forEach(el => {
        if (elementInView(el, 90)) {
          el.classList.add('scroll-visible');
        }
      });
    };

    // Initial check on page load
    setTimeout(() => {
      handleScrollAnimation();
    }, 300);

    // Listen for scroll events with throttling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(handleScrollAnimation, 50);
    });

    // Also check on window resize
    window.addEventListener('resize', handleScrollAnimation);
  });