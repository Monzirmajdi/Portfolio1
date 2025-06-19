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
        items: []
    },
    'branding': {
        title: 'Brand Identity & Logos',
        items: [
            {
                title: 'تليفوني - Phone Store Branding',
                description: 'Complete brand identity for mobile phone and accessories store',
                tools: 'Adobe Illustrator, Adobe Photoshop',
                images: ['images/1000229017.jpg', 'images/1000229016.jpg']
            },
            {
                title: 'مؤسسة د/أبو ذر الكودة - Educational Institution',
                description: 'Logo design for educational institution',
                tools: 'Adobe Illustrator, Adobe Photoshop',
                images: ['images/1000229023.jpg', 'images/1000229024.jpg']
            },
            {
                title: 'Nook Nest - Furniture Store',
                description: 'Brand identity for home and office furniture store',
                tools: 'Adobe Illustrator, Adobe Photoshop',
                images: ['images/1000229008.jpg', 'images/1000229009.jpg']
            },
            {
                title: 'JK Arts - Content Creator Logo',
                description: 'Logo design for artistic content creator',
                tools: 'Adobe Illustrator, Adobe Photoshop',
                images: ['images/1000229019.jpg', 'images/1000229020.jpg']
            },
            {
                title: 'Ratina - Sudanese Beauty Brand',
                description: 'Brand identity for Sudanese hijab and cosmetics brand',
                tools: 'Adobe Illustrator, Adobe Photoshop',
                images: ['images/1000229011.jpg', 'images/1000229012.jpg']
            }
        ]
    },
    'ui-ux': {
        title: 'UI/UX Design',
        items: []
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

    // Check if category has items
    if (data.items.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-category';
        emptyMessage.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <i class="fas fa-folder-open" style="font-size: 3rem; margin-bottom: 20px;"></i>
                <h3 style="color: #f4c430; margin-bottom: 10px;">Coming Soon</h3>
                <p>Projects in this category will be added soon.</p>
            </div>
        `;
        modalGallery.appendChild(emptyMessage);
    } else {
        data.items.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            let imageContent = '';
            if (item.images && item.images.length > 0) {
                imageContent = `
                    <div class="gallery-images">
                        ${item.images.map(img => `<img src="${img}" alt="${item.title}" class="gallery-image">`).join('')}
                    </div>
                `;
            } else {
                imageContent = `
                    <div class="gallery-placeholder">
                        <i class="fas fa-image" style="font-size: 2rem; color: #666;"></i>
                    </div>
                `;
            }
            
            galleryItem.innerHTML = `
                ${imageContent}
                <h4 style="margin-bottom: 10px; color: #f4c430;">${item.title}</h4>
                <p style="color: #ccc; margin-bottom: 10px; font-size: 0.9rem;">${item.description}</p>
                <p style="color: #999; font-size: 0.8rem;"><strong>Tools:</strong> ${item.tools}</p>
            `;
            modalGallery.appendChild(galleryItem);
        });
    }

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

// Image modal functionality
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const imageClose = document.querySelector('.image-close');

// Add click event to gallery images
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('gallery-image')) {
        modalImage.src = e.target.src;
        modalImage.alt = e.target.alt;
        imageModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
});

// Close image modal
imageClose.addEventListener('click', () => {
    imageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
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

