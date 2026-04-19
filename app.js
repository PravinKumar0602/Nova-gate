/* ============================================================
   NOVA GATE — app.js
   Handles: tab switching, form validation, password toggles,
            strength meter, particles, success overlay
   ============================================================ */

'use strict';

/* ─── Tab Switching ────────────────────────────────────────── */
function switchTab(tab) {
  const loginTab   = document.getElementById('loginTab');
  const registerTab= document.getElementById('registerTab');
  const loginForm  = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (tab === 'login') {
    loginTab.classList.add('tab--active');
    registerTab.classList.remove('tab--active');
    loginTab.setAttribute('aria-selected', 'true');
    registerTab.setAttribute('aria-selected', 'false');
    loginForm.classList.add('form--active');
    loginForm.style.display = 'flex';
    registerForm.classList.remove('form--active');
    registerForm.style.display = 'none';
  } else {
    registerTab.classList.add('tab--active');
    loginTab.classList.remove('tab--active');
    registerTab.setAttribute('aria-selected', 'true');
    loginTab.setAttribute('aria-selected', 'false');
    registerForm.classList.add('form--active');
    registerForm.style.display = 'flex';
    loginForm.classList.remove('form--active');
    loginForm.style.display = 'none';
  }
  clearAllErrors();
}

/* ─── Password Toggle ──────────────────────────────────────── */
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const eyeOpen   = btn.querySelector('.eye-open');
  const eyeClosed = btn.querySelector('.eye-closed');
  if (input.type === 'password') {
    input.type = 'text';
    eyeOpen.style.display  = 'none';
    eyeClosed.style.display = 'block';
  } else {
    input.type = 'password';
    eyeOpen.style.display  = 'block';
    eyeClosed.style.display = 'none';
  }
}

/* ─── Password Strength Meter ──────────────────────────────── */
function updateStrength(value) {
  const fill  = document.getElementById('strengthFill');
  const label = document.getElementById('strengthLabel');
  if (!fill || !label) return;

  let score = 0;
  if (value.length >= 8)  score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  if (value.length >= 12) score++;

  const levels = [
    { pct: '0%',   color: 'transparent',                         text: 'STRENGTH: —' },
    { pct: '20%',  color: '#ff2d78',                             text: 'STRENGTH: WEAK' },
    { pct: '45%',  color: '#ff8c00',                             text: 'STRENGTH: FAIR' },
    { pct: '70%',  color: '#f0e040',                             text: 'STRENGTH: GOOD' },
    { pct: '90%',  color: '#00ffe5',                             text: 'STRENGTH: STRONG' },
    { pct: '100%', color: 'linear-gradient(90deg,#00ffe5,#b400ff)', text: 'STRENGTH: MAX' },
  ];

  const level = value.length === 0 ? levels[0] : levels[Math.min(score, 5)];
  fill.style.width = level.pct;
  fill.style.background = level.color;
  label.textContent = level.text;
}

/* ─── Validation Helpers ───────────────────────────────────── */
function setError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  if (field) field.classList.add('error');
  if (error) error.textContent = message;
}
function clearError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  if (field) field.classList.remove('error');
  if (error) error.textContent = '';
}
function clearAllErrors() {
  document.querySelectorAll('.field__input').forEach(el => el.classList.remove('error'));
  document.querySelectorAll('.field__error').forEach(el => el.textContent = '');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ─── Login Handler ────────────────────────────────────────── */
function handleLogin(e) {
  e.preventDefault();
  clearAllErrors();

  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  let valid = true;

  if (!email) {
    setError('login-email', 'login-email-error', '⚠ Email address is required.');
    valid = false;
  } else if (!isValidEmail(email)) {
    setError('login-email', 'login-email-error', '⚠ Enter a valid email address.');
    valid = false;
  }

  if (!password) {
    setError('login-password', 'login-pass-error', '⚠ Password is required.');
    valid = false;
  } else if (password.length < 6) {
    setError('login-password', 'login-pass-error', '⚠ Password must be at least 6 characters.');
    valid = false;
  }

  if (!valid) return;

  showSuccess('ACCESS GRANTED', 'Identity verified. Initializing secure session...');
}

/* ─── Register Handler ─────────────────────────────────────── */
function handleRegister(e) {
  e.preventDefault();
  clearAllErrors();

  const fname    = document.getElementById('reg-fname').value.trim();
  const lname    = document.getElementById('reg-lname').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const confirm  = document.getElementById('reg-confirm').value;
  const terms    = document.getElementById('terms').checked;
  let valid = true;

  if (!fname) {
    setError('reg-fname', 'reg-fname-error', '⚠ First name required.');
    valid = false;
  }
  if (!lname) {
    setError('reg-lname', 'reg-lname-error', '⚠ Last name required.');
    valid = false;
  }
  if (!email) {
    setError('reg-email', 'reg-email-error', '⚠ Email address is required.');
    valid = false;
  } else if (!isValidEmail(email)) {
    setError('reg-email', 'reg-email-error', '⚠ Enter a valid email address.');
    valid = false;
  }
  if (!password) {
    setError('reg-password', 'reg-pass-error', '⚠ Password is required.');
    valid = false;
  } else if (password.length < 8) {
    setError('reg-password', 'reg-pass-error', '⚠ Minimum 8 characters required.');
    valid = false;
  }
  if (!confirm) {
    setError('reg-confirm', 'reg-confirm-error', '⚠ Please confirm your password.');
    valid = false;
  } else if (password !== confirm) {
    setError('reg-confirm', 'reg-confirm-error', '⚠ Passwords do not match.');
    valid = false;
  }
  if (!terms) {
    const termsErr = document.getElementById('reg-terms-error');
    if (termsErr) termsErr.textContent = '⚠ You must accept the Terms of Service.';
    valid = false;
  }

  if (!valid) return;

  showSuccess('IDENTITY CREATED', 'Your profile has been registered. Welcome to Nova Gate.');
}

/* ─── Forgot Password ──────────────────────────────────────── */
function showForgot(e) {
  e.preventDefault();
  const card = document.getElementById('authCard');
  card.style.transition = 'transform 0.08s ease';
  const flash = [1, -1, 1, -1, 0];
  let i = 0;
  const flicker = setInterval(() => {
    card.style.transform = `translateX(${flash[i] * 4}px)`;
    i++;
    if (i >= flash.length) { clearInterval(flicker); card.style.transform = ''; }
  }, 60);

  // Simple in-place notification (could be replaced with a modal)
  const subtitle = document.querySelector('#loginForm .form__subtitle');
  if (subtitle) {
    const orig = subtitle.textContent;
    subtitle.style.color = '#00ffe5';
    subtitle.textContent = 'PASSWORD RESET LINK WILL BE SENT TO YOUR EMAIL';
    setTimeout(() => {
      subtitle.textContent = orig;
      subtitle.style.color = '';
    }, 3000);
  }
}

/* ─── Success Overlay ──────────────────────────────────────── */
function showSuccess(title, msg) {
  const overlay = document.getElementById('successOverlay');
  const titleEl = document.getElementById('successTitle');
  const msgEl   = document.getElementById('successMsg');

  if (titleEl) titleEl.textContent = title;
  if (msgEl)   msgEl.textContent   = msg;

  overlay.classList.add('active');

  // Reset & restart loader bar animation
  const bar = overlay.querySelector('.success-loader__bar');
  if (bar) { bar.style.animation = 'none'; bar.offsetHeight; bar.style.animation = ''; }

  setTimeout(() => {
    overlay.classList.remove('active');
  }, 3500);
}

/* ─── Particle Canvas ──────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  const COLORS = ['rgba(0,255,229,', 'rgba(180,0,255,', 'rgba(255,45,120,'];

  for (let i = 0; i < 55; i++) {
    particles.push({
      x:     randomBetween(0, window.innerWidth),
      y:     randomBetween(0, window.innerHeight),
      r:     randomBetween(0.5, 2),
      vx:    randomBetween(-0.2, 0.2),
      vy:    randomBetween(-0.4, -0.1),
      alpha: randomBetween(0.3, 0.9),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      pulse: randomBetween(0, Math.PI * 2),
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.pulse += 0.02;
      const a = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + a + ')';
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -4)  p.y = H + 4;
      if (p.x < -4)  p.x = W + 4;
      if (p.x > W+4) p.x = -4;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ─── Input focus ripple effect ────────────────────────────── */
document.querySelectorAll('.field__input').forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.querySelector('.field__border') &&
      (this.parentElement.querySelector('.field__border').style.boxShadow = '0 0 8px rgba(0,255,229,0.3)');
  });
  input.addEventListener('blur', function() {
    this.parentElement.querySelector('.field__border') &&
      (this.parentElement.querySelector('.field__border').style.boxShadow = '');
  });
});

/* ─── Button ripple effect ─────────────────────────────────── */
document.querySelectorAll('.btn--primary').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      background:rgba(0,255,229,0.15);
      transform:scale(0); animation:ripple 0.5s ease forwards;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Inject ripple keyframe
const style = document.createElement('style');
style.textContent = '@keyframes ripple { to { transform:scale(2.5); opacity:0; } }';
document.head.appendChild(style);
