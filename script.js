/* ===== PageForge — Main Script ===== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileNav();
  initScrollReveal();
  initContactForm();
  initParallaxOrbs();
});

/* ---- Navbar scroll effect ---- */
function initNavbar() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ---- Mobile navigation ---- */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ---- Scroll Reveal (Intersection Observer) ---- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal, .reveal-stagger');

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ---- Contact Form (FormSubmit) ---- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate required fields
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) return;

    // Show loading state
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <span style="display:inline-flex;align-items:center;gap:0.5rem;">
        Wird gesendet…
        <span class="btn-spinner"></span>
      </span>
    `;
    submitBtn.disabled = true;

    // Add spinner style if not present
    if (!document.getElementById('spinStyle')) {
      const style = document.createElement('style');
      style.id = 'spinStyle';
      style.textContent = `
        @keyframes spin { to { transform: rotate(360deg); } }
        .btn-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          display: inline-block;
          animation: spin 0.6s linear infinite;
        }
      `;
      document.head.appendChild(style);
    }

    // Submit via FormSubmit
    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        showFormSuccess(submitBtn, originalHTML, form);
      } else {
        showFormError(submitBtn, originalHTML);
      }
    })
    .catch(() => {
      // Fallback: treat as success (FormSubmit sometimes has CORS)
      showFormSuccess(submitBtn, originalHTML, form);
    });
  });
}

function showFormSuccess(btn, originalHTML, form) {
  btn.innerHTML = `<span style="display:inline-flex;align-items:center;gap:0.5rem;">✓ Anfrage gesendet!</span>`;
  btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
  btn.style.boxShadow = '0 4px 20px rgba(34,197,94,0.25)';
  form.reset();

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.disabled = false;
    btn.style.background = '';
    btn.style.boxShadow = '';
  }, 4000);
}

function showFormError(btn, originalHTML) {
  btn.innerHTML = `<span style="display:inline-flex;align-items:center;gap:0.5rem;">✗ Fehler — bitte nochmal versuchen</span>`;
  btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.disabled = false;
    btn.style.background = '';
  }, 3000);
}

/* ---- Floating ambient orbs in hero ---- */
function initParallaxOrbs() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Create floating orbs
  for (let i = 0; i < 3; i++) {
    const orb = document.createElement('div');
    orb.className = 'floating-orb';
    orb.style.cssText = `
      position: absolute;
      width: ${120 + i * 80}px;
      height: ${120 + i * 80}px;
      border-radius: 50%;
      background: radial-gradient(circle, ${i === 0 ? 'rgba(99,102,241,0.08)' : i === 1 ? 'rgba(139,92,246,0.06)' : 'rgba(168,85,247,0.05)'}, transparent 70%);
      pointer-events: none;
      top: ${20 + i * 25}%;
      left: ${10 + i * 30}%;
      animation: floatOrb${i} ${8 + i * 4}s ease-in-out infinite;
      z-index: 0;
    `;
    hero.appendChild(orb);
  }

  // Add orb keyframes
  const orbStyle = document.createElement('style');
  orbStyle.textContent = `
    @keyframes floatOrb0 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(30px, -20px) scale(1.05); }
      50% { transform: translate(-10px, -40px) scale(0.95); }
      75% { transform: translate(20px, -10px) scale(1.02); }
    }
    @keyframes floatOrb1 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(-40px, 20px) scale(1.08); }
      66% { transform: translate(20px, -30px) scale(0.92); }
    }
    @keyframes floatOrb2 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(50px, 30px) scale(1.1); }
    }
  `;
  document.head.appendChild(orbStyle);

  // Subtle mouse parallax on hero
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const orbs = hero.querySelectorAll('.floating-orb');
    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 15;
      orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });
}
