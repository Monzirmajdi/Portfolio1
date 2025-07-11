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
        // أضف هذا الكود في ملف script.js داخل event listener لـ DOMContentLoaded

// Animation for skill bars
const skillBars = document.querySelectorAll('.skill-level');
if (skillBars.length > 0) {
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const progress = bar.querySelector('.skill-progress');
            const level = bar.getAttribute('data-level');
            progress.style.width = level;
        });
    };

    // Trigger animation when section is in view
    const aboutSection = document.querySelector('#about');
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
    }

    // Dynamic Navbar Title on Scroll (تم نقل هذا الجزء هنا)
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

    // Typing effect for Hero Subtitle (تم إضافة هذا الجزء هنا)
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

    // Theme toggle functionality (تم دمجها هنا)
    const themeToggle = document.querySelector(".theme-toggle");
    const body = document.body;

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const icon = themeToggle.querySelector("i");
            body.classList.toggle('light-mode');
            if (body.classList.contains('light-mode')) {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('page-theme', 'light');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('page-theme', 'dark');
            }
        });

        // تحميل التفضيل المحفوظ عند بدء التشغيل
        if (localStorage.getItem('page-theme') === 'light') {
            body.classList.add('light-mode');
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
    }

    // Portfolio Modal Functionality (هذا الجزء كان موجوداً بالفعل وتم الاحتفاظ به)
    const modal = document.getElementById("portfolio-modal");
    const closeModal = document.querySelector(".modal .close");
    const modalTitle = document.getElementById("modal-title");
    const modalGallery = document.getElementById("modal-gallery");

    // دالة لتحديث المحتوى بسلاسة
    // في الجزء الخاص بـ updateContentWithFade، استبدل الدالة بالكود التالي:
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

// في الجزء الخاص بـ showProjectList، تأكد من إزالة معالج الأحداث القديم قبل إضافة الجديد:
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
    
    // إزالة أي معالجات أحداث موجودة مسبقاً
    const oldGallery = modalGallery.cloneNode(false);
    modalGallery.parentNode.replaceChild(oldGallery, modalGallery);
    modalGallery = oldGallery;
    
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
               /* {
                    title: "Unilab - شركة تبيع المستلزمات و الأجهزة الطبية",
                    description: " تصميم هوية بصرية لشركة يوني لاب للأجهزة و المعدات الطبية ",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_0.webp",
                    images: ["images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_0.webp",
                             "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_1.webp", 
                             "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_10.webp", 
                             "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_11.webp",
                             "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_12.webp", 
                             "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_13.webp", 
                             "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_14.webp", 
                             "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_2.webp", 
                             "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_3.webp", 
                             "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_4.webp", 
                             "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_5.webp",
                             "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_6.webp",
                             "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_7.webp",
                             "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_8.webp",
                             "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_9.webp"]
                }, */
                 {
                    title: "Khubza - فرن لبناني",
                    description: "تصميم هوية بصرية لفرن لبناني يبيع منتجات عالية الجودة",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/Branding/Khobza/Untitled17 (2).webp",
                    images: ["images/Branding/Khobza/Untitled17 (2).webp",
                             "images/Branding/Khobza/Untitled18_20250706230541 (2).webp", 
                             "images/Branding/Khobza/Untitled18_20250706230723 (2).webp",  
                             "images/Branding/Khobza/Untitled18_20250706231107 (2).webp"]
                }, 
                {
                    title: "MARVELOUS - متجر لبيع  لعب مارفل و ديزني",
                    description: "تصميم هوية بصرية لمتجر يبيع لعب مارفل و ديزني",
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
                    description: "تصميم هوية بصرية لمتجر يبيع القهوة العربية",
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
                },
                {
                    title: "Landing Page Design",
                    description: "High-converting landing page layouts",
                    tools: "Figma, Photoshop",
                    previewImage: "images/placeholder.png",
                    images: []
                }*/
            ]
        },
        "brand-presentation": {
            title: "Brand Presentation",
            items: [
                {
                    title: "Unilab Medical Equipment",
                    description: "Complete brand identity presentation for medical equipment company showcasing logo design, color palette, typography, and brand applications",
                    tools: "Adobe Illustrator, Adobe InDesign, Adobe Photoshop",
                    previewImage: "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_0.webp",
                    slides: [
                        "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_0.webp",
                        "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_1.webp",
                        "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_2.webp",
                        "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_3.webp",
                        "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_4.webp",
                        "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_5.webp",
                        "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_6.webp",
                        "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_7.webp",
                        "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_8.webp",
                        "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_9.webp",
                        "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_10.webp",
                        "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_11.webp",
                        "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_12.webp",
                        "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_13.webp",
                        "images/Branding/Unilab/_storage_emulated_0_Android_data_com.adobe.reader_files_Pictures_Adobe Acrobat Exports_unilab Brand Identity presentation_14.webp"
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

    let currentCategory = null;

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
                     onerror="this.src='images/placeholder.png'">
            </div>
        `).join("");

        presentationModal.innerHTML = `
            <div class="brand-presentation-content">
                <div class="presentation-controls">
                    <button class="back-to-projects-presentation">
                        <i class="fas fa-arrow-left"></i>
                        Back to Projects
                    </button>
                    <h2 class="presentation-title">${project.title}</h2>
                    <div class="presentation-close">
                        <i class="fas fa-times"></i>
                    </div>
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

    // إضافة الوظائف التي كانت خارج DOMContentLoaded هنا
    // Navbar background on scroll - هذا الجزء كان موجوداً بالفعل ولكن خارج الـ DOMContentLoaded الرئيسي
    // تم نقله إلى بداية الملف (بالتحديد، سيتم استبداله بالـ window.addEventListener("scroll") الذي بالأسفل)
});

// هذا الجزء سيتم إزالته أو دمجه
// Navbar background on scroll (هذا كان موجوداً ككتلة منفصلة)
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
