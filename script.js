document.addEventListener('DOMContentLoaded', function() {
    // Sticky Header
    const header = document.getElementById('header');
    const stickyNav = function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    };
    window.addEventListener('scroll', stickyNav);

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('#main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });
    
    // Smooth Scrolling & Active Nav Link
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate position considering sticky header height
                // Ensure header element exists before trying to get its offsetHeight
                const headerOffset = header ? header.offsetHeight + 20 : 20; // Add some padding, provide default if header not found
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Update active link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNavLink() {
        let current = '';
        const headerHeight = header ? header.offsetHeight : 0; // Get header height, default to 0 if not found

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // const sectionHeight = section.clientHeight; // Not strictly needed for this logic
            if (pageYOffset >= (sectionTop - headerHeight - 50)) { // Adjusted offset
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
         // Special case for hero section when at the very top
        if (sections.length > 0 && window.pageYOffset < (sections[0].offsetTop - headerHeight - 50)) {
             navLinks.forEach(link => link.classList.remove('active'));
             const heroLink = document.querySelector('#main-nav a[href="#hero"]');
             if (heroLink) {
                heroLink.classList.add('active');
             }
        }
    }
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call


    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) { // Ensure question element exists
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                // Option to close other items if you prefer only one open at a time
                // faqItems.forEach(otherItem => {
                //     if (otherItem !== item) {
                //         otherItem.classList.remove('active');
                //         const otherAnswer = otherItem.querySelector('.faq-answer');
                //         if (otherAnswer) otherAnswer.style.maxHeight = null; 
                //     }
                // });
                
                // Toggle current item
                item.classList.toggle('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) { // Ensure answer element exists
                    if (item.classList.contains('active')) {
                        answer.style.maxHeight = answer.scrollHeight + "px";
                        answer.style.paddingTop = "20px"; // Ensure padding is re-applied if it was 0
                        answer.style.paddingBottom = "20px";
                    } else {
                        answer.style.maxHeight = null;
                        // Optionally reset padding, though transition handles it if padding is part of max-height: 0 state
                        // answer.style.paddingTop = "0";
                        // answer.style.paddingBottom = "0";
                    }
                }
            });
        }
    });

    // Scroll Animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: unobserve after animation to save resources
                // observer.unobserve(entry.target); 
            } else {
                // Optional: remove class to re-animate if scrolling up
                // entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

});
