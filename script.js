/* ═══════════════════════════════════════════════════════════════
   ClemArt — Award-Winning Interactions & Animation Engine
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── PRELOADER ─── */
  const preloader = document.getElementById('preloader');
  
  function hidePreloader() {
    if (!preloader.classList.contains('done')) {
      preloader.classList.add('done');
      document.body.style.overflow = '';
      const hero = document.querySelector('.hero');
      if (hero) hero.classList.add('loaded');
    }
  }

  window.addEventListener('load', () => {
    setTimeout(hidePreloader, 2200);
  });
  
  // Güvenlik: Eğer görsellerden biri yüklenmezse sonsuz preloader'ı kır (fallback)
  setTimeout(hidePreloader, 4000);
  
  document.body.style.overflow = 'hidden';

  /* ─── CUSTOM CURSOR ─── */
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      // Cursor follows instantly
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';

      // Follower lags behind
      followerX += (mouseX - followerX) * 0.08;
      followerY += (mouseY - followerY) * 0.08;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover state for links and buttons
    const hoverTargets = document.querySelectorAll('a, button, .coll-card, .heritage__card, .commission__step');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ─── NAV: scroll behaviour ─── */
  const nav = document.getElementById('nav');
  const navBurger = document.getElementById('nav-burger');
  const navMobile = document.getElementById('nav-mobile');
  const mobileLinks = document.querySelectorAll('.nav__mobile-link');

  function onScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─── Mobile nav ─── */
  navBurger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('burger-open');
    navBurger.setAttribute('aria-expanded', isOpen.toString());
    navMobile.classList.toggle('open', isOpen);
    navMobile.setAttribute('aria-hidden', (!isOpen).toString());
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('burger-open');
      navBurger.setAttribute('aria-expanded', 'false');
      navMobile.classList.remove('open');
      navMobile.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  /* ─── Hero: image load ─── */
  const heroImg = document.getElementById('hero-img');
  if (heroImg && heroImg.complete) {
    // Image already cached
  }

  /* ─── SCROLL REVEAL — IntersectionObserver ─── */
  const revealElements = document.querySelectorAll('.reveal-slide, .reveal-block, .reveal-card');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger siblings
          const parent = entry.target.parentElement;
          const siblings = Array.from(parent.querySelectorAll('.reveal-slide:not(.visible), .reveal-block:not(.visible), .reveal-card:not(.visible)'));
          siblings.forEach((sib, i) => {
            setTimeout(() => {
              sib.classList.add('visible');
            }, i * 100);
          });
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  /* ─── PARALLAX ─── */
  const heroImgEl = document.getElementById('hero-img');
  const craftBgImg = document.getElementById('craft-parallax-img');
  const showcaseImg = document.getElementById('showcase-img');

  function applyParallax() {
    const scrollY = window.scrollY;

    if (heroImgEl) {
      const heroOffset = scrollY * 0.08;
      heroImgEl.style.transform = `scale(1.1) translateY(${heroOffset}px)`;
    }

    if (craftBgImg) {
      const craftSection = craftBgImg.closest('.craft');
      const rect = craftSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const offset = (progress - 0.5) * 80;
        craftBgImg.style.transform = `translateY(${offset}px)`;
      }
    }

    if (showcaseImg) {
      const showcaseSection = showcaseImg.closest('.showcase');
      const rect = showcaseSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const offset = (progress - 0.5) * 50;
        showcaseImg.style.transform = `translateY(${offset}px)`;
      }
    }
  }

  window.addEventListener('scroll', applyParallax, { passive: true });

  /* ─── SMOOTH SCROLL for anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── Heritage Carousel: Drag to scroll ─── */
  const carousel = document.getElementById('heritage-carousel');
  if (carousel) {
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.style.cursor = 'grabbing';
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.style.cursor = '';
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.style.cursor = '';
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.5;
      carousel.scrollLeft = scrollLeft - walk;
    });
  }

  /* ─── Collection cards: 3D tilt on hover ─── */
  const collCards = document.querySelectorAll('.coll-card');
  collCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${-cy * 5}deg) rotateY(${cx * 5}deg)`;
      card.style.transition = 'transform 0.1s linear';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });

  /* ─── Commission steps: stagger reveal ─── */
  const steps = document.querySelectorAll('.commission__step');
  const stepsObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        steps.forEach((step, i) => {
          setTimeout(() => step.classList.add('visible'), i * 150);
        });
        stepsObs.disconnect();
      }
    });
  }, { threshold: 0.1 });
  if (steps.length) stepsObs.observe(steps[0]);

  /* ─── Newsletter form micro-feedback ─── */
  const footerForm = document.querySelector('.footer__form');
  const footerSubmit = document.getElementById('footer-submit');
  const footerEmail = document.getElementById('footer-email');
  if (footerForm && footerSubmit) {
    footerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!footerEmail.value.includes('@')) {
        footerEmail.style.borderColor = 'rgba(201,168,76,0.7)';
        return;
      }
      footerSubmit.innerHTML = '✓';
      footerSubmit.style.pointerEvents = 'none';
      footerEmail.value = '';
      footerEmail.placeholder = 'Subscribed ✦';
    });
  }

  /* ─── Marquee: pause on hover ─── */
  const marqueeTrack = document.querySelector('.marquee__track');
  if (marqueeTrack) {
    const marquee = marqueeTrack.closest('.marquee');
    marquee.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marquee.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

})();

/* ── CONVERSION: 3-Minute Engagement (tüm sayfalar) ──────────────
   get-a-quote.html kendi inline script'inde de bunu çalıştırır.
   Burada geri kalan tüm sayfalar için çalışır.
   GTM Custom Event Trigger: event = 'engaged_3_minutes'
──────────────────────────────────────────────────────────────── */
(function() {
  // get-a-quote.html kendi timer'ını içermekte (inline), burada skip et
  if (document.querySelector('.qform-section')) return;
  var _engaged = false;
  setTimeout(function() {
    if (_engaged) return;
    _engaged = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'engaged_3_minutes',
      page_path: window.location.pathname,
      page_title: document.title
    });
  }, 180000); // 3 dakika = 180,000ms
})();
