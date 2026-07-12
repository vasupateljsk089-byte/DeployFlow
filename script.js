// Typing animation
const roles = [
  'DevOps Engineer',
  'Full-Stack Developer',
];

const typingEl = document.querySelector('.typing-text');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const current = roles[roleIndex];

  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(typeRole, speed);
}

typeRole();

// Scroll progress bar
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = progress + '%';
}

// Scroll reveal with stagger
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const parent = entry.target.parentElement;
        const siblings = parent
          ? [...parent.querySelectorAll('.reveal')].filter((el) => el !== entry.target)
          : [];
        const index = [...parent.querySelectorAll('.reveal')].indexOf(entry.target);

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);

        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Section visibility effect
const sections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('visible-section', entry.isIntersecting);
    });
  },
  { threshold: 0.2 }
);

sections.forEach((section) => sectionObserver.observe(section));

// Skill bar animation
const skillBars = document.querySelectorAll('.skill-bar-fill');

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width;
        entry.target.style.width = width + '%';
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

skillBars.forEach((bar) => barObserver.observe(bar));

// Navbar scroll effect
const nav = document.querySelector('.nav');
const orbs = document.querySelectorAll('.orb');
const heroContent = document.querySelector('.hero-content');
const heroVisual = document.querySelector('.hero-visual');

function onScroll() {
  const scrollY = window.scrollY;

  nav.classList.toggle('scrolled', scrollY > 50);
  updateScrollProgress();

  // Parallax orbs
  orbs.forEach((orb, i) => {
    const speed = 0.03 + i * 0.02;
    orb.style.transform = `translateY(${scrollY * speed}px)`;
  });

  // Hero parallax fade
  if (heroContent && scrollY < window.innerHeight) {
    const opacity = 1 - scrollY / (window.innerHeight * 0.8);
    const translate = scrollY * 0.15;
    heroContent.style.opacity = Math.max(opacity, 0);
    heroContent.style.transform = `translateY(${translate}px)`;

    if (heroVisual) {
      heroVisual.style.transform = `translateY(${scrollY * 0.08}px)`;
    }
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Active nav link on scroll
const navSections = document.querySelectorAll('section[id], header[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;

  navSections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.querySelectorAll('a').forEach((link) => {
        link.style.color =
          link.getAttribute('href') === '#' + id
            ? 'var(--text-primary)'
            : '';
      });
    }
  });
}, { passive: true });

// Smooth tilt on project cards
document.querySelectorAll('.project-card, .skill-card, .contact-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
