// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Portfolio Modal Functionality
const modal = document.getElementById('portfolio-modal');
const modalTitle = document.getElementById('modal-title');
const modalGallery = document.getElementById('modal-gallery');
const closeModal = document.querySelector('.close');

// Portfolio data structure
const portfolioData = {
    'social-media': {
        title: 'Social Media Design',
        items: [
            {
                title: 'Instagram Campaign - Tech Startup',
                description: 'Complete visual identity for social media campaign',
                tools: 'Adobe Photoshop, Illustrator'
            },
            {
                title: 'Facebook Ad Series - Healthcare',
                description: 'Medical company social media advertisements',
                tools: 'Adobe Creative Suite'
            },
            {
                title: 'LinkedIn Content - Corporate',
                description: 'Professional social media content design',
                tools: 'Figma, Photoshop'
            },
            {
                title: 'Social Media Templates',
                description: 'Reusable template designs for various platforms',
                tools: 'Adobe Illustrator'
            }
        ]
    },
    'branding': {
        title: 'Brand Identity & Logos',
        items: [
            {
                title: 'Baseline Medical - Logo Design',
                description: 'Complete brand identity for medical company',
                tools: 'Adobe Illustrator, Photoshop'
            },
            {
                title: 'Tech Startup Branding',
                description: 'Full brand package including logo and guidelines',
                tools: 'Adobe Creative Suite'
            },
            {
                title: 'Restaurant Chain Identity',
                description: 'Brand identity for Gulf region restaurant',
                tools: 'Illustrator, InDesign'
            },
            {
                title: 'Corporate Rebranding',
                description: 'Complete rebrand for established company',
                tools: 'Adobe Creative Suite'
            }
        ]
    },
    'ui-ux': {
        title: 'UI/UX Design',
        items: [
            {
                title: 'Mobile App Interface',
                description: 'Healthcare mobile application design',
                tools: 'Figma, Adobe XD'
            },
            {
                title: 'E-commerce Website',
                description: 'Complete website design and user experience',
                tools: 'Figma, Sketch'
            },
            {
                title: 'Dashboard Design',
                description: 'Admin dashboard for business management',
                tools: 'Adobe XD, Figma'
            },
            {
                title: 'Landing Page Design',
                description: 'High-converting landing page layouts',
                tools: 'Figma, Photoshop'
            }
        ]
    }
};

// Open modal when portfolio category is clicked
document.querySelectorAll('.card-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const category = e.target.closest('.portfolio-category').dataset.category;
        openPortfolioModal(category);
    });
});

function openPortfolioModal(category) {
    const data = portfolioData[category];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalGallery.innerHTML = '';

    data.items.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <div class="gallery-placeholder">
                <i class="fas fa-image" style="font-size: 2rem; color: #666;"></i>
            </div>
            <h4 style="margin-bottom: 10px; color: #f4c430;">${item.title}</h4>
            <p style="color: #ccc; margin-bottom: 10px; font-size: 0.9rem;">${item.description}</p>
            <p style="color: #999; font-size: 0.8rem;"><strong>Tools:</strong> ${item.tools}</p>
        `;
        modalGallery.appendChild(galleryItem);
    });

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
closeModal.addEventListener('click', closePortfolioModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closePortfolioModal();
    }
});

function closePortfolioModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Contact form handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple form validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate form submission
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.category-card, .skill-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closePortfolioModal();
    }
});

// Add hover effects to portfolio cards
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Dynamic typing effect for hero subtitle (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect after page load
setTimeout(() => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        typeWriter(subtitle, originalText, 80);
    }
}, 1500);

