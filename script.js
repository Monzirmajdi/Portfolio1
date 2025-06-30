// وظائف الصفحة الرئيسية
document.addEventListener("DOMContentLoaded", () => {
    // ------ القائمة المتنقلة ------
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

    // ------ شريط المهارات المتحرك ------
    const skillBars = document.querySelectorAll('.skill-level');
    if (skillBars.length > 0) {
        const animateSkillBars = () => {
            skillBars.forEach(bar => {
                const progress = bar.querySelector('.skill-progress');
                progress.style.width = bar.getAttribute('data-level');
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(document.querySelector('#about'));
    }

    // ------ تغيير عنوان الشريط العلوي ------
    const navLogoSpan = document.querySelector(".nav-logo span");
    const sections = document.querySelectorAll("section[id]");
    const sectionTitles = {
        "home": "Home",
        "about": "About",
        "portfolio": "Portfolio", 
        "contact": "Contact"
    };

    function updateNavLogoTitle() {
        let currentSectionId = "home";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 100 && 
                window.scrollY < sectionTop + section.clientHeight - 100) {
                currentSectionId = section.id;
            }
        });
        if (navLogoSpan) navLogoSpan.textContent = sectionTitles[currentSectionId];
    }

    updateNavLogoTitle();
    window.addEventListener("scroll", updateNavLogoTitle);

    // ------ تأثير الكتابة التلقائي ------
    const heroSubtitle = document.querySelector(".hero-subtitle");
    if (heroSubtitle) {
        heroSubtitle.textContent = "";
        heroSubtitle.style.opacity = 1;
        
        const textToType = "Graphic Designer & Visual Artist";
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < textToType.length) {
                heroSubtitle.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 70);
            }
        }
        typeWriter();
    }

    // ------ تبديل الوضع الليلي/النهاري ------
    const themeToggle = document.querySelector(".theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle('light-mode');
            const icon = themeToggle.querySelector("i");
            const isLight = document.body.classList.contains('light-mode');
            
            icon.classList.replace(isLight ? 'fa-moon' : 'fa-sun', 
                                 isLight ? 'fa-sun' : 'fa-moon');
            localStorage.setItem('page-theme', isLight ? 'light' : 'dark');
        });

        if (localStorage.getItem('page-theme') === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.querySelector("i").classList.replace('fa-moon', 'fa-sun');
        }
    }

    // ------ معرض الأعمال ------
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
              /* {
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
                },*/
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
            items: [
             /*   {
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
               

    function updateContentWithFade(element, newHTML, callback) {
        element.style.opacity = 0;
        setTimeout(() => {
            element.innerHTML = newHTML;
            element.style.opacity = 1;
            if (callback) callback();
        }, 300);
    }

    function showProjectList(category) {
        const data = portfolioData[category];
        if (!data) return;

        let htmlContent = data.items.length === 0 ? `
            <div class="empty-category">
                <i class="fas fa-folder-open"></i>
                <h3>No projects yet</h3>
            </div>
        ` : `
            <div class="modal-gallery-grid">
                ${data.items.map((item, index) => `
                    <div class="project-card" data-category="${category}" data-index="${index}">
                        <div class="image-container">
                            <img src="${item.previewImage}" alt="${item.title}" loading="lazy">
                        </div>
                        <div class="project-info">
                            <h3>${item.title}</h3>
                            <p>${item.description.substring(0, 60)}...</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        modalTitle.textContent = data.title;
        modal.style.display = "block";
        updateContentWithFade(modalGallery, htmlContent, () => {
            document.querySelectorAll(".project-card").forEach(card => {
                card.addEventListener("click", () => {
                    showProjectDetails(
                        card.dataset.category, 
                        parseInt(card.dataset.index)
                    );
                });
            });
        });
    }

    function showProjectDetails(category, projectIndex) {
        const project = portfolioData[category]?.items[projectIndex];
        if (!project) return;

        const htmlContent = `
            <button id="back-to-projects-btn" class="btn btn-primary">
                <i class="fas fa-arrow-left"></i> Back to Projects
            </button>
            <p>${project.description}</p>
            <p><strong>Tools:</strong> ${project.tools}</p>
            <div class="project-images-container">
                ${project.images?.length ? `
                    <div class="gallery-grid">
                        ${project.images.map(img => `
                            <div class="gallery-item">
                                <img src="${img}" alt="${project.title}" loading="lazy">
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <div class="gallery-placeholder">
                        <i class="fas fa-image"></i> No images available
                    </div>
                `}
            </div>
        `;

        modalTitle.textContent = project.title;
        updateContentWithFade(modalGallery, htmlContent, () => {
            document.getElementById("back-to-projects-btn").addEventListener("click", () => {
                showProjectList(category);
            });
        });
    }

    // أحداث النوافذ المنبثقة
    closeModal.addEventListener("click", () => {
        modal.style.opacity = 0;
        setTimeout(() => modal.style.display = "none", 300);
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.opacity = 0;
            setTimeout(() => modal.style.display = "none", 300);
        }
    });

    document.querySelectorAll(".card-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            showProjectList(e.target.closest(".portfolio-category").dataset.category);
        });
    });
});

// تأثير الشريط العلوي عند التمرير
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    navbar.style.background = window.scrollY > 100 
        ? "rgba(10, 10, 10, 0.8)" 
        : "rgba(10, 10, 10, 0.6)";
    navbar.style.backdropFilter = window.scrollY > 100 
        ? "blur(12px)" 
        : "blur(8px)";
});
