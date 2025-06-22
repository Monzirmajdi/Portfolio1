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
    const portfolioCategories = document.querySelectorAll(".portfolio-category");
    const modalTitle = document.getElementById("modal-title");
    const modalGallery = document.getElementById("modal-gallery");

    // Portfolio data structure
    const portfolioData = {
        "social-media-design ": {
            title: "Baseline Medical",
            items: [
                {
                    title: "Baseline Medical - Jumaa Mubarak Campaign",
                    images: ["images/social/1000003401.jpg"]
                },
                {
                    title: "Baseline Medical - Location Services",
                    images: ["images/social/1000003400.jpg"]
                },
                {
                    title: "Baseline Medical - Religious Content",
                    images: ["images/social/1000003399.jpeg"]
                },
                {
                    title: "Baseline Medical - Technical Support",
                    images: ["images/social/1000003398.jpeg"]
                },
                {
                    title: "Baseline Medical",
                    images: ["images/social/1000003397.jpg"]
                    
                },
                {
                    title: "Baseline Medical",
                    images: ["images/social/Untitled102_20250402071023_U48Jxi888h.jpg"]
                    
                }, 
                {
                    title: "Baseline Medical",
                    images: ["images/social/Untitled106_20250405034447_HRODD1Gv87.jpg"]
                    
                },
                {
                    title: "Baseline Medical",
                    images: ["images/social/Untitled116_20250410122545_pOAvwGdE46.jpg"]
                    
                },
                {
                    title: "Baseline Medical",
                    images: ["Untitled115_20250410034107_z09rro0p6z.jpg"]
                    
                },
                {
                    title: "Baseline Medical",
                    images: ["images/social/Untitled137_20250504191027_i8Yz5CJA1l.jpg"]
                    
                },
                {
                    title: "Baseline Medical",
                    images: ["images/social/Untitled126_20250423164653_GIcphMOb1F.jpg"]
                    
                },
                {
                    title: "Baseline Medical",
                    images: ["images/social/Untitled120_20250416181851_4em5lWym0Y.jpg"]
                    
                },
                {
                    title: "Baseline Medical",
                    images: ["images/social/Untitled148_20250519082112_rCboTPRA9J.jpg"]
                    
                },
                {
                    title: "Baseline Medical",
                    images: ["images/social/Untitled19_20250621143722_kHAbQXq70C.jpg"]
                    
                },
                {
                    title: "Baseline Medical",
                    images: ["images/social/Untitled149_Restored_20250520022900_obwjtrvP6j.jpg"]
                    
                }
            ], 
            
            title: "Social media designs",
            items: [
                {
                    title: "khomra",
                    images: ["images/social/Untitled197_20250620094504_cY0UGwIr7L.jpg"]
                },
            ]  
        "branding": {
            title: "Brand Identity & Logos",
            items: [
                {
                    title: "تليفوني - متجر للهواتف والاكسسوارات",
                    description: "تصميم هوية بصرية لمتجر هواتف واكسسوارات",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    images: ["images/1000229017.jpg", "images/1000229016.jpg"]
                },
                {
                    title: "مؤسسة د/أبو ذر الكودة - مؤسسة تعليمية",
                    description: "تصميم شعار لمؤسسة تعليمية",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    images: ["images/1000229023.jpg", "images/1000229024.jpg"]
                },
                {
                    title: "Nook Nest - محل لبيع الأثاث المنزلي والمكتبي",
                    description: "تصميم هوية بصرية لمحل أثاث منزلي ومكتبي",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    images: ["images/1000229008.jpg", "images/1000229009.jpg"]
                },
                {
                    title: "JK Arts - شعار لمنشئ محتوى فني",
                    description: "تصميم شعار لمنشئ محتوى فني",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    images: ["images/1000229019.jpg", "images/1000229020.jpg"]
                },
                {
                    title: "Ratina - براند سوداني للطرح والمنتجات التجميلية",
                    description: "تصميم هوية بصرية لبراند سوداني للطرح والمنتجات التجميلية",
                    tools: "Adobe Illustrator, Adobe Photoshop",
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
                    tools: "Figma, Adobe XD"
                },
                {
                    title: "E-commerce Website",
                    description: "Complete website design and user experience",
                    tools: "Figma, Sketch"
                },
                {
                    title: "Dashboard Design",
                    description: "Admin dashboard for business management",
                    tools: "Adobe XD, Figma"
                },
                {
                    title: "Landing Page Design",
                    description: "High-converting landing page layouts",
                    tools: "Figma, Photoshop"
                }
            ]
        }
    };

    // Function to populate card previews
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
            openPortfolioModal(category);
        });
    });

    function openPortfolioModal(category) {
        const data = portfolioData[category];
        if (!data) return;

        modalTitle.textContent = data.title;
        modalGallery.innerHTML = "";

        // Check if category has items
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
            data.items.forEach(item => {
                const galleryItem = document.createElement("div");
                galleryItem.className = "gallery-item";
                
                let imageContent = "";
                if (item.images && item.images.length > 0) {
                    imageContent = `
                        <div class="gallery-images">
                            ${item.images.map(img => `<img src="${img}" alt="${item.title}" class="gallery-image">`).join("")}
                        </div>
                    `;
                } else if (item.image) {
                    imageContent = `
                        <div class="gallery-images">
                            <img src="${item.image}" alt="${item.title}" class="gallery-image">
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

        modal.style.display = "block";
        document.body.style.overflow = "hidden";
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
        if (e.key === "Escape" && modal.style.display === "block") {
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

    // Dynamic typing effect for hero subtitle (optional enhancement)
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
    }, 1500);
});


