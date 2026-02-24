// ─── Language Switcher ────────────────────────────────────────────────────
let currentLang = 'da';
const langToggle = document.getElementById('langToggle');

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  langToggle.textContent = lang === 'da' ? 'EN' : 'DA';

  // Update all elements with data-da / data-en text content
  document.querySelectorAll('[data-da][data-en]').forEach(el => {
    // Skip elements whose text is managed via placeholder
    if (el.placeholder !== undefined && el.tagName !== 'BUTTON' && el.tagName !== 'A' && el.tagName !== 'LI') return;
    el.textContent = el.dataset[lang];
  });

  // Update input / textarea placeholders
  document.querySelectorAll('[data-placeholder-da]').forEach(el => {
    el.placeholder = lang === 'da' ? el.dataset.placeholderDa : el.dataset.placeholderEn;
  });

  // Update <select> <option> text
  document.querySelectorAll('select option[data-da]').forEach(opt => {
    opt.textContent = opt.dataset[lang];
  });
}

langToggle.addEventListener('click', () => {
  setLanguage(currentLang === 'da' ? 'en' : 'da');
});

// ─── Burger Menu ──────────────────────────────────────────────────────────
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMenu(forceClose = false) {
  const isOpen = mobileMenu.classList.contains('open') || forceClose;
  if (isOpen) {
    burger.classList.remove('active');
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  } else {
    burger.classList.add('active');
    mobileMenu.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
  }
}

burger.addEventListener('click', () => toggleMenu());

// Close when a mobile nav link is tapped
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => toggleMenu(true));
});

// Close when clicking outside the nav
document.addEventListener('click', e => {
  if (!e.target.closest('.navbar') && mobileMenu.classList.contains('open')) {
    toggleMenu(true);
  }
});

// ─── Contact Form ─────────────────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async e => {
  e.preventDefault();

  const submitBtn  = contactForm.querySelector('.submit-btn');
  const btnText    = submitBtn.querySelector('.btn-text');

  submitBtn.disabled = true;
  btnText.textContent = currentLang === 'da' ? 'Sender...' : 'Sending...';

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(contactForm)).toString(),
    });

    if (!response.ok) throw new Error(response.statusText);

    submitBtn.classList.add('btn-success');
    btnText.textContent = currentLang === 'da' ? 'Besked sendt! ✓' : 'Message sent! ✓';
    contactForm.reset();

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.classList.remove('btn-success');
      btnText.textContent = currentLang === 'da' ? 'Send besked' : 'Send message';
    }, 3500);

  } catch (err) {
    submitBtn.disabled = false;
    btnText.textContent = currentLang === 'da' ? 'Noget gik galt – prøv igen' : 'Something went wrong – try again';
    setTimeout(() => {
      btnText.textContent = currentLang === 'da' ? 'Send besked' : 'Send message';
    }, 3500);
  }
});
