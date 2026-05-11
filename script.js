/* ============================================
   Didjest — интерактивность
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Burger menu ---
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            burger.classList.toggle('active');
        });
    }

    // --- Close nav on link click (mobile) ---
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            burger.classList.remove('active');
        });
    });

    // --- FAQ accordion ---
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const isActive = item.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

            if (!isActive) item.classList.add('active');
        });
    });

    // --- Counter animation ---
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length) {
        let animated = false;

        const animateCounters = () => {
            if (animated) return;
            counters.forEach(counter => {
                const target = parseFloat(counter.dataset.target);
                const isDecimal = target % 1 !== 0;
                const duration = 1500;
                const start = performance.now();

                const update = (now) => {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = target * eased;

                    counter.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);

                    if (progress < 1) requestAnimationFrame(update);
                };

                requestAnimationFrame(update);
            });
            animated = true;
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(counters[0].closest('.about-stats') || counters[0]);
    }

    // --- Scroll reveal animation ---
    const revealElements = document.querySelectorAll(
        '.course-card, .review-card, .step, .stat-card, .about-feature'
    );

    if (revealElements.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            revealObserver.observe(el);
        });
    }

    // --- Smooth scroll reveal stagger ---
    document.querySelectorAll('.courses-grid .course-card').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
    });
    document.querySelectorAll('.reviews-grid .review-card').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
    });
    document.querySelectorAll('.steps .step').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
    });

});
