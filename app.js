/*
Template variables to use in EmailJS:
- {{from_name}} - Sender's name
- {{from_email}} - Sender's email  
- {{subject}} - Email subject
- {{message}} - Email message content
*/

// EmailJS Configuration
const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_m4h52vv',       
    TEMPLATE_ID: 'template_6xkitn5',      
    PUBLIC_KEY: 'FdP36qboAuATCv8WK'   
};


document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initTypingAnimation();
    initSkillBars();
    initContactForm();
    initBackToTop();
    initCertificateButtons();
    initResumeDownload();
    // initProjectButtons();
    initEducationAnimations();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle Contact Me button in hero section
    const contactMeBtn = document.querySelector('.hero-buttons a[href="#contact"]');
    if (contactMeBtn) {
        contactMeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navToggle && navMenu && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Update active nav link based on scroll position
    window.addEventListener('scroll', function() {
        let current = 'home'; // Default to home
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Add scrolled class to navbar
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// Project buttons functionality
function initProjectButtons() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const sourceBtn = card.querySelector('.btn--outline');
        const liveBtn = card.querySelector('.btn--primary');
        const projectTitle = card.querySelector('.project-title').textContent;
        
        if (sourceBtn) {
            sourceBtn.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification(`Opening source code for "${projectTitle}" on GitHub. This is a demo portfolio.`, 'info');
            });
        }
        
        if (liveBtn && liveBtn.textContent.trim() === 'Live') {
            liveBtn.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification(`Opening live demo for "${projectTitle}". This is a demo portfolio.`, 'info');
            });
        }
    });
}

// Show notification function
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        padding: 16px 20px;
        box-shadow: var(--shadow-lg);
        z-index: 10001;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    notification.innerHTML = `${icon} ${message}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.about-content, .skill-category, .project-card, .cert-card, .contact-content, .section-header, .timeline-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Typing animation for hero text
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const text = 'Full Stack Developer';
    const speed = 100;
    let i = 0;

    typingText.textContent = '';
    typingText.style.opacity = '1';

    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    // Start typing animation after a delay
    setTimeout(typeWriter, 1500);
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                setTimeout(() => {
                    progressBar.style.width = width + '%';
                }, 500);
                
                skillObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Contact form functionality with EmailJS
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const submitButton = contactForm.querySelector('.submit-btn');
    const originalButtonText = submitButton.innerHTML;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formValues = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Validate form
        if (!validateForm(formValues)) {
            return;
        }
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        try {
            // Check if EmailJS is properly configured
            if (EMAILJS_CONFIG.SERVICE_ID === 'your_service_id' || 
                EMAILJS_CONFIG.TEMPLATE_ID === 'your_template_id' || 
                EMAILJS_CONFIG.PUBLIC_KEY === 'your_public_key') {
                
                // Simulate sending for demo purposes
                await new Promise(resolve => setTimeout(resolve, 2000));
                throw new Error('EmailJS not configured - using demo mode');
            }
            
            // Send email using EmailJS
            const response = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                formValues,
                EMAILJS_CONFIG.PUBLIC_KEY
            );
            
            // Success feedback
            showMessage('✅ Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            
        } catch (error) {
            // Error feedback - but show demo message if not configured
            console.error('EmailJS Error:', error);
            
            if (error.message.includes('not configured')) {
                showMessage('📧 Demo Mode: Message would be sent with proper EmailJS configuration. Please check console for setup instructions.', 'info');
                contactForm.reset();
            } else {
                showMessage('❌ Failed to send message. Please try again or contact me directly.', 'error');
            }
        } finally {
            // Reset button
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

// Form validation
function validateForm(values) {
    const { from_name, from_email, subject, message } = values;
    
    if (!from_name || from_name.trim().length < 2) {
        showMessage('❌ Please enter a valid name (at least 2 characters)', 'error');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!from_email || !emailRegex.test(from_email)) {
        showMessage('❌ Please enter a valid email address', 'error');
        return false;
    }
    
    if (!subject || subject.trim().length < 3) {
        showMessage('❌ Please enter a subject (at least 3 characters)', 'error');
        return false;
    }
    
    if (!message || message.trim().length < 10) {
        showMessage('❌ Please enter a message (at least 10 characters)', 'error');
        return false;
    }
    
    return true;
}

// Show form messages
function showMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.className = `form-message ${type}`;
    message.innerHTML = text;
    
    // Insert message
    const form = document.getElementById('contact-form');
    form.insertBefore(message, form.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 5000);
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Certificate view functionality
function initCertificateButtons() {
    const certViewButtons = document.querySelectorAll('.cert-view-btn');
    
    certViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const certCard = this.closest('.cert-card');
            const certTitle = certCard.querySelector('.cert-title').textContent;
            const certIssuer = certCard.querySelector('.cert-issuer').textContent;
            const certDate = certCard.querySelector('.cert-date').textContent;
            
            // Check if this is the HP certificate with actual link (already has href)
            if (this.tagName === 'A' && this.href) {
                // Let the default behavior happen for actual links
                return;
            }
            
            // Prevent default for button elements
            e.preventDefault();
            
            // Show modal for demo certificates
            showCertificateModal(certTitle, certIssuer, certDate);
        });
    });
}

function showCertificateModal(title, issuer, date) {
    // Remove existing modal if present
    const existingModal = document.getElementById('cert-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.id = 'cert-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    `;

    modal.innerHTML = `
        <div class="modal-content" style="
            background: var(--color-surface);
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            max-height: 80%;
            overflow-y: auto;
            position: relative;
            z-index: 1;
            box-shadow: var(--shadow-lg);
        ">
            <div class="modal-header" style="
                padding: 2rem 2rem 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid var(--color-border);
            ">
                <h3>Certificate Details</h3>
                <button class="modal-close" style="
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: var(--color-text-secondary);
                ">&times;</button>
            </div>
            <div class="modal-body" style="padding: 2rem;">
                <div class="cert-details" style="text-align: center;">
                    <div class="cert-icon" style="
                        width: 80px;
                        height: 80px;
                        background: var(--gradient-accent);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 1.5rem;
                        font-size: 2rem;
                        color: white;
                    ">
                        <i class="fas fa-certificate"></i>
                    </div>
                    <h4 style="margin-bottom: 1rem; font-size: 1.3rem;">${title}</h4>
                    <p style="margin-bottom: 1rem; line-height: 1.6;"><strong>Issued by:</strong> ${issuer}</p>
                    <p style="margin-bottom: 1rem; line-height: 1.6;"><strong>Date:</strong> ${date}</p>
                    <p style="margin-bottom: 1rem; line-height: 1.6;">This certificate demonstrates proficiency and completion of the required coursework and assessments.</p>
                </div>
            </div>
            <div class="modal-footer" style="
                padding: 1rem 2rem 2rem;
                display: flex;
                gap: 1rem;
                justify-content: center;
            ">
                <button class="btn btn--primary download-cert-btn">Download Certificate</button>
                <button class="btn btn--outline modal-close-btn">Close</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeButtons = modal.querySelectorAll('.modal-close, .modal-close-btn');
    
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.remove();
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Download certificate button
    const downloadBtn = modal.querySelector('.download-cert-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            showNotification(`Certificate "${title}" download would start here. This is a demo portfolio.`, 'info');
        });
    }

    // Escape key to close
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Resume download functionality
function initResumeDownload() {
    const resumeButtons = document.querySelectorAll('#download-resume, #about-resume');
    
    resumeButtons.forEach(button => {
        // These buttons now have actual href links in HTML
        button.addEventListener('click', function() {
            // Add visual feedback
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-download"></i> Opening...';
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 1500);
            
            showNotification('📄 Resume is opening in a new tab!', 'success');
        });
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Add some additional smooth scrolling for any missed links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (link && link.getAttribute('href') !== '#') {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Performance optimization: Lazy load when available
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
initLazyLoading();

// Add loading animation when page loads
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add stagger animation to hero elements
    const heroElements = document.querySelectorAll('.hero-image, .hero-text > *');
    heroElements.forEach((element, index) => {
        if (element) {
            element.style.animationDelay = `${index * 0.2}s`;
            element.classList.add('animate-in');
        }
    });
});

// Add form field focus effects
document.addEventListener('DOMContentLoaded', function() {
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
        control.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        control.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
});

// Education animations
function initEducationAnimations() {
    const eduItems = document.querySelectorAll('.edu-item');
    
    const eduObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                eduObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    eduItems.forEach(item => {
        eduObserver.observe(item);
    });
}

