// ASAR MARKETING — Interactive Script

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header & Shadow on Scroll
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('shadow-md', 'bg-brand-bg/95');
            header.classList.remove('bg-brand-bg/90');
        } else {
            header.classList.remove('shadow-md', 'bg-brand-bg/95');
            header.classList.add('bg-brand-bg/90');
        }
    });

    // 2. Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isOpen = !mobileMenu.classList.contains('hidden');
            if (isOpen) {
                mobileMenu.classList.add('hidden');
                menuIconOpen.classList.remove('hidden');
                menuIconClose.classList.add('hidden');
            } else {
                mobileMenu.classList.remove('hidden');
                menuIconOpen.classList.add('hidden');
                menuIconClose.classList.remove('hidden');
            }
        });

        // Close mobile menu when clicking any nav link
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIconOpen.classList.remove('hidden');
                menuIconClose.classList.add('hidden');
            });
        });
    }

    // 3. Reveal on Scroll Observer
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Portfolio Filter Buttons
    const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active tab styling
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('is-hidden');
                } else {
                    item.classList.add('is-hidden');
                }
            });
        });
    });



    // 6. Contact Form & WhatsApp Generator
    const contactForm = document.getElementById('contact-form');
    const whatsappDraftBtn = document.getElementById('whatsapp-draft-btn');
    const formFeedback = document.getElementById('form-feedback');

    function getFormData() {
        return {
            name: document.getElementById('form-name')?.value.trim() || '',
            business: document.getElementById('form-business')?.value.trim() || '',
            email: document.getElementById('form-email')?.value.trim() || '',
            phone: document.getElementById('form-phone')?.value.trim() || '',
            service: document.getElementById('form-service')?.value || '',
            budget: document.getElementById('form-budget')?.value || '',
            message: document.getElementById('form-message')?.value.trim() || ''
        };
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = getFormData();

            if (!data.name || !data.email || !data.message) {
                showFeedback('Please complete all required fields.', 'error');
                return;
            }

            // Simulate successful form enquiry submission
            showFeedback(`Thank you, ${data.name}! Your enquiry has been sent to Malay Patel (Asar Marketing). We will respond within 24 hours.`, 'success');
            contactForm.reset();
        });
    }

    if (whatsappDraftBtn) {
        whatsappDraftBtn.addEventListener('click', () => {
            const data = getFormData();
            let text = `Hello Malay! I'd like to discuss a project for my business.\n\n`;
            if (data.name) text += `*Name:* ${data.name}\n`;
            if (data.business) text += `*Business:* ${data.business}\n`;
            if (data.service) text += `*Service:* ${data.service}\n`;
            if (data.message) text += `*Details:* ${data.message}\n`;

            const encodedText = encodeURIComponent(text);
            window.open(`https://wa.me/917016425394?text=${encodedText}`, '_blank');
        });
    }

    function showFeedback(msg, type) {
        if (!formFeedback) return;
        formFeedback.textContent = msg;
        formFeedback.classList.remove('hidden', 'bg-emerald-100', 'text-emerald-800', 'bg-rose-100', 'text-rose-800');
        if (type === 'success') {
            formFeedback.classList.add('bg-emerald-100', 'text-emerald-800');
        } else {
            formFeedback.classList.add('bg-rose-100', 'text-rose-800');
        }
    }
});
