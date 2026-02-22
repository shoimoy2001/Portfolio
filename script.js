// ==============================
// SMOOTH SCROLLING
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ==============================
// CONTACT FORM (Formspree Integration)
// ==============================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = this.querySelector('.submit-btn');
    const originalText = btn.textContent;

    // Animate button while submitting
    btn.textContent = '// TRANSMITTING...';
    btn.style.background = 'rgba(0,245,255,0.1)';
    btn.style.borderColor = '#00f5ff';
    btn.style.color = '#00f5ff';

    // Send form data to Formspree
    fetch(this.action, {
      method: 'POST',
      body: new FormData(this),
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        // Success animation
        btn.textContent = '// TRANSMISSION COMPLETE ✓';
        btn.style.background = 'rgba(57,255,20,0.1)';
        btn.style.borderColor = '#39ff14';
        btn.style.color = '#39ff14';
        this.reset();
        showMessage('Message sent successfully!', 'success');
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(() => {
      // Error animation
      btn.textContent = '// TRANSMISSION FAILED ✗';
      btn.style.background = 'rgba(255,0,0,0.1)';
      btn.style.borderColor = '#ff0033';
      btn.style.color = '#ff0033';
      showMessage('Failed to send message. Try again.', 'error');
    })
    .finally(() => {
      // Reset button after 3 seconds
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style = '';
      }, 3000);
    });
  });
}

// Function to show a temporary message below the form
function showMessage(message, type) {
  let msgBox = document.querySelector('.form-message');
  if (!msgBox) {
    msgBox = document.createElement('div');
    msgBox.className = 'form-message';
    contactForm.appendChild(msgBox);
  }
  msgBox.textContent = message;
  msgBox.style.color = type === 'success' ? '#39ff14' : '#ff0033';
  msgBox.style.marginTop = '10px';
  msgBox.style.fontSize = '0.85rem';

  // Remove message after 5 seconds
  setTimeout(() => {
    msgBox.textContent = '';
  }, 5000);
}

// ==============================
// SKILL BARS ANIMATE ON SCROLL
// ==============================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.animationPlayState = 'running';
      });
    }
  });
}, { threshold: 0.2 });

const aboutSection = document.querySelector('#about');
if (aboutSection) observer.observe(aboutSection);

// ==============================
// ACTIVE NAV LINK ON SCROLL
// ==============================
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul a');

  sections.forEach(section => {
    const top = section.offsetTop - 80;
    const bottom = top + section.offsetHeight;

    if (window.scrollY >= top && window.scrollY < bottom) {
      navLinks.forEach(link => link.style.color = '');
      const active = document.querySelector(`nav a[href="#${section.id}"]`);
      if (active) active.style.color = '#00f5ff';
    }
  });
});