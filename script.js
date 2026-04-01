/* ═══════════════════════════════════════════════════════════════
   ClemArt — Premium Interactions & Animation Script
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Nav: scroll behaviour ─── */
  const nav     = document.getElementById('nav');
  const navBurger = document.getElementById('nav-burger');
  const navMobile = document.getElementById('nav-mobile');
  const mobileLinks = document.querySelectorAll('.nav__mobile-link, .nav__mobile a');

  function onScroll () {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─── Mobile nav burger ─── */
  navBurger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('burger-open');
    navBurger.setAttribute('aria-expanded', isOpen.toString());
    navMobile.classList.toggle('open', isOpen);
    navMobile.setAttribute('aria-hidden', (!isOpen).toString());
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('burger-open');
      navBurger.setAttribute('aria-expanded', 'false');
      navMobile.classList.remove('open');
      navMobile.setAttribute('aria-hidden', 'true');
    });
  });

  /* ─── Hero: image load class ─── */
  const heroSection = document.querySelector('.hero');
  const heroImg     = document.getElementById('hero-img');
  if (heroImg) {
    if (heroImg.complete) {
      heroSection.classList.add('loaded');
    } else {
      heroImg.addEventListener('load', () => heroSection.classList.add('loaded'));
    }
  }

  /* ─── Scroll Reveal (IntersectionObserver) ─── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Stagger siblings in same parent
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
          siblings.forEach((sib, i) => {
            setTimeout(() => {
              sib.classList.add('visible');
            }, i * 80);
          });
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  reveals.forEach(el => revealObserver.observe(el));

  /* ─── Parallax: hero image subtle scroll ─── */
  const heroImgEl = document.getElementById('hero-img');
  const interiorImg = document.getElementById('interior-img');

  function applyParallax () {
    const scrollY = window.scrollY;
    if (heroImgEl) {
      heroImgEl.style.transform = `scale(1) translateY(${scrollY * 0.12}px)`;
    }
    if (interiorImg) {
      const rect    = interiorImg.closest('.interior').getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const offset  = (window.innerHeight / 2 - centerY) * 0.08;
      interiorImg.style.transform = `translateY(${offset}px)`;
    }
  }
  window.addEventListener('scroll', applyParallax, { passive: true });

  /* ─── Smooth scroll for anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 80;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── Collection cards: subtle tilt on hover ─── */
  const colCards = document.querySelectorAll('.col-card');
  colCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = (e.clientX - rect.left) / rect.width  - 0.5;
      const cy     = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-cy * 4}deg) rotateY(${cx * 4}deg)`;
      card.style.transition = 'transform 0.1s linear';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });

  /* ─── Prestige cards: stagger reveal ─── */
  const prestigeCards = document.querySelectorAll('.prestige__card');
  const prestigeObs   = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const allCards = document.querySelectorAll('.prestige__card');
        allCards.forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 90);
        });
        prestigeObs.disconnect();
      }
    });
  }, { threshold: 0.1 });
  if (prestigeCards.length) prestigeObs.observe(prestigeCards[0]);

  /* ─── Cursor: subtle gold glow follow (desktop) ─── */
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.id = 'cursor-glow';
    Object.assign(cursor.style, {
      position:     'fixed',
      width:        '320px',
      height:       '320px',
      borderRadius: '50%',
      background:   'radial-gradient(circle, rgba(184,150,90,0.055) 0%, transparent 70%)',
      pointerEvents:'none',
      zIndex:       '9999',
      transform:    'translate(-50%, -50%)',
      transition:   'opacity 0.3s ease',
      opacity:      '0',
    });
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let raf = null;
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = '1';
      if (!raf) {
        raf = requestAnimationFrame(moveCursor);
      }
    });
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });
    function moveCursor () {
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
      raf = null;
    }
  }

  /* ─── Heritage item: animate on enter ─── */
  const heritageItems = document.querySelectorAll('.heritage__item');
  const heritageObs   = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        heritageObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  heritageItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transition = 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
    heritageObs.observe(item);
  });

  /* ─── Bespoke steps: sequential reveal ─── */
  const bespokeSteps = document.querySelectorAll('.bespoke__step');
  const bespokeObs   = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bespokeSteps.forEach((step, i) => {
          setTimeout(() => step.classList.add('visible'), i * 160);
        });
        bespokeObs.disconnect();
      }
    });
  }, { threshold: 0.1 });
  if (bespokeSteps.length) bespokeObs.observe(bespokeSteps[0]);

  /* ─── Footer newsletter: micro feedback ─── */
  const footerForm   = document.querySelector('.footer__form');
  const footerSubmit = document.getElementById('footer-submit');
  const footerEmail  = document.getElementById('footer-email');
  if (footerForm && footerSubmit) {
    footerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!footerEmail.value.includes('@')) {
        footerEmail.style.borderColor = 'rgba(184,150,90,0.7)';
        return;
      }
      footerSubmit.textContent = '✦ Subscribed';
      footerSubmit.style.pointerEvents = 'none';
      footerEmail.value = '';
    });
  }

})();
