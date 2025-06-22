// Hamburger menu functionality
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
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
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("portfolio-modal");
    const closeModal = document.querySelector(".modal .close");
    const modalTitle = document.getElementById("modal-title");
    const modalGallery = document.getElementById("modal-gallery");

    // Portfolio data structure
    const portfolioData = {
        "social-media": {
            title: "Social Media Design",
            items: [
                {
                    title: "Baseline Medical - Eid Mubarak Campaign",
                    description: "Eid greeting social media post for Baseline Medical with mosque imagery",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/social/1000003401.jpg",
                    images: ["images/social/1000003401.jpg", "images/social/1000003324.png", "images/social/1000003399.jpg", "images/social/1000003398.jpg", "images/social/1000003397.jpg", "images/social/1000003400.jpg"]
                },
                {
                    title: "Baseline Medical - Location Services",
                    description: "Social media post promoting location-based services with map pin design",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/social/1000003400.jpg",
                    images: ["images/social/1000003400.jpg", "images/social/1000003324.png"]
                },
                {
                    title: "Baseline Medical - Religious Content",
                    description: "Islamic-themed social media post with Quran and prayer content",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/social/1000003399.jpg",
                    images: ["images/social/1000003399.jpg"]
                },
                {
                    title: "Baseline Medical - Technical Support",
                    description: "Educational post about technical support and equipment maintenance",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/social/1000003398.jpg",
                    images: ["images/social/1000003398.jpg"]
                },
                {
                    title: "Baseline Medical - Eid Al-Adha Campaign",
                    description: "Eid Al-Adha themed social media post with sheep and laboratory equipment",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/social/1000003397.jpg",
                    images: ["images/social/1000003397.jpg"]
                }
            ]
        },
        "branding": {
            title: "Brand Identity & Logos",
            items: [
                {
                    title: "تليفوني - متجر للهواتف والاكسسوارات",
                    description: "تصميم هوية بصرية لمتجر هواتف واكسسوارات",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/1000229017.jpg",
                    images: ["images/1000229017.jpg", "images/1000229016.jpg", "images/1000229023.jpg"]
                },
                {
                    title: "مؤسسة د/أبو ذر الكودة - مؤسسة تعليمية",
                    description: "تصميم شعار لمؤسسة تعليمية",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/1000229023.jpg",
                    images: ["images/1000229023.jpg", "images/1000229024.jpg"]
                },
                {
                    title: "Nook Nest - محل لبيع الأثاث المنزلي والمكتبي",
                    description: "تصميم هوية بصرية لمحل أثاث منزلي ومكتبي",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/1000229008.jpg",
                    images: ["images/1000229008.jpg", "images/1000229009.jpg"]
                },
                {
                    title: "JK Arts - شعار لمنشئ محتوى فني",
                    description: "تصميم شعار لمنشئ محتوى فني",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/1000229019.jpg",
                    images: ["images/1000229019.jpg", "images/1000229020.jpg"]
                },
                {
                    title: "Ratina - براند سوداني للطرح والمنتجات التجميلية",
                    description: "تصميم هوية بصرية لبراند سوداني للطرح والمنتجات التجميلية",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/1000229011.jpg",
                    images: ["images/1000229011.jpg", "images/1000229012.jpg"]
                }
            ]
        },
        "ui-ux": {
            title: "UI/UX Design",
            items: [
                {
                    title: "Mobile App Interface",
                    description: "Healthcare mobile application design",
                    tools: "Figma, Adobe XD",
                    previewImage: "images/placeholder.png", // Placeholder image
                    images: [] // Add placeholder images if available
                },
                {
                    title: "E-commerce Website",
                    description: "Complete website design and user experience",
                    tools: "Figma, Sketch",
                    previewImage: "images/placeholder.png", // Placeholder image
                    images: []
                },
                {
                    title: "Dashboard Design",
                    description: "Admin dashboard for business management",
                    tools: "Adobe XD, Figma",
                    previewImage: "images/placeholder.png", // Placeholder image
                    images: []
                },
                {
                    title: "Landing Page Design",
                    description: "High-converting landing page layouts",
                    tools: "Figma, Photoshop",
                    previewImage: "images/placeholder.png", // Placeholder image
                    images: []
                }
            ]
        }
    };

    // Function to populate card previews (unchanged)
    function populateCardPreviews() {
        document.querySelectorAll(".portfolio-category").forEach(categoryDiv => {
            const previewContainer = categoryDiv.querySelector(".card-preview");
            // Clear existing content
            previewContainer.innerHTML = "";

            // Add 3 empty placeholder divs
            for (let i = 0; i < 3; i++) {
                const placeholder = document.createElement("div");
                placeholder.className = "preview-item";
                previewContainer.appendChild(placeholder);
            }
        });
    }

    // Call populateCardPreviews on page load
    window.addEventListener("load", populateCardPreviews);

    // Open modal when portfolio category is clicked
    document.querySelectorAll(".card-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const category = e.target.closest(".portfolio-category").dataset.category;
            showProjectList(category);
        });
    });

    let currentCategory = null;

    function showProjectList(category) {
        currentCategory = category;
        const data = portfolioData[category];
        if (!data) return;

        modalTitle.textContent = data.title;
        modalGallery.innerHTML = "";

        if (data.items.length === 0) {
            const emptyMessage = document.createElement("div");
            emptyMessage.className = "empty-category";
            emptyMessage.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-folder-open" style="font-size: 3rem; margin-bottom: 20px;"></i>
                    <h3 style="color: #f4c430; margin-bottom: 10px;">Coming Soon</h3>
                    <p>Projects in this category will be added soon.</p>
                </div>
            `;
            modalGallery.appendChild(emptyMessage);
        } else {
            data.items.forEach((item, index) => {
                const projectListItem = document.createElement("div");
                projectListItem.className = "project-list-item";
                projectListItem.innerHTML = `
                    <img src="${item.previewImage}" alt="${item.title}" class="project-preview-image">
                    <h4 style="margin-bottom: 10px; color: #f4c430;">${item.title}</h4>
                    <p style="color: #ccc; font-size: 0.9rem;">${item.description}</p>
                    <p style="color: #999; font-size: 0.8rem;"><strong>Tools:</strong> ${item.tools}</p>
                    <button class="view-project-btn" data-project-index="${index}">View Project</button>
                `;
                modalGallery.appendChild(projectListItem);
            });

            document.querySelectorAll(".view-project-btn").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const projectIndex = parseInt(e.target.dataset.projectIndex);
                    showProjectDetails(currentCategory, projectIndex);
                });
            });
        }

        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    }

    function showProjectDetails(category, projectIndex) {
        const data = portfolioData[category];
        const project = data.items[projectIndex];
        if (!project) return;

        modalTitle.textContent = project.title;
        modalGallery.innerHTML = `
            <button id="back-to-projects-btn" class="btn btn-secondary" style="margin-bottom: 20px;">Back to Projects</button>
            <p style="color: #ccc; margin-bottom: 10px; font-size: 1rem;">${project.description}</p>
            <p style="color: #999; margin-bottom: 20px; font-size: 0.9rem;"><strong>Tools:</strong> ${project.tools}</p>
            <div class="project-images-container">
                <div class="gallery-grid project-images-grid">
                    <!-- Images will be loaded here -->
                </div>
                ${project.images && project.images.length > 5 ? `<button id="show-more-images-btn" class="btn btn-primary" style="margin-top: 20px;">Show More</button>` : ''}
            </div>
        `;

        const projectImagesGrid = modalGallery.querySelector(".project-images-grid");
        let imagesToShow = 5;

        function renderImages() {
            projectImagesGrid.innerHTML = "";
            if (project.images && project.images.length > 0) {
                project.images.slice(0, imagesToShow).forEach(imgSrc => {
                    const imgElement = document.createElement("div");
                    imgElement.className = "gallery-item"; // Reusing gallery-item for styling
                    imgElement.innerHTML = `<img src="${imgSrc}" alt="${project.title}" class="gallery-image">`;
                    projectImagesGrid.appendChild(imgElement);
                });
            } else {
                const placeholder = document.createElement("div");
                placeholder.className = "gallery-placeholder";
                placeholder.innerHTML = `<i class="fas fa-image" style="font-size: 2rem; color: #666;"></i>`;
                projectImagesGrid.appendChild(placeholder);
            }
        }

        renderImages();

        const showMoreBtn = document.getElementById("show-more-images-btn");
        if (showMoreBtn) {
            showMoreBtn.addEventListener("click", () => {
                imagesToShow = project.images.length;
                renderImages();
                showMoreBtn.style.display = "none"; // Hide button after showing all
            });
        }

        document.getElementById("back-to-projects-btn").addEventListener("click", () => {
            showProjectList(category);
        });
    }

    // Close modal
    closeModal.addEventListener("click", closePortfolioModal);
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            closePortfolioModal();
        }
    });

    function closePortfolioModal() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }

    // Contact form handling (unchanged)
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get("name");
        const email = formData.get("email");
        const subject = formData.get("subject");
        const message = formData.get("message");
        
        // Simple form validation
        if (!name || !email || !subject || !message) {
            alert("Please fill in all fields");
            return;
        }
        
        // Simulate form submission
        alert("Thank you for your message! I will get back to you soon.");
        contactForm.reset();
    });

    // Intersection Observer for animations (unchanged)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Observe elements for animation (unchanged)
    document.querySelectorAll(".category-card, .skill-item, .contact-item").forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });

    // Parallax effect for floating elements (unchanged)
    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll(".element");
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Add loading animation (unchanged)
    window.addEventListener("load", () => {
        document.body.classList.add("loaded");
    });

    // Keyboard navigation for accessibility (unchanged)
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.style.display === "block") {
            closePortfolioModal();
        }
    });

    // Add hover effects to portfolio cards (unchanged)
    document.querySelectorAll(".category-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-10px) scale(1.02)";
        });
        
        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0) scale(1)";
        });
    });

    // Dynamic typing effect for hero subtitle (optional enhancement - unchanged)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = "";
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
            }
        
        type();
    }

    // Initialize typing effect after page load (unchanged)
    setTimeout(() => {
        const subtitle = document.querySelector(".hero-subtitle");
        if (subtitle) {
            const originalText = subtitle.textContent;
            typeWriter(subtitle, originalText, 80);
        }
    }, 1000);

    // Update navbar logo text based on scroll position
    const navLogoSpan = document.querySelector(".nav-logo span");
    const sections = document.querySelectorAll("section[id]");
    const navbar = document.querySelector(".navbar");

    function updateNavLogo() {
        let currentSectionId = "home"; // Default to home

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight; // Adjust for fixed navbar
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSectionId = section.id;
            }
        });

        // Map section IDs to display names
        const sectionNames = {
            "home": "Home",
            "about": "About Me",
            "portfolio": "Portfolio",
            "contact": "Contact"
        };

        navLogoSpan.textContent = sectionNames[currentSectionId] || "Portfolio"; // Fallback to Portfolio
    }

    // Call on scroll and on load to set initial state
    window.addEventListener("scroll", updateNavLogo);
    window.addEventListener("load", updateNavLogo);
});


