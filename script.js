/* Ballroom Dance Studio Aberdeen — interactions */
(function(){
  'use strict';


  // ---------- Remote GitHub-hosted images (no local binary dependency) ----------
  // Replace these URLs with your own GitHub raw/CDN links.
  const IMAGE_URLS = {
    hero: 'https://raw.githubusercontent.com/<owner>/<repo>/<branch>/hero.jpg',
    kids: 'https://raw.githubusercontent.com/<owner>/<repo>/<branch>/kids.jpg',
    adults: 'https://raw.githubusercontent.com/<owner>/<repo>/<branch>/adults.jpg',
    advanced: 'https://raw.githubusercontent.com/<owner>/<repo>/<branch>/advanced.jpg',
    heels: 'https://raw.githubusercontent.com/<owner>/<repo>/<branch>/heels.jpg',
    studio: 'https://raw.githubusercontent.com/<owner>/<repo>/<branch>/studio.jpg',
    cta: 'https://raw.githubusercontent.com/<owner>/<repo>/<branch>/cta.jpg'
  };

  document.querySelectorAll('[data-bg-key]').forEach((el) => {
    const key = el.getAttribute('data-bg-key');
    const fallback = el.getAttribute('data-bg-fallback');
    const src = IMAGE_URLS[key];
    const resolved = (src && !src.includes('<owner>')) ? src : fallback;
    if (resolved) el.style.backgroundImage = `url('${resolved}')`;
  });

  // ---------- Sticky nav state ----------
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------- Mobile nav toggle ----------
  const toggle = document.getElementById('navToggle');
  toggle && toggle.addEventListener('click', () => nav.classList.toggle('open'));
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('open'))
  );

  // ---------- Reveal-on-scroll ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ---------- Hero gold particles ----------
  const particles = document.getElementById('particles');
  if (particles && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const COUNT = window.innerWidth < 700 ? 14 : 28;
    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      const size = Math.random() * 4 + 2;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.bottom = '-10px';
      p.style.animationDuration = (12 + Math.random() * 14) + 's';
      p.style.animationDelay = (-Math.random() * 14) + 's';
      p.style.opacity = (0.2 + Math.random() * 0.5).toFixed(2);
      particles.appendChild(p);
    }
  }

  // ---------- Parallax hero on scroll ----------
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = Math.min(window.scrollY, 800);
          heroImg.style.transform = `translateY(${y * 0.25}px) scale(${1.04 + y * 0.0002})`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ---------- Showreel modal ----------
  const playBtn = document.getElementById('playBtn');
  const modal = document.getElementById('videoModal');
  const closeBtn = document.getElementById('videoClose');
  const iframe = document.getElementById('videoIframe');
  // Replace VIDEO_ID with your own YouTube id; this is a generic ballroom highlight reel.
  const VIDEO_URL = 'https://www.youtube.com/embed/Pkh8UtuejGw?autoplay=1&rel=0';

  function openVideo(){
    iframe.src = VIDEO_URL;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeVideo(){
    iframe.src = '';
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  playBtn && playBtn.addEventListener('click', openVideo);
  closeBtn && closeBtn.addEventListener('click', closeVideo);
  modal && modal.addEventListener('click', (e) => { if (e.target === modal) closeVideo(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeVideo(); });

  // ---------- Offer countdown of remaining spots ----------
  const spots = document.getElementById('spots');
  if (spots) {
    // Pseudo-live: nudges down by 1 every 45–90s, floored at 2.
    let n = parseInt(spots.textContent, 10) || 7;
    const tick = () => {
      if (n > 2 && Math.random() > 0.5) {
        n--;
        spots.textContent = n;
        spots.style.transition = 'color .4s';
        spots.style.color = '#ff6b6b';
        setTimeout(() => (spots.style.color = ''), 600);
      }
      setTimeout(tick, 45000 + Math.random() * 45000);
    };
    setTimeout(tick, 30000);
  }

  // ---------- Booking form ----------
  const form = document.getElementById('bookForm');
  const success = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      // In production, POST to your backend / form service here.
      console.log('Trial class booking:', data);
      form.querySelectorAll('input,select,button').forEach(el => el.disabled = true);
      success.classList.add('show');
      try { localStorage.setItem('bdsa_lead', JSON.stringify({ ...data, ts: Date.now() })); } catch(_) {}
    });
  }

  // ---------- Footer year ----------
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // ---------- Smooth scroll offset for sticky nav ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      const top = t.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
