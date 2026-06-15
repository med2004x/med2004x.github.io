document.addEventListener('DOMContentLoaded', () => {
  // Initialize Scroll Reveal Elements using IntersectionObserver
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Stop observing once revealed to prevent unnecessary triggers
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // Trigger when 15% of element is visible
    rootMargin: '0px 0px -50px 0px' // Offset trigger point slightly from screen bottom
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // Copy to Clipboard Functionality
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email');
      
      try {
        await navigator.clipboard.writeText(email);
        
        // Visual Feedback
        const originalText = copyBtn.querySelector('.btn-text').textContent;
        copyBtn.classList.add('copied');
        copyBtn.querySelector('.btn-text').textContent = 'Copied';
        
        // Reset after delay
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.querySelector('.btn-text').textContent = originalText;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    });
  }

  // Active Navigation Link Highlighting on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 100; // Add offset for sticky header

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active-nav');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active-nav');
      }
    });
  });
});
