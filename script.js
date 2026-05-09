/* ============================================================
   Joel Velez — Portfolio Personal
   script.js
   ============================================================ */

/* ---- Year dinámico en el footer ---- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---- Menú mobile (hamburguesa) ---- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.querySelector('i').className = isOpen ? 'ti ti-x' : 'ti ti-menu-2';
});

// Cerrar el menú al hacer click en un enlace
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.querySelector('i').className = 'ti ti-menu-2';
        navToggle.setAttribute('aria-expanded', false);
    });
});

/* ---- Scroll reveal con IntersectionObserver ---- */
const revealTargets = document.querySelectorAll('.project-card, .about-card');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Escalonado suave según el índice del elemento
                const delay = (i % 3) * 100;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

revealTargets.forEach(el => revealObserver.observe(el));

/* ---- Smooth scroll para todos los href anchor ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ---- Highlight activo en nav según sección visible ---- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navAnchors.forEach(a => {
                    a.style.color = a.getAttribute('href') === `#${entry.target.id}`
                        ? '#1a1a2e'
                        : '';
                });
            }
        });
    },
    { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));