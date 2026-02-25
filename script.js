// ─── Scroll-to-top ────────────────────────────────────────────────────────
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  const halfway = document.documentElement.scrollHeight / 2 - window.innerHeight / 2;
  scrollTopBtn.classList.toggle('visible', window.scrollY >= halfway);
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── Language Switcher ────────────────────────────────────────────────────
let currentLang = 'da';
const langToggle = document.getElementById('langToggle');

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  langToggle.textContent = lang === 'da' ? 'EN' : 'DA';

  document.querySelectorAll('[data-da][data-en]').forEach(el => {
    if (el.placeholder !== undefined && el.tagName !== 'BUTTON' && el.tagName !== 'A' && el.tagName !== 'LI') return;
    el.textContent = el.dataset[lang];
  });

  document.querySelectorAll('[data-placeholder-da]').forEach(el => {
    el.placeholder = lang === 'da' ? el.dataset.placeholderDa : el.dataset.placeholderEn;
  });

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

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => toggleMenu(true));
});

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
    const response = await fetch('https://formspree.io/f/xjgejojz', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(contactForm),
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

// ─── Chatbot ──────────────────────────────────────────────────────────────
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatClose  = document.getElementById('chatClose');
const chatInput  = document.getElementById('chatInput');
const chatSend   = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');
const chatLeadForm = document.getElementById('chatLeadForm');
const chatLeadSubmit = document.getElementById('chatLeadSubmit');

chatToggle.addEventListener('click', () => {
  chatWindow.classList.toggle('open');
});

chatClose.addEventListener('click', () => {
  chatWindow.classList.remove('open');
});

function addMessage(text, sender) {
  const msg = document.createElement('div');
  msg.classList.add('chat-message', sender);
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  chatInput.value = '';
  chatSend.disabled = true;

  const typing = document.createElement('div');
  typing.classList.add('chat-message', 'bot', 'typing');
  typing.textContent = '...';
  chatMessages.appendChild(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    chatMessages.removeChild(typing);

    if (data.reply === 'KONTAKT_MIG') {
      addMessage('Det spørgsmål kan jeg ikke svare på, men vi kontakter dig hurtigst muligt! Udfyld formularen nedenfor 👇', 'bot');
      chatLeadForm.style.display = 'block';
    } else {
      addMessage(data.reply, 'bot');
    }
  } catch (err) {
    chatMessages.removeChild(typing);
    addMessage('Noget gik galt – prøv igen.', 'bot');
  }

  chatSend.disabled = false;
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendMessage();
});

chatLeadSubmit.addEventListener('click', async () => {
  const name  = document.getElementById('chatLeadName').value.trim();
  const email = document.getElementById('chatLeadEmail').value.trim();
  if (!name || !email) return;

  try {
    await fetch('https://formspree.io/f/xjgejojz', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, source: 'Chatbot' }),
    });
    chatLeadForm.style.display = 'none';
    addMessage('Tak! Vi kontakter dig snarest 😊', 'bot');
  } catch {
    addMessage('Noget gik galt – prøv igen.', 'bot');
  }
});

// Velkomstbesked
window.addEventListener('load', () => {
  setTimeout(() => {
    addMessage('Hej! 👋 Jeg er STW Designs chatbot. Hvad kan jeg hjælpe dig med?', 'bot');
  }, 500);
});
