// Hamburger menu functionality & all other DOMContentLoaded related scripts
document.addEventListener("DOMContentLoaded", () => {
    // Hamburger menu
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }

    // Animation for skill bars
    const skillBars = document.querySelectorAll(".skill-level");
    if (skillBars.length > 0) {
        const animateSkillBars = () => {
            skillBars.forEach(bar => {
                const progress = bar.querySelector(".skill-progress");
                const level = bar.getAttribute("data-level");
                progress.style.width = level;
            });
        };

        // Trigger animation when section is in view
        const aboutSection = document.querySelector("#about");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(aboutSection);
    }

    // Dynamic Navbar Title on Scroll
    const navLogoSpan = document.querySelector(".nav-logo span");
    const sections = document.querySelectorAll("section[id]");

    const sectionTitles = {
        "home": "Home",
        "about": "About",
        "portfolio": "Portfolio",
        "contact": "Contact"
    };

    function updateNavLogoTitle() {
        let currentSectionId = "home"; // Default to home

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
                currentSectionId = section.id;
            }
        });

        if (navLogoSpan) { // تأكد من وجود العنصر قبل التعديل
            navLogoSpan.textContent = sectionTitles[currentSectionId];
        }
    }

    // استدعاء الدالة عند تحميل الصفحة لتحديد العنوان الأولي
    updateNavLogoTitle();
    // استدعاء الدالة عند التمرير
    window.addEventListener("scroll", updateNavLogoTitle);

    // Typing effect for Hero Subtitle
    const heroSubtitle = document.querySelector(".hero-subtitle");
    const textToType = "Graphic Designer & Visual Artist";
    let charIndex = 0;
    let isTypingComplete = false;

    if (heroSubtitle) {
        heroSubtitle.textContent = ""; // ابدأ بنص فارغ
        heroSubtitle.style.opacity = 1; // اجعله مرئياً
        heroSubtitle.style.animation = 'none'; // أوقف الـ fadeInUp إذا كان يتعارض
        typeWriter();
    }

    function typeWriter() {
        if (!isTypingComplete && charIndex < textToType.length) {
            heroSubtitle.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 70); // سرعة الكتابة (مللي ثانية)
        } else {
            isTypingComplete = true;
        }
    }

    // Theme toggle functionality
    const themeToggle = document.querySelector(".theme-toggle");
    const body = document.body;

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const icon = themeToggle.querySelector("i");
            body.classList.toggle("light-mode");
            if (body.classList.contains("light-mode")) {
                icon.classList.replace("fa-moon", "fa-sun");
                localStorage.setItem("page-theme", "light");
            } else {
                icon.classList.replace("fa-sun", "fa-moon");
                localStorage.setItem("page-theme", "dark");
            }
        });

        // تحميل التفضيل المحفوظ عند بدء التشغيل
        if (localStorage.getItem("page-theme") === "light") {
            body.classList.add("light-mode");
            themeToggle.querySelector("i").classList.replace("fa-moon", "fa-sun");
        }
    }

    // Portfolio Modal Functionality
    const modal = document.getElementById("portfolio-modal");
    const closeModal = document.querySelector(".modal .close");
    const modalTitle = document.getElementById("modal-title");
    let modalGallery = document.getElementById("modal-gallery"); // Changed to let

    // دالة لتحديث المحتوى بسلاسة
    function updateContentWithFade(element, newHTML, callback) {
        element.style.opacity = 0;
        element.style.pointerEvents = 'none'; // تعطيل التفاعلات أثناء الانتقال
        
        setTimeout(() => {
            element.innerHTML = newHTML;
            element.style.opacity = '';
            element.style.pointerEvents = ''; // إعادة تمكين التفاعلات
            
            // إضافة انتقال سلس للظهور
            setTimeout(() => {
                if (callback) callback();
            }, 50); // تأخير بسيط لضمان تطبيق التغييرات
        }, 300); // يتناسب مع مدة الانتقال في CSS
    }

    // Portfolio data structure
    const portfolioData = {
        "social-media": {
            title: "Social Media Design",
            items: [
                {
                    title: "Baseline Medical",
                    description: "Social media ads for Baseline Medical page",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/Social-media/Baseline/Baseline00.webp",
                    images: [
                             "images/Social-media/Baseline/Baseline00.webp", "images/Social-media/Baseline/Baseline08.webp", 
                             "images/Social-media/Baseline/Baseline01.webp", "images/Social-media/Baseline/Baseline09.webp", 
                             "images/Social-media/Baseline/Baseline02.webp", 
                             "images/Social-media/Baseline/Baseline03.webp", "images/Social-media/Baseline/Baseline11.webp", 
                             "images/Social-media/Baseline/Baseline12.webp", 
                             "images/Social-media/Baseline/Baseline05.webp", "images/Social-media/Baseline/Baseline13.webp", 
                             "images/Social-media/Baseline/Baseline06.webp", "images/Social-media/Baseline/Baseline14.webp",
                             "images/Social-media/Baseline/Baseline16.jpeg", 
                             "images/Social-media/Baseline/Baseline18.jpeg",
                             "images/Social-media/Baseline/Baseline20.jpeg", "images/Social-media/Baseline/Baseline21.jpeg",
                             "images/Social-media/Baseline/Baseline22.jpeg", "images/Social-media/Baseline/Baseline23.jpeg",
                             "images/Social-media/Baseline/Baseline24.jpeg", "images/Social-media/Baseline/Baseline25.jpeg",
                             "images/Social-media/Baseline/Baseline26.jpeg", "images/Social-media/Baseline/Baseline27.jpeg", 
                             "images/Social-media/Baseline/Baseline28.jpeg", 
                             "images/Social-media/Baseline/Untitled-2-01_052752 (2).jpeg",
                             "images/Social-media/Baseline/Untitled17_20250906120511.jpeg",
                             "images/Social-media/Baseline/Untitled107_20250404064546_vVMow1vi0g_c1Reykj31P.webp", 
                             "images/Social-media/Baseline/Untitled115_20250410034107_MG4jGZKc4G_DcqjoRFW50.webp", 
                             "images/Social-media/Baseline/Untitled116_20250410122545_UyxJ6Uu43k_BlO2apFk6X.webp", 
                             "images/Social-media/Baseline/Untitled120_20250416181851_RLRcqULf7T_Xc6f889q8n.webp", 
                             "images/Social-media/Baseline/Untitled149_Restored_20250520022900_OgwbOoZk4r_cqNkq3rX5M.webp", 
                             "images/Social-media/Baseline/Untitled150_20250607161313_PIkd3DHX2S_NxVyUull2f.webp", 
                             "images/Social-media/Baseline/Untitled169 (1)_CNyjEGoT8O_6IYibalO29.webp"
                            ]
                },
                {
                    title: "khomra",
                    description: "Social media ad for local Sudanese perfume",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/Social-media/Khomra/1000004769_A22mea5b06_qG6cn5Fd2r.webp",
                    images: ["images/Social-media/Khomra/1000004769_A22mea5b06_qG6cn5Fd2r.webp", 
                             "images/Social-media/Khomra/1000004767_NtGk94AQ8p.webp", 
                             "images/Social-media/Khomra/1000004768_jNCdAheZ0X.webp"]
                },
                {
                    title: "Social media designs",
                    description: "Mixed social media Designs for real and imaginary brands",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/Social-media/ADS/c1_20250626_06183977_UzHmudLu4R_r1uXqT7v7x.webp",
                    images: ["images/Social-media/ADS/c1_20250626_06183977_UzHmudLu4R_r1uXqT7v7x.webp", 
                             "images/Social-media/ADS/c1_20250626_06184476_DAbNn8O89Y_cOF1rrGA8W.webp", 
                             "images/Social-media/ADS/c1_20250626_06184529_y5AFcLFz1Q_1ALNxoT55E.webp", 
                             "images/Social-media/ADS/c1_20250626_06184682_3pQdNzME3u_6IbizTyt6n.webp", 
                             "images/Social-media/ADS/c1_20250626_06184747_J23thI8M0W_FrIU6tGS2Q.webp", 
                             "images/Social-media/ADS/c1_20250626_06184790_JVPA1IKB4u.webp", 
                             "images/Social-media/ADS/c1_20250626_06184819_aTkjp5I22h_PACRYc5s2g.webp", 
                             "images/Social-media/ADS/c1_20250626_06183730_n0tZuHHu4j_XkXAH8WV3L.webp", 
                             "images/Social-media/ADS/c1_20250626_06183830_pIuHZwJZ91_B28wVhSp3t.webp" ]
                }, 
                {
                    title: "Mostfana",
                    description: "Social media ad for islamic content page",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/Social-media/Mostfana/mostfana0.webp",
                    images: ["images/Social-media/Mostfana/mostfana0.webp", 
                             "images/Social-media/Mostfana/mostfana1.webp", 
                             "images/Social-media/Mostfana/mostfana2.webp"]
                } 
                
            ]
        },
        "branding": {
            title: "Brand's Logos",
            items: [
                 {
                    title: "Sedra - متجر عسل",
                    description: "تصميم شعار لمتجر يبيع عسل السدر",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/Branding/Sedra/sedra0_001.webp",
                    images: [
                             "images/Branding/Sedra/sedra0_001.webp",
                             "images/Branding/Sedra/sedra1_001.webp", 
                             "images/Branding/Sedra/sedra2.webp",
                             "images/Branding/Sedra/sedra3.webp",
                             "images/Branding/Sedra/sedra4.webp",
                             "images/Branding/Sedra/sedra5.webp"
                            ]
                }, 
               
                 {
                    title: "Khubza - فرن لبناني",
                    description: "تصميم شعار لفرن لبناني يبيع منتجات عالية الجودة",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/Branding/Khobza/Untitled17 (2).webp",
                    images: ["images/Branding/Khobza/Untitled17 (2).webp",
                             "images/Branding/Khobza/Untitled18_20250706230541 (2).webp", 
                             "images/Branding/Khobza/Untitled18_20250706230723 (2).webp",  
                             "images/Branding/Khobza/Untitled18_20250706231107 (2).webp"]
                }, 
                {
                    title: "MARVELOUS - متجر لبيع  لعب مارفل و ديزني",
                    description: "تصميم شعار لمتجر يبيع لعب مارفل و ديزني",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/Branding/Marvelous/Untitled7_y1HeEYCB7D.webp",
                    images: ["images/Branding/Marvelous/Untitled7_y1HeEYCB7D.webp",
                             "images/Branding/Marvelous/Untitled8_20250702201307_gwea46en8g.webp", 
                             "images/Branding/Marvelous/Untitled8_20250702211253_5o2WqqIi2d.webp", 
                             "images/Branding/Marvelous/Untitled8_20250702211306_BJWkteGY31.webp", 
                             "images/Branding/Marvelous/Untitled8_20250702230753_NE3qjYQv06.webp"]
                 }, 
                 {
                    title: "Caas - متجر لبيع القهوة العربية",
                    description: "تصميم شعار لمتجر يبيع القهوة العربية",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/Branding/Caas/Untitled2_20250702084526_9rtchvyA9d.webp",
                    images: ["images/Branding/Caas/Untitled2_20250702084526_9rtchvyA9d.webp",
                             "images/Branding/Caas/Untitled5_20250702105625_uCrZhYLv2v.webp", 
                             "images/Branding/Caas/Untitled5_20250702105921_Setop8uB0A.webp", 
                             "images/Branding/Caas/Untitled5_20250702111204_nsmXkLnY4k.webp", 
                             "images/Branding/Caas/Untitled5_20250702121104_N3GYM81b3F.webp"]
                }, 
                {
                    title: "Ratina - براند سوداني للطرح والمنتجات التجميلية",
                    description: "تصميم شعار لبراند سوداني للطرح والمنتجات التجميلية",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/Branding/Ratina/Untitled182_20250605061344_CvWhFKhQ4Q.webp",
                    images: ["images/Branding/Ratina/Untitled182_20250605061344_CvWhFKhQ4Q.webp", 
                             "images/Branding/Ratina/Untitled183_a66VRPGx8P.webp", 
                             "images/Branding/Ratina/Untitled184_20250605062347_cyR4cyNw8B.webp", 
                             "images/Branding/Ratina/Untitled181_20250605061101_BGUEtEPg0Y.webp", 
                             "images/Branding/Ratina/Untitled180_20250605060456_vryLtoMw0E.webp"]
                }, 
                {
                    title: "Sa Stainless Steel - براند سوداني للاكسسوارات الفضة الاستيل",
                    description: "تصميم شعار لبراند سوداني للاكسسوارات الفضة",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/Branding/Sa/Untitled28_20250624203543_YNhA6ynz1M.webp",
                    images: ["images/Branding/Sa/1_NtqvnVum6y.webp", 
                             "images/Branding/Sa/2_iabZA5PC8E.webp", 
                             "images/Branding/Sa/4_GfPbVJRk7O.webp", 
                             "images/Branding/Sa/5_xheKK6K81L.webp", 
                             "images/Branding/Sa/6_2PZqglIW4P.webp"]
                } 
            ]
        },
        "ui-ux": {
            title: "UI/UX Designs",
            items: [
            ]
        },
        "brand-presentation": {
            title: "Brand Presentations",
            items: [
                {
                    title: "Unilab Medical Equipment",
                    description: "Complete brand identity presentation for medical equipment company showcasing logo design, color palette, typography, and brand applications",
                    tools: "Adobe Illustrator, Adobe InDesign, Adobe Photoshop",
                    previewImage: "images/Branding/Unilab/unilab00.png",
                    slides: [
                        "images/Branding/Unilab/unilab00.png",
                        "images/Branding/Unilab/unilab01.png",
                        "images/Branding/Unilab/unilab02.png",
                        "images/Branding/Unilab/unilab03.png",
                        "images/Branding/Unilab/unilab04.png",
                        "images/Branding/Unilab/unilab05.png",
                        "images/Branding/Unilab/unilab06.png",
                        "images/Branding/Unilab/unilab07.png",
                        "images/Branding/Unilab/unilab08.png",
                        "images/Branding/Unilab/unilab09.png",
                        "images/Branding/Unilab/unilab10.png",
                        "images/Branding/Unilab/unilab11.png",
                        "images/Branding/Unilab/unilab12.png",
                        "images/Branding/Unilab/unilab13.png",
                        "images/Branding/Unilab/unilab14.png"
                    ]
                }, 
                {
                    title: "Sa Stainless steel and accessories",
                    description: "brand identity presentation for accessories store showcasing logo design, spacing,and brand applications",
                    tools: "Adobe Illustrator, Adobe InDesign, Adobe Photoshop",
                    previewImage: "images/presentations/Sa/Sa0.png",
                    slides: [
                        "images/presentations/Sa/Sa0.png",
                        "images/presentations/Sa/Sa1.png",
                        "images/presentations/Sa/Sa2.png",
                        "images/presentations/Sa/Sa3.png",
                        "images/presentations/Sa/Sa4.png",
                        "images/presentations/Sa/Sa5.png"
                    ]
                } 
            ]
        }
    };

    // Function to populate card previews
    function populateCardPreviews() {
        document.querySelectorAll(".portfolio-category").forEach(categoryDiv => {
            const previewContainer = categoryDiv.querySelector(".card-preview");
            previewContainer.innerHTML = "";
            for (let i = 0; i < 3; i++) {
                const placeholder = document.createElement("div");
                placeholder.className = "preview-item";
                previewContainer.appendChild(placeholder);
            }
        });
    }

    window.addEventListener("load", populateCardPreviews);

    // Open modal when portfolio category is clicked
    document.querySelectorAll(".card-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const category = e.target.closest(".portfolio-category").dataset.category;
            showProjectList(category);
        });
    });

    function showProjectList(category) {
        const data = portfolioData[category];
        if (!data) return;

        modalTitle.textContent = data.title;

        let htmlContent = "";
        if (data.items.length === 0) {
            htmlContent = `
                <div class="empty-category">
                    <i class="fas fa-folder-open"></i>
                    <h3>No projects yet</h3>
                </div>
            `;
        } else {
            const gridItems = data.items.map((item, index) => `
                <div class="project-card" data-category="${category}" data-index="${index}">
                    <div class="image-container">
                        <img src="${item.previewImage}"
                             alt="${item.title}"
                             class="project-image"
                             onerror="this.src=\'images/placeholder.png\'"
                             loading="lazy">
                    </div>
                    <div class="project-info">
                        <h3>${item.title}</h3>
                        <p>${item.description.substring(0, 60)}...</p>
                    </div>
                </div>
            `).join("");
            htmlContent = `<div class="modal-gallery-grid">${gridItems}</div>`;
        }

        modal.style.display = "block";
        void modal.offsetWidth;
        modal.classList.add("show-modal");
        updateContentWithFade(modalGallery, htmlContent, () => {
            document.querySelectorAll(".project-card").forEach(card => {
                card.addEventListener("click", (e) => {
                    const cat = e.currentTarget.dataset.category;
                    const idx = parseInt(e.currentTarget.dataset.index);
                    
                    // التحقق من نوع القسم لتحديد طريقة العرض
                    if (cat === "brand-presentation") {
                        showBrandPresentationDetails(cat, idx);
                    } else {
                        showProjectDetails(cat, idx);
                    }
                });
            });
        });
    }

    // وظيفة خاصة لعرض تفاصيل مشاريع Brand Presentation
    function showBrandPresentationDetails(category, projectIndex) {
        const data = portfolioData[category];
        const project = data.items[projectIndex];
        if (!project || !project.slides) return;

        // إخفاء المودال الحالي
        modal.classList.remove("show-modal");
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);

        // إنشاء مودال جديد للعرض التقديمي
        let presentationModal = document.getElementById("brand-presentation-modal");
        if (!presentationModal) {
            presentationModal = document.createElement("div");
            presentationModal.id = "brand-presentation-modal";
            presentationModal.className = "brand-presentation-modal";
            document.body.appendChild(presentationModal);
        }

        const slidesHTML = project.slides.map((slide, index) => `
            <div class="slide-item" data-slide="${index + 1}">
                <img src="${slide}" 
                     alt="${project.title} - Slide ${index + 1}" 
                     class="slide-image"
                     loading="lazy"
                     onerror="this.src=\'images/placeholder.png\'\">
            </div>
        `).join("");

        presentationModal.innerHTML = `
            <div class="brand-presentation-content">
                <div class="presentation-controls">
                    <button class="back-to-projects-presentation">
                        <i class="fas fa-arrow-left"></i>
                        Back to Projects
                    </button>
                    <div class="presentation-close">×</div>
                </div>
                <div class="slides-container" id="slides-container">
                    ${slidesHTML}
                </div>
                <div class="slide-counter" id="slide-counter">
                    1 of ${project.slides.length}
                </div>
            </div>
        `;

        // عرض المودال الجديد
        presentationModal.style.display = "block";
        setTimeout(() => {
            presentationModal.classList.add("show-modal");
        }, 50);

        // إعداد العداد والتمرير
        const slidesContainer = document.getElementById("slides-container");
        const slideCounter = document.getElementById("slide-counter");
        
        function updateSlideCounter() {
            const slides = slidesContainer.querySelectorAll(".slide-item");
            const containerHeight = slidesContainer.clientHeight;
            const scrollTop = slidesContainer.scrollTop;
            
            let currentSlide = 1;
            slides.forEach((slide, index) => {
                const slideTop = slide.offsetTop - slidesContainer.offsetTop;
                const slideBottom = slideTop + slide.offsetHeight;
                const viewportCenter = scrollTop + containerHeight / 2;
                
                if (viewportCenter >= slideTop && viewportCenter <= slideBottom) {
                    currentSlide = index + 1;
                }
            });
            
            slideCounter.textContent = `${currentSlide} of ${project.slides.length}`;
        }

        // تحديث العداد عند التمرير
        slidesContainer.addEventListener("scroll", updateSlideCounter);
        
        // تحديث العداد عند التحميل
        setTimeout(updateSlideCounter, 100);

        // إعداد أزرار التحكم
        const backButton = presentationModal.querySelector(".back-to-projects-presentation");
        const closeButton = presentationModal.querySelector(".presentation-close");

        backButton.addEventListener("click", () => {
            presentationModal.classList.remove("show-modal");
            setTimeout(() => {
                presentationModal.style.display = "none";
                showProjectList(category);
            }, 400);
        });

        closeButton.addEventListener("click", () => {
            presentationModal.classList.remove("show-modal");
            setTimeout(() => {
                presentationModal.style.display = "none";
            }, 400);
        });

        // إغلاق عند النقر خارج المحتوى
        presentationModal.addEventListener("click", (e) => {
            if (e.target === presentationModal) {
                presentationModal.classList.remove("show-modal");
                setTimeout(() => {
                    presentationModal.style.display = "none";
                }, 400);
            }
        });
    }

   function showProjectDetails(category, projectIndex) {
    const data = portfolioData[category];
    const project = data.items[projectIndex];
    if (!project) return;

    modalTitle.textContent = project.title;

    let htmlContent = `
        <button id="back-to-projects-btn" class="btn btn-primary" style="margin-bottom: 20px;">
            <i class="fas fa-arrow-left"></i> Back to Projects
        </button>
        <p style="color: #ccc; margin-bottom: 10px; font-size: 1rem;">${project.description}</p>
        <p style="color: #999; margin-bottom: 20px; font-size: 0.9rem;"><strong>Tools:</strong> ${project.tools}</p>
        <div class="project-images-container">
            <div class="gallery-progress">1 of ${project.images?.length || 0}</div>
            <div class="gallery-grid project-images-grid" style="display: flex; overflow-x: auto; gap: 15px; padding-bottom: 10px;">
                ${project.images && project.images.length > 0 ?
                    project.images.map(img => `
                        <div class="gallery-item" style="flex: 0 0 30%; max-width:400px;min-width:250px;">
                            <img src="${img}" alt="${project.title}" class="gallery-image" style="width:100%; height:auto;border-radius:8px;" loading="lazy">
                        </div>
                    `).join("") :
                    "<div class=\"gallery-placeholder\"><i class=\"fas fa-image\"></i> No images available</div>"
                }
            </div>
            ${project.images && project.images.length > 100?
                `<button id="show-more-images-btn" class="btn btn-primary" style="margin: 20px auto; display: block;">Show More</button>` : ""
            }
        </div>
    `;
    
    modal.style.display = "block";
    void modal.offsetWidth;
    modal.classList.add("show-modal");
    
    updateContentWithFade(modalGallery, htmlContent, () => {
        const imagesGrid = modalGallery.querySelector(".project-images-grid");
        const progressIndicator = modalGallery.querySelector(".gallery-progress");

        if (imagesGrid && progressIndicator && project.images?.length > 0) {
            // تحديث العداد عند التحميل أولاً
            updateImageCounter();
            
            // تحديث العداد عند التمرير
            imagesGrid.addEventListener('scroll', updateImageCounter);
            
            function updateImageCounter() {
                const scrollPos = imagesGrid.scrollLeft;
                const imgWidth = imagesGrid.querySelector('.gallery-item')?.offsetWidth || 0;
                const gap = 15; // يجب أن يتطابق مع الفجوة في CSS
                const currentImage = Math.round(scrollPos / (imgWidth + gap)) + 1;
                progressIndicator.textContent = `${currentImage} of ${project.images.length}`;
            }
        }

        const showMoreBtn = modalGallery.querySelector("#show-more-images-btn");
        if (showMoreBtn) {
            showMoreBtn.addEventListener("click", () => {
                imagesGrid.innerHTML = project.images.map(img => `
                    <div class="gallery-item" style="flex: 0 0 300px;">
                        <img src="${img}" alt="${project.title}" class="gallery-image" style="width:100%; border-radius:8px;" loading="lazy">
                    </div>
                `).join("");
                showMoreBtn.style.display = "none";
            });
        }

        document.getElementById("back-to-projects-btn").addEventListener("click", () => {
            showProjectList(category);
        });
    });
}
    // Close modal
    closeModal.addEventListener("click", () => {
        modal.classList.remove("show-modal");
        const modalTransitionDuration = parseFloat(getComputedStyle(modal).transitionDuration) * 1000;
        setTimeout(() => {
            modal.style.display = "none";
        }, modalTransitionDuration);
    });

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.classList.remove("show-modal");
            const modalTransitionDuration = parseFloat(getComputedStyle(modal).transitionDuration) * 1000;
            setTimeout(() => {
                modal.style.display = "none";
            }, modalTransitionDuration);
        }
    });

    /* ================================================== */
    /* HORIZONTAL SCROLLING CERTIFICATES (NEW CODE START) */
    /* ================================================== */
    
    // 1. Get all required elements
    const certsTrack = document.querySelector(".certificates-track");
    const scrollLeftBtn = document.querySelector(".scroll-left");
    const scrollRightBtn = document.querySelector(".scroll-right");

    // Only run if the certificates section exists
    if (certsTrack && scrollLeftBtn && scrollRightBtn) {
        
        // 2. Scroll button click handlers
        scrollLeftBtn.addEventListener("click", () => {
            certsTrack.scrollBy({
                left: -300, // Scrolls 300px to the left
                behavior: "smooth" // Smooth animation
            });
        });

        scrollRightBtn.addEventListener("click", () => {
            certsTrack.scrollBy({
                left: 300, // Scrolls 300px to the right
                behavior: "smooth"
            });
        });

        // 3. Auto-hide buttons when at scroll boundaries
        const checkScrollButtons = () => {
            // Hide left button if at start
            scrollLeftBtn.classList.toggle(
                "hidden", 
                certsTrack.scrollLeft === 0
            );
            
            // Hide right button if at end (with 10px tolerance)
            scrollRightBtn.classList.toggle(
                "hidden",
                certsTrack.scrollLeft + certsTrack.clientWidth >= certsTrack.scrollWidth - 10
            );
        };

        // 4. Initial check and scroll event listener
        checkScrollButtons(); // Run once on load
        certsTrack.addEventListener("scroll", checkScrollButtons); // Run on scroll

        // 5. Recheck on window resize (responsive adjustment)
        window.addEventListener("resize", checkScrollButtons);

        // Handle certificate clicks to open in new tab
        document.querySelectorAll('.certificate-item a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default modal behavior
                window.open(link.href, '_blank'); // Open link in new tab
            });
        });
    }

    // Navbar background on scroll
    window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 100) {
            navbar.style.background = "rgba(10, 10, 10, 0.8)";
            navbar.style.backdropFilter = "blur(12px)";
        } else {
            navbar.style.background = "rgba(10, 10, 10, 0.6)";
            navbar.style.backdropFilter = "blur(8px)";
        }
    });
}); // END of DOMContentLoaded


