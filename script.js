/**
 * BADAL SHARMA — DESIGN ENGINEER & FULL STACK DEVELOPER PORTFOLIO
 * Core Interaction, Three.js WebGL Engine, Lenis Smooth Scroll & GSAP Choreography
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject Official Brand SVGs (GitHub & LinkedIn) to avoid deprecation warnings
  const githubSvg = `<svg class="icon-brand" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>`;
  const linkedinSvg = `<svg class="icon-brand" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>`;

  document.querySelectorAll('[data-lucide="github"]').forEach((el) => {
    el.outerHTML = githubSvg;
  });
  document.querySelectorAll('[data-lucide="linkedin"]').forEach((el) => {
    el.outerHTML = linkedinSvg;
  });

  // Initialize Lucide Vector Icons for other icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Initialize Lenis Smooth Scroll
  let lenis = null;
  const initLenis = () => {
    // Respect user's motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.8,
      });

      window.lenis = lenis;

      // Handle anchor link clicks with Lenis smooth scroll
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
          const href = this.getAttribute('href');
          if (href === '#' || !href) return;
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -20, duration: 1.2 });
          }
        });
      });

      // Synchronize Lenis with GSAP ScrollTrigger if available
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } else {
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    }
  };
  initLenis();

  // 3. GSAP & ScrollTrigger Choreography
  const initGSAP = () => {
    if (typeof gsap === 'undefined') return;

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero Stagger Animation on Initial Load
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });

    heroTl
      .from('.status-pill', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: 0.1,
      })
      .from(
        '.hero-title',
        {
          opacity: 0,
          y: 35,
          duration: 0.85,
        },
        '-=0.45'
      )
      .from(
        '.hero-description',
        {
          opacity: 0,
          y: 25,
          duration: 0.7,
        },
        '-=0.5'
      )
      .from(
        '.hero-cta-group > *',
        {
          opacity: 0,
          y: 20,
          stagger: 0.08,
          duration: 0.6,
        },
        '-=0.4'
      )
      .from(
        '.hero-socials > *',
        {
          opacity: 0,
          y: 15,
          stagger: 0.06,
          duration: 0.5,
        },
        '-=0.3'
      )
      .from(
        '.hero-visual',
        {
          opacity: 0,
          scale: 0.94,
          duration: 0.9,
          ease: 'back.out(1.4)',
        },
        '-=0.7'
      );

    // ScrollTrigger: Stagger Reveal for Sections & Cards
    if (typeof ScrollTrigger !== 'undefined') {
      // Reveal Project Cards
      gsap.utils.toArray('.project-card').forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 40,
          scale: 0.96,
          duration: 0.7,
          ease: 'power2.out',
        });
      });

      // Reveal Timeline Items
      gsap.utils.toArray('.timeline-item').forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          x: -30,
          duration: 0.7,
          ease: 'power2.out',
        });
      });

      // Reveal Skills Cards
      gsap.utils.toArray('.skill-category-card').forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: idx * 0.1,
          ease: 'power2.out',
        });
      });

      // Reveal Credential Cards
      gsap.utils.toArray('.credential-card').forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: idx * 0.08,
          ease: 'power2.out',
        });
      });
    }
  };
  initGSAP();

  // 5. Interactive Project Category Filtering
  const initProjectFilters = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active class & ARIA
        filterButtons.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Filter cards with smooth fade/scale
        projectCards.forEach((card) => {
          const categories = card.getAttribute('data-category') || '';
          const match = filter === 'all' || categories.includes(filter);

          if (match) {
            card.style.display = 'flex';
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1) translateY(0)';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.96) translateY(10px)';
            setTimeout(() => {
              if (card.style.opacity === '0') {
                card.style.display = 'none';
              }
            }, 200);
          }
        });

        // Trigger ScrollTrigger refresh if Lenis/GSAP is active
        if (typeof ScrollTrigger !== 'undefined') {
          setTimeout(() => ScrollTrigger.refresh(), 220);
        }
      });
    });
  };
  initProjectFilters();

  // 6. Navigation Active State Highlighting
  const initNavHighlighter = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');

    const onScroll = () => {
      const scrollPos = window.scrollY + 200;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach((link) => {
            if (link.getAttribute('data-section') === id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  };
  initNavHighlighter();

  // 7. Clipboard Copy & Toast Feedback
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout = null;

  const showToast = (message) => {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add('visible');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('visible');
    }, 3200);
  };

  const copyEmailButtons = document.querySelectorAll('.copy-email-btn');
  copyEmailButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-email') || 'badalsharma2741@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast(`Email copied: ${email}`);
      } catch (err) {
        showToast('Email: badalsharma2741@gmail.com');
      }
    });
  });

  // 8. Mobile Drawer Menu
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (menuToggle && mobileDrawer) {
    const openDrawer = () => {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    };

    menuToggle.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) closeDrawer();
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // 9. Back to Top Smooth Button
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // 10. Live IST (India Standard Time) Clock
  const istTimeElement = document.getElementById('ist-time');
  const updateTime = () => {
    if (!istTimeElement) return;
    const now = new Date();
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    istTimeElement.textContent = new Intl.DateTimeFormat('en-US', options).format(now);
  };
  updateTime();
  setInterval(updateTime, 1000);

  // 11. Current Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 12. Interactive Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !email || !subject || !message) {
        showToast('Please fill out all form fields.');
        return;
      }

      // Format mailto link as direct fallback
      const mailtoUrl = `mailto:badalsharma2741@gmail.com?subject=${encodeURIComponent(
        `[Portfolio] ${subject}`
      )}&body=${encodeURIComponent(
        `Hi Badal,\n\nMy name is ${name} (${email}).\n\n${message}\n\nBest regards,\n${name}`
      )}`;

      showToast('Opening email client to send message...');
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 500);

      contactForm.reset();
    });
  }

  // 13. Pure Automatic System Theme Controller (Follows Browser / OS Preference)
  const colorSchemeMedia = window.matchMedia('(prefers-color-scheme: light)');

  const applyAutomaticTheme = (isLight) => {
    if (isLight) {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  };

  // Set initial appearance to match browser/OS
  applyAutomaticTheme(colorSchemeMedia.matches);

  // Automatically adapt if user toggles OS/browser appearance
  colorSchemeMedia.addEventListener('change', (e) => {
    applyAutomaticTheme(e.matches);
  });

  // 14. Native iOS Bottom Navigation Dock & Scroll Spy
  const iosTabs = document.querySelectorAll('.ios-tab-item');
  const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link');

  // Handle Tab Click
  iosTabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = tab.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        if (lenis) {
          lenis.scrollTo(targetSection, { offset: -20, duration: 0.9 });
        } else {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
      // Update active state immediately on click
      iosTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // Scroll Spy for iOS bottom nav & desktop nav links
  const spySections = ['hero', 'projects', 'skills', 'experience', 'contact'];
  const updateActiveSectionOnScroll = () => {
    const scrollPosition = window.scrollY + 200;
    let currentSection = 'hero';

    spySections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          currentSection = id;
        }
      }
    });

    // Update iOS tab items
    iosTabs.forEach((tab) => {
      const href = tab.getAttribute('href');
      if (href === `#${currentSection}`) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Update desktop nav links
    desktopNavLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${currentSection}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveSectionOnScroll, { passive: true });
});
