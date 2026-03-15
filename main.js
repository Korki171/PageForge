// ── CURSOR ──
const dot = document.getElementById('dot');
const ring = document.getElementById('ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.transform = `translate(${mx - 2.5}px, ${my - 2.5}px)`;
});

(function loop() {
  rx += (mx - rx - 16) * 0.1;
  ry += (my - ry - 16) * 0.1;
  ring.style.transform = `translate(${rx}px, ${ry}px)`;
  requestAnimationFrame(loop);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    dot.style.width = '40px';
    dot.style.height = '40px';
    dot.style.borderRadius = '6px';
    ring.style.opacity = '0';
  });
  el.addEventListener('mouseleave', () => {
    dot.style.width = '5px';
    dot.style.height = '5px';
    dot.style.borderRadius = '50%';
    ring.style.opacity = '1';
  });
});

// ── SCROLL REVEAL ──
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.ri').forEach(el => io.observe(el));

// ── NAV SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── MOBILE MENU ──
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

burger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = burger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    spans[1].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.transform = '';
  }
});

function closeMobile() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  const spans = burger.querySelectorAll('span');
  spans[0].style.transform = '';
  spans[1].style.transform = '';
}

// ── FAQ ──
function faq(btn) {
  const item = btn.closest('.fq');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.fq.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}
