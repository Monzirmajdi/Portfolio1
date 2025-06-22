// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
        // عندما يتم التمرير، اجعله أقل شفافية قليلاً وزد الضبابية على المحتوى الخلفي
        navbar.style.background = "rgba(10, 10, 10, 0.8)";
        navbar.style.backdropFilter = "blur(12px)"; // زيادة الضبابية على المحتوى الخلفي عند التمرير
    } else {
        // في الوضع الافتراضي (أعلى الصفحة)، شفافية وضبابية أقل على المحتوى الخلفي
        navbar.style.background = "rgba(10, 10, 10, 0.6)";
        navbar.style.backdropFilter = "blur(8px)";
    }
});

// Portfolio Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('portfolio-modal');
    const closeModal = document.querySelector('.modal .close');
    const portfolioCategories = document.querySelectorAll('.portfolio-category');
    const modalTitle = document.getElementById('modal-title');
    const modalGallery = document.getElementById('modal-gallery');

    // Sample data for portfolio items (replace with your actual data)
    const portfolioData = {
        'social-media': [
            { title: 'Social Media Post 1', image: 'images/social-media/sm1.jpg' },
            { title: 'Social Media Post 2', image: 'images/social-media/sm2.jpg' },
            { title: 'Social Media Post 3', image: 'images/social-media/sm3.jpg' },
            { title: 'Social Media Post 4', image: 'images/social-media/sm4.jpg' },
            { title: 'Social Media Post 5', image: 'images/social-media/sm5.jpg' },
            { title: 'Social Media Post 6', image: 'images/social-media/sm6.jpg' },
        ],
        'branding': [
            { title: 'Brand Logo 1', image: 'images/branding/brand1.jpg' },
            { title: 'Brand Logo 2', image: 'images/branding/brand2.jpg' },
            { title: 'Brand Logo 3', image: 'images/branding/brand3.jpg' },
        ],
        'ui-ux': [
            { title: 'UI/UX Design 1', image: 'images/ui-ux/ui1.jpg' },
            { title: 'UI/UX Design 2', image: 'images/ui-ux/ui2.jpg' },
        ]
    };

    portfolioCategories.forEach(category => {
        const viewProjectsBtn = category.querySelector('.card-btn');
        const categoryName = category.dataset.category;
        const categoryTitle = category.querySelector('.card-title').textContent;

        viewProjectsBtn.addEventListener('click', () => {
            modalTitle.textContent = categoryTitle;
            modalGallery.innerHTML = ''; // Clear previous items

            const items = portfolioData[categoryName];
            if (items) {
                items.forEach(item => {
                    const galleryItem = document.createElement('div');
                    galleryItem.classList.add('gallery-item');
                    galleryItem.innerHTML = `
                        <img src="${item.image}" alt="${item.title}" class="gallery-image">
                        <h3>${item.title}</h3>
                    `;
                    modalGallery.appendChild(galleryItem);
                });
            } else {
                modalGallery.innerHTML = '<p>No projects found for this category.</p>';
            }

            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact Form Submission (Example - you'll need a backend for actual submission)
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Message sent! (This is a demo, actual submission requires a backend)');
    this.reset();
});


