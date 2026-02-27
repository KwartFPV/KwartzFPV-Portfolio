/* =====================================================
   KWARTZ FPV — SCRIPT.JS
   Optimised: single RAF scroll loop, page load reveal
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ░░ 1. DOM REFERENCES ░░
    const menuToggle = document.getElementById('menu-icon');
    const navbar     = document.getElementById('main-nav');
    const header     = document.getElementById('site-header');
    const video      = document.getElementById('bg-video');

    // ░░ 2. MOBILE MENU ░░
    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navbar.classList.toggle('active');
            menuToggle.classList.toggle('open', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                menuToggle.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // ░░ 3. SMOOTH SCROLL — LENIS (desktop only) ░░
    let lenis = null;
    if (window.innerWidth > 1024 && typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
        });
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) { e.preventDefault(); lenis.scrollTo(target); }
            });
        });
    }

    // ░░ 4. SINGLE RAF SCROLL LOOP ░░
    // All scroll logic in one rAF — zero duplicate listeners, no jank
    const homeSection = document.querySelector('.home');
    const videoEl     = document.querySelector('.back-video');
    const overlay     = document.querySelector('.hero-overlay');
    const magTitle    = document.querySelector('.hero-mag-title');
    const topBar      = document.querySelector('.hero-topbar');
    const bottomBar   = document.querySelector('.hero-bottom');
    const progressBar = document.getElementById('read-progress');
    const backToTop   = document.getElementById('back-to-top');

    const isDesktop  = window.innerWidth > 1024;
    let   rafPending = false;

    const onScrollTick = () => {
        rafPending = false;
        const scrollY = window.scrollY;

        // Header
        header.classList.toggle('scrolled', scrollY > 60);

        // Progress bar
        if (progressBar) {
            const docH = document.documentElement.scrollHeight - window.innerHeight;
            progressBar.style.width = `${docH > 0 ? Math.min((scrollY / docH) * 100, 100) : 0}%`;
        }

        // Back to top
        if (backToTop) backToTop.classList.toggle('visible', scrollY > 600);

        // Mountain Dive (desktop only)
        if (isDesktop && homeSection) {
            const progress = Math.min(scrollY / homeSection.offsetHeight, 1);
            const fade     = Math.max(0, 1 - progress * 2.5);
            if (videoEl)    videoEl.style.transform  = `scale(${1 + progress * 0.45})`;
            if (magTitle) { magTitle.style.opacity    = fade; magTitle.style.transform = `translateY(${progress * 40}px)`; }
            if (topBar)     topBar.style.opacity      = fade;
            if (bottomBar){ bottomBar.style.opacity   = fade; bottomBar.style.transform = `translateY(${progress * 20}px)`; }
            if (overlay)    overlay.style.background  =
                `linear-gradient(to bottom,rgba(5,5,5,${0.4+progress*0.3}) 0%,rgba(5,5,5,0.1) 35%,rgba(5,5,5,0.2) 60%,rgba(5,5,5,${0.92+progress*0.08}) 100%)`;
        }
    };

    window.addEventListener('scroll', () => {
        if (!rafPending) { rafPending = true; requestAnimationFrame(onScrollTick); }
    }, { passive: true });
    onScrollTick();

    // Lenis RAF loop
    if (lenis) {
        const lenisRaf = (t) => { lenis.raf(t); requestAnimationFrame(lenisRaf); };
        requestAnimationFrame(lenisRaf);
    }

    // ░░ 5. VIDEO AUTOPLAY RECOVERY ░░
    if (video) {
        const tryPlay = () => { if (video.paused) video.play().catch(() => {}); };
        tryPlay();
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') tryPlay();
        });
        window.addEventListener('pageshow', tryPlay);
    }

    // ░░ 6. BACK TO TOP CLICK ░░
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            if (lenis) lenis.scrollTo(0, { duration: 1.4 });
            else window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ░░ 7. SCROLL REVEALS ░░
    const revealIO = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealIO.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal-item').forEach(el => revealIO.observe(el));

    // ░░ 8. TIMELINE STAGGERED REVEAL ░░
    const tlIO = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); tlIO.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.timeline-item').forEach((item, i) => {
        item.style.transitionDelay = `${i * 0.12}s`;
        tlIO.observe(item);
    });

    // ░░ 9. STATS COUNTER ░░
    const animateCount = (el, target, duration = 1600) => {
        const start = performance.now();
        const ease  = (t) => 1 - Math.pow(1 - t, 3);
        const step  = (now) => {
            const p = Math.min((now - start) / duration, 1);
            el.textContent = Math.round(ease(p) * target);
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };
    const statsIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const numEl = e.target.querySelector('.stat-number');
                animateCount(numEl, parseInt(numEl.getAttribute('data-count'), 10));
                statsIO.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.stat-card').forEach(el => statsIO.observe(el));

    // ░░ 10. ACTIVE NAV LINK ░░
    const navLinks = document.querySelectorAll('.navbar a');
    const navIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting)
                navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`));
        });
    }, { threshold: 0.4 });
    document.querySelectorAll('section[id]').forEach(s => navIO.observe(s));

    // ░░ 11. 3D TILT — PILOT IMAGE ░░
    const imageBox = document.querySelector('.image-box');
    const pilotImg = imageBox?.querySelector('img');
    if (imageBox && pilotImg && isDesktop) {
        imageBox.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = imageBox.getBoundingClientRect();
            pilotImg.style.transform = `perspective(900px) rotateY(${(e.clientX-left-width/2)/18}deg) rotateX(${-(e.clientY-top-height/2)/18}deg) scale(1.04)`;
        });
        imageBox.addEventListener('mouseleave', () => {
            pilotImg.style.transition = 'transform 0.5s ease';
            pilotImg.style.transform  = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)';
            setTimeout(() => { pilotImg.style.transition = 'transform 0.1s ease-out'; }, 500);
        });
        imageBox.addEventListener('mouseenter', () => { pilotImg.style.transition = 'transform 0.1s ease-out'; });
    }

    // ░░ 12. CONTACT FORM ░░
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const feedback  = contactForm.querySelector('.form-feedback');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const orig          = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled  = true;
            try {
                const res = await fetch(contactForm.action, {
                    method: 'POST', body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                    feedback.textContent = "✓ Message sent! I'll get back to you soon.";
                    feedback.className   = 'form-feedback success';
                    contactForm.reset();
                } else throw new Error();
            } catch {
                feedback.textContent = '✗ Something went wrong. Try again or reach out directly.';
                feedback.className   = 'form-feedback error';
            }
            submitBtn.innerHTML = orig;
            submitBtn.disabled  = false;
            setTimeout(() => { feedback.className = 'form-feedback'; }, 6000);
        });
    }

});


