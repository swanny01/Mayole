/* ============================================
   MAYOLE — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ---- Navbar scroll behavior ----
    const navbar = document.getElementById('navbar');

    const handleScroll = () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ---- Mobile menu toggle ----
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 20;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---- Scroll reveal animations ----
    const revealElements = document.querySelectorAll(
        '.intro-text, .intro-image, .residence-card, .prestation-item, ' +
        '.localisation-text, .localisation-map, .avantage-card, ' +
        '.timeline-item, .contact-info, .contact-form-wrapper'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));

    // ---- Contact form ----
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate form submission
        const btn = contactForm.querySelector('button[type="submit"]');
        btn.textContent = 'Envoi en cours...';
        btn.disabled = true;

        setTimeout(() => {
            formSuccess.classList.add('visible');
        }, 1000);
    });

    // ---- Active nav link on scroll ----
    const sections = document.querySelectorAll('section[id]');

    const highlightNav = () => {
        const scrollPos = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    link.style.color = '';
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });
});
