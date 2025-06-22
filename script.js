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
                    title: "Baseline Medical - Consolidated Projects",
                    description: "A collection of social media designs for Baseline Medical, including Eid campaigns, location services, religious content, and technical support.",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/social/1000003401.jpg",
                    images: [
                        "images/social/1000003401.jpg",
                        "images/social/1000003324.png",
                        "images/social/1000003399.jpg",
                        "images/social/1000003398.jpg",
                        "images/social/1000003397.jpg",
                        "images/social/1000003400.jpg"
                    ]
                },
                {
                    title: "New Empty Project",
                    description: "This is a placeholder for a new project.",
                    tools: "",
                    previewImage: "images/placeholder.png",
                    images: []
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
                    previewImage: "images/placeholder.png",
                    images: []
                },
                {
                    title: "E-commerce Website",
                    description: "Complete website design and user experience",
                    tools: "Figma, Sketch",
                    previewImage: "images/placeholder.png",
                    images: []
                },
                {
                    title: "Dashboard Design",
                    description: "Admin dashboard for business management",
                    tools: "Adobe XD, Figma",
                    previewImage: "images/placeholder.png",
                    images: []
                },
                {
                    title: "Landing Page Design",
                    description: "High-converting landing page layouts",
                    tools: "Figma, Photoshop",
                    previewImage: "images/placeholder.png",
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

    // دالة عرض قائمة المشاريع بتخطيط البطاقات الجديد
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
            // إنشاء حاوية البطاقات
            const projectsGrid = document.createElement("div");
            projectsGrid.className = "projects-grid";

            data.items.forEach((item, index) => {
                const projectCard = document.createElement("div");
                projectCard.className = "project-card";
                
                // التحقق من وجود صورة معاينة صالحة
                const hasValidPreview = item.previewImage && item.previewImage !== "images/placeholder.png";
                const imageCount = item.images ? item.images.length : 0;
                
                projectCard.innerHTML = `
                    ${hasValidPreview ? 
                        `<img src="${item.previewImage}" alt="${item.title}" class="project-card-image" onerror="this.style.display='none'">` : 
                        `<div class="gallery-placeholder">
                            <i class="fas fa-image"></i>
                        </div>`
                    }
                    <div class="project-card-content">
                        <h4 class="project-card-title">${item.title}</h4>
                        <p class="project-card-description">${item.description}</p>
                        ${item.tools ? `<p class="project-card-tools"><strong>Tools:</strong> ${item.tools}</p>` : ''}
                        <div class="project-card-footer">
                            <div class="project-images-count">
                                <i class="fas fa-images"></i>
                                <span>${imageCount} ${imageCount === 1 ? 'image' : 'images'}</span>
                            </div>
                            <button class="view-project-btn" data-project-index="${index}">
                                ${imageCount > 0 ? 'View Project' : 'Coming Soon'}
                            </button>
                        </div>
                    </div>
                `;

                // إضافة مستمع الأحداث للبطاقة
                if (imageCount > 0) {
                    projectCard.addEventListener("click", (e) => {
                        // التأكد من أن النقر ليس على الزر
                        if (!e.target.classList.contains("view-project-btn")) {
                            showProjectDetails(currentCategory, index);
                        }
                    });

                    // إضافة مستمع الأحداث للزر
                    const viewBtn = projectCard.querySelector(".view-project-btn");
                    viewBtn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        showProjectDetails(currentCategory, index);
                    });
                } else {
                    // تعطيل البطاقة إذا لم تكن هناك صور
                    projectCard.style.cursor = "default";
                    projectCard.style.opacity = "0.7";
                    const viewBtn = projectCard.querySelector(".view-project-btn");
                    viewBtn.disabled = true;
                    viewBtn.style.opacity = "0.5";
                    viewBtn.style.cursor = "not-allowed";
                }

                projectsGrid.appendChild(projectCard);
            });

            modalGallery.appendChild(projectsGrid);
        }

        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }

    // دالة عرض تفاصيل المشروع بتخطيط البطاقات الجديد
    function showProjectDetails(category, projectIndex) {
        const data = portfolioData[category];
        const project = data.items[projectIndex];
        if (!project || !project.images || project.images.length === 0) return;

        modalTitle.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <button id="back-to-projects" style="background: transparent; border: 2px solid #f4c430; color: #f4c430; padding: 8px 12px; border-radius: 20px; cursor: pointer; font-size: 0.9rem;">
                    <i class="fas fa-arrow-left"></i> Back
                </button>
                <span>${project.title}</span>
            </div>
        `;

        modalGallery.innerHTML = `
            <div class="project-images-container">
                <div class="project-images-grid">
                    <!-- Images will be loaded here -->
                </div>
            </div>
        `;

        const projectImagesGrid = modalGallery.querySelector(".project-images-grid");

        // عرض جميع الصور
        project.images.forEach((imgSrc, index) => {
            const imageCard = document.createElement("div");
            imageCard.className = "project-image-card";
            imageCard.innerHTML = `
                <img src="${imgSrc}" alt="${project.title} - Image ${index + 1}" loading="lazy" onerror="this.parentElement.style.display='none'">
                <div class="project-image-overlay">
                    <div class="project-image-info">
                        <i class="fas fa-expand-alt"></i> Click to view full size
                    </div>
                </div>
            `;

            // إضافة مستمع الأحداث لعرض الصورة بحجم كامل
            imageCard.addEventListener("click", () => {
                openImageLightbox(imgSrc, project.title);
            });

            projectImagesGrid.appendChild(imageCard);
        });

        // إضافة مستمع الأحداث لزر الرجوع
        const backBtn = document.getElementById("back-to-projects");
        backBtn.addEventListener("click", () => {
            showProjectList(currentCategory);
        });

        // تحديث عنوان المودال
        backBtn.addEventListener("mouseenter", () => {
            backBtn.style.background = "#f4c430";
            backBtn.style.color = "#0a0a0a";
        });

        backBtn.addEventListener("mouseleave", () => {
            backBtn.style.background = "transparent";
            backBtn.style.color = "#f4c430";
        });
    }

    // دالة عرض الصورة بحجم كامل (lightbox)
    function openImageLightbox(imageSrc, title) {
        const lightbox = document.createElement("div");
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 3000;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        `;

        const img = document.createElement("img");
        img.src = imageSrc;
        img.alt = title;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;

        const closeBtn = document.createElement("button");
        closeBtn.innerHTML = "&times;";
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 30px;
            background: none;
            border: none;
            color: white;
            font-size: 40px;
            cursor: pointer;
            z-index: 3001;
        `;

        lightbox.appendChild(img);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);

        // إغلاق الـ lightbox
        const closeLightbox = () => {
            document.body.removeChild(lightbox);
        };

        lightbox.addEventListener("click", closeLightbox);
        closeBtn.addEventListener("click", closeLightbox);
        
        // إغلاق بالضغط على Escape
        const handleKeyPress = (e) => {
            if (e.key === "Escape") {
                closeLightbox();
                document.removeEventListener("keydown", handleKeyPress);
            }
        };
        document.addEventListener("keydown", handleKeyPress);

        // منع إغلاق الـ lightbox عند النقر على الصورة
        img.addEventListener("click", (e) => {
            e.stopPropagation();
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

    // Contact form handling
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

    // Intersection Observer for animations
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

    // Observe elements for animation
    document.querySelectorAll(".category-card, .skill-item, .contact-item").forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });

    // Parallax effect for floating elements
    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll(".element");
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Add loading animation
    window.addEventListener("load", () => {
        document.body.classList.add("loaded");
    });

    // Keyboard navigation for accessibility
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.style.display === "flex") {
            closePortfolioModal();
        }
    });

    // Add hover effects to portfolio cards
    document.querySelectorAll(".category-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-10px) scale(1.02)";
        });
        
        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0) scale(1)";
        });
    });

    // Dynamic typing effect for hero subtitle
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

    // Initialize typing effect after page load
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

        navLogoSpan.textContent = sectionNames[currentSectionId] || "Portfolio";
    }

    // Update navbar logo on scroll
    window.addEventListener("scroll", updateNavLogo);
    
    // Initial call to set the correct logo text
    updateNavLogo();
});

