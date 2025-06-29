// جميع الأحداث المتعلقة بتحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    // دالة Throttle لتحسين الأداء
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const context = this;
            const args = arguments;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // قائمة الهامبرجر
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            
            // تحسينات للوصولية
            const isExpanded = navMenu.classList.contains("active");
            hamburger.setAttribute("aria-expanded", isExpanded);
        });

        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
        }));
    }

    // تغيير عنوان النافبار عند التمرير
    const navLogoSpan = document.querySelector(".nav-logo span");
    const sections = document.querySelectorAll("section[id]");
    const sectionPositions = [];

    const sectionTitles = {
        "home": "Home",
        "about": "About",
        "portfolio": "Portfolio",
        "contact": "Contact"
    };

    // حساب مواقع الأقسام مرة واحدة
    function calculateSectionPositions() {
        sectionPositions.length = 0; // إفراغ المصفوفة أولاً
        sections.forEach(section => {
            sectionPositions.push({
                id: section.id,
                top: section.offsetTop,
                height: section.clientHeight
            });
        });
    }

    // تحديث عنوان الشريط بناء على المواقع المحفوظة
    function updateNavLogoTitle() {
        let currentSectionId = "home";
        const scrollPosition = window.scrollY + 100;

        sectionPositions.forEach(section => {
            if (scrollPosition >= section.top && scrollPosition < section.top + section.height) {
                currentSectionId = section.id;
            }
        });

        if (navLogoSpan) {
            navLogoSpan.textContent = sectionTitles[currentSectionId];
        }
    }

    // حساب المواقع أول مرة وعند تغيير حجم النافذة
    calculateSectionPositions();
    window.addEventListener('resize', throttle(calculateSectionPositions, 200));

    // استدعاء الدالة عند التحميل والتمرير مع تطبيق Throttle
    updateNavLogoTitle();
    window.addEventListener("scroll", throttle(updateNavLogoTitle, 100));

    // تأثير الكتابة في قسم البطل
    const heroSubtitle = document.querySelector(".hero-subtitle");
    const textToType = "Graphic Designer & Visual Artist";
    let charIndex = 0;
    let isTypingComplete = false;

    if (heroSubtitle) {
        heroSubtitle.textContent = "";
        heroSubtitle.style.opacity = 1;
        heroSubtitle.style.animation = 'none';
        typeWriter();
    }

    function typeWriter() {
        if (!isTypingComplete && charIndex < textToType.length) {
            heroSubtitle.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 70);
        } else {
            isTypingComplete = true;
        }
    }

    // تبديل الوضع الليلي والنهاري
    const themeToggle = document.querySelector(".theme-toggle");
    const body = document.body;

    if (themeToggle) {
        const updateThemeIcon = () => {
            const icon = themeToggle.querySelector("i");
            if (body.classList.contains('light-mode')) {
                icon.classList.replace('fa-moon', 'fa-sun');
                icon.setAttribute('aria-label', 'Switch to dark mode');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                icon.setAttribute('aria-label', 'Switch to light mode');
            }
        };

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            body.classList.add('light-mode');
            localStorage.setItem('page-theme', 'light');
        }

        if (localStorage.getItem('page-theme') === 'light') {
            body.classList.add('light-mode');
        }

        updateThemeIcon();

        themeToggle.addEventListener("click", () => {
            body.classList.toggle('light-mode');
            const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('page-theme', theme);
            updateThemeIcon();
            
            // تحسين انتقال تغيير الثيم
            document.documentElement.style.transition = 'background-color 0.5s ease, color 0.3s ease';
            setTimeout(() => {
                document.documentElement.style.transition = '';
            }, 500);
        });

        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
            if (e.matches) {
                body.classList.add('light-mode');
                localStorage.setItem('page-theme', 'light');
            } else {
                body.classList.remove('light-mode');
                localStorage.setItem('page-theme', 'dark');
            }
            updateThemeIcon();
        });
    }

    // Intersection Observer لتحميل العناصر عند الظهور
    const lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                lazyLoadObserver.unobserve(img);
            }
        });
    }, { threshold: 0.1 });

    // تفعيل Lazy Loading للصور
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        img.dataset.src = img.src;
        img.src = '';
        lazyLoadObserver.observe(img);
        
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });

    // Observer لأشرطة تقدم المهارات
    const skillsProgress = document.querySelector('.skills-progress');
    if (skillsProgress) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.progress').forEach(bar => {
                        const width = bar.parentElement.previousElementSibling.querySelector('span').textContent;
                        bar.style.width = width;
                    });
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        skillsObserver.observe(skillsProgress);
    }

    // Observer للعناصر العامة
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Preload لصور المعرض
    function preloadGalleryImages(images) {
        images.forEach(imgSrc => {
            const img = new Image();
            img.src = imgSrc;
        });
    }

    // بيانات المشاريع
    const portfolioData = {
        "social-media": {
            title: "Social Media Design",
            items: [
                {
                    title: "Baseline Medical",
                    description: "Social media ads for Baseline Medical page",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/Social-media/Baseline/Untitled102_20250402071023_HK435gQb2B_UuiM0m0B3k.webp",
                    images: ["images/Social-media/Baseline/Untitled102_20250402071023_HK435gQb2B_UuiM0m0B3k.webp", 
                             "images/Social-media/Baseline/Untitled106_20250405034447_Cl15GOrO8V_CPIHi0WE8y.webp", 
                             "images/Social-media/Baseline/Untitled107_20250404064546_vVMow1vi0g_c1Reykj31P.webp", 
                             "images/Social-media/Baseline/Untitled115_20250410034107_MG4jGZKc4G_DcqjoRFW50.webp", 
                             "images/Social-media/Baseline/Untitled116_20250410122545_UyxJ6Uu43k_BlO2apFk6X.webp", 
                             "images/Social-media/Baseline/Untitled120_20250416181851_RLRcqULf7T_Xc6f889q8n.webp", 
                             "images/Social-media/Baseline/Untitled141_20250509072843_rNTgZjrw5v_eMvMMrQc2v.webp", 
                             "images/Social-media/Baseline/Untitled148_20250519081941_PrFN3uLO5B_pLTSooTW3C.webp", 
                             "images/Social-media/Baseline/Untitled148_20250519082112_XYVTTSpm3u_H9cERuBc9Z.webp", 
                             "images/Social-media/Baseline/Untitled149_Restored_20250520022900_OgwbOoZk4r_cqNkq3rX5M.webp", 
                             "images/Social-media/Baseline/Untitled150_20250607161313_PIkd3DHX2S_NxVyUull2f.webp", 
                             "images/Social-media/Baseline/Untitled169 (1)_CNyjEGoT8O_6IYibalO29.webp"]
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
                }
            ]
        },
        "branding": {
            title: "Brand Identity & Logos",
            items: [
                {
                    title: "Ratina - براند سوداني للطرح والمنتجات التجميلية",
                    description: "تصميم هوية بصرية لبراند سوداني للطرح والمنتجات التجميلية",
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
                    description: "تصميم هوية بصرية لبراند سوداني للاكسسوارات الفضة",
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
            title: "UI/UX Design",
            items: []
        }
    };

    // وظائف نافذة المشاريع
    const modal = document.getElementById("portfolio-modal");
    const closeModal = document.querySelector(".modal .close");
    const modalTitle = document.getElementById("modal-title");
    const modalGallery = document.getElementById("modal-gallery");

    function updateContentWithFade(element, newHTML, callback) {
        element.style.opacity = 0;
        element.style.pointerEvents = 'none';
        
        setTimeout(() => {
            element.innerHTML = newHTML;
            element.style.opacity = '';
            element.style.pointerEvents = '';
            
            setTimeout(() => {
                if (callback) callback();
            }, 50);
        }, 300);
    }

    // عرض قائمة المشاريع
    function showProjectList(category) {
        const data = portfolioData[category];
        if (!data) return;

        // Preload الصور قبل العرض
        data.items.forEach(item => {
            preloadGalleryImages(item.images);
        });

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
                             onerror="this.src='images/placeholder.png'"
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
                    showProjectDetails(cat, idx);
                });
            });
        });
    }

    // عرض تفاصيل المشروع
    function showProjectDetails(category, projectIndex) {
        const data = portfolioData[category];
        const project = data.items[projectIndex];
        if (!project) return;

        // Preload جميع صور المشروع
        preloadGalleryImages(project.images);

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
                ${project.images && project.images.length > 20 ?
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
                updateImageCounter();
                imagesGrid.addEventListener('scroll', throttle(updateImageCounter, 100));
                
                function updateImageCounter() {
                    const scrollPos = imagesGrid.scrollLeft;
                    const imgWidth = imagesGrid.querySelector('.gallery-item')?.offsetWidth || 0;
                    const gap = 15;
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

    // إغلاق النافذة
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

    // عرض معاينات البطاقات
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

    // فتح نافذة المشاريع عند النقر
    document.querySelectorAll(".card-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const category = e.target.closest(".portfolio-category").dataset.category;
            showProjectList(category);
        });
    });
});

// تأثير التمرير على النافبار
window.addEventListener("scroll", throttle(() => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
        navbar.style.background = "rgba(10, 10, 10, 0.8)";
        navbar.style.backdropFilter = "blur(12px)";
    } else {
        navbar.style.background = "rgba(10, 10, 10, 0.6)";
        navbar.style.backdropFilter = "blur(8px)";
    }
}, 100));
