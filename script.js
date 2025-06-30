// وظيفة قائمة الهامبرغر وجميع السكريبتات الأخرى المتعلقة بتحميل DOM
document.addEventListener("DOMContentLoaded", () => {
    // قائمة الهامبرغر
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

    // وظيفة تبديل الوضع (فاتح/داكن)
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

    // عنوان شريط التنقل الديناميكي عند التمرير
    const navLogoSpan = document.querySelector(".nav-logo span");
    const sections = document.querySelectorAll("section[id]");

    const sectionTitles = {
        "home": "Home",
        "about": "About",
        "portfolio": "Portfolio",
        "contact": "Contact"
    };

    function updateNavLogoTitle() {
        let currentSectionId = "home"; // الافتراضي هو الصفحة الرئيسية

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

    // تأثير الكتابة لعنوان البطل الفرعي
    const heroSubtitle = document.querySelector(".hero-subtitle");
    const textToType = "Graphic Designer & Visual Artist";
    let charIndex = 0;
    let isTypingComplete = false;

    if (heroSubtitle) {
        heroSubtitle.textContent = ""; // ابدأ بنص فارغ
        heroSubtitle.style.opacity = 1; // اجعله مرئياً
        heroSubtitle.style.animation = "none"; // أوقف الـ fadeInUp إذا كان يتعارض
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

    // تحريك أشرطة المهارات
    const skillBars = document.querySelectorAll(".skill-level");
    if (skillBars.length > 0) {
        const animateSkillBars = () => {
            skillBars.forEach(bar => {
                const progress = bar.querySelector(".skill-progress");
                const level = bar.getAttribute("data-level");
                progress.style.width = level;
            });
        };

        // تشغيل التحريك عندما يكون القسم مرئيًا
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

    // بيانات الأعمال
    const portfolioData = {
        "social-media": {
            title: "تصميم وسائل التواصل الاجتماعي",
            items: [
                {
                    title: "Baseline Medical",
                    description: "إعلانات وسائل التواصل الاجتماعي لصفحة Baseline Medical",
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
                    title: "خمرة",
                    description: "إعلان وسائل التواصل الاجتماعي لعطر سوداني محلي",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/Social-media/Khomra/1000004769_A22mea5b06_qG6cn5Fd2r.webp",
                    images: ["images/Social-media/Khomra/1000004769_A22mea5b06_qG6cn5Fd2r.webp", 
                             "images/Social-media/Khomra/1000004767_NtGk94AQ8p.webp", 
                             "images/Social-media/Khomra/1000004768_jNCdAheZ0X.webp"]
                },
                {
                    title: "تصاميم وسائل التواصل الاجتماعي",
                    description: "تصاميم وسائل التواصل الاجتماعي مختلطة لعلامات تجارية حقيقية وخيالية",
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
            title: "هوية العلامة التجارية والشعارات",
            items: [
                {
                    title: "راتينا - علامة تجارية سودانية للطرح ومنتجات التجميل",
                    description: "تصميم هوية بصرية لعلامة تجارية سودانية للطرح ومنتجات التجميل",
                    tools: "Adobe Illustrator, Adobe Photoshop",
                    previewImage: "images/Branding/Ratina/Untitled182_20250605061344_CvWhFKhQ4Q.webp",
                    images: ["images/Branding/Ratina/Untitled182_20250605061344_CvWhFKhQ4Q.webp", 
                             "images/Branding/Ratina/Untitled183_a66VRPGx8P.webp", 
                             "images/Branding/Ratina/Untitled184_20250605062347_cyR4cyNw8B.webp", 
                             "images/Branding/Ratina/Untitled181_20250605061101_BGUEtEPg0Y.webp", 
                             "images/Branding/Ratina/Untitled180_20250605060456_vryLtoMw0E.webp"]
                }, 
                {
                    title: "Sa Stainless Steel - علامة تجارية سودانية لإكسسوارات الفضة والستانلس ستيل",
                    description: "تصميم هوية بصرية لعلامة تجارية سودانية لإكسسوارات الفضة",
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
            title: "تصميم واجهة المستخدم/تجربة المستخدم",
            items: [
                // يمكن إضافة عناصر هنا لاحقًا
            ]
        }
    };

    // دالة لملء معاينات البطاقات
    function populateCardPreviews() {
        document.querySelectorAll(".portfolio-category").forEach(categoryDiv => {
            const previewContainer = categoryDiv.querySelector(".card-preview");
            previewContainer.innerHTML = ""; // مسح المحتوى الحالي

            const category = categoryDiv.dataset.category;
            const data = portfolioData[category];

            if (data && data.items.length > 0) {
                // عرض أول 3 صور معاينة أو أقل إذا كانت المشاريع أقل
                for (let i = 0; i < Math.min(3, data.items.length); i++) {
                    const item = data.items[i];
                    const img = document.createElement("img");
                    img.src = item.previewImage;
                    img.alt = item.title;
                    img.classList.add("preview-item");
                    previewContainer.appendChild(img);
                }
            } else {
                // عرض عناصر نائبة إذا لم تكن هناك مشاريع
                for (let i = 0; i < 3; i++) {
                    const placeholder = document.createElement("div");
                    placeholder.classList.add("preview-item", "gallery-placeholder");
                    placeholder.innerHTML = 
                        `<i class="fas fa-image"></i>`;
                    previewContainer.appendChild(placeholder);
                }
            }
        });
    }

    // استدعاء الدالة عند تحميل الصفحة
    populateCardPreviews();

    // وظيفة نافذة الأعمال المنبثقة
    const modal = document.getElementById("portfolio-modal");
    const closeModal = document.querySelector(".modal .close");
    const modalTitle = document.getElementById("modal-title");
    let modalGallery = document.getElementById("modal-gallery");

    // دالة لتحديث المحتوى بسلاسة
    function updateContentWithFade(element, newHTML, callback) {
        element.style.opacity = 0;
        element.style.pointerEvents = "none"; // تعطيل التفاعلات أثناء الانتقال
        
        setTimeout(() => {
            element.innerHTML = newHTML;
            element.style.opacity = "";
            element.style.pointerEvents = ""; // إعادة تمكين التفاعلات
            
            // إضافة انتقال سلس للظهور
            setTimeout(() => {
                if (callback) callback();
            }, 50); // تأخير بسيط لضمان تطبيق التغييرات
        }, 300); // يتناسب مع مدة الانتقال في CSS
    }

    // عرض قائمة المشاريع
    function showProjectList(category) {
        const data = portfolioData[category];
        if (!data) return;

        modalTitle.textContent = data.title;

        let htmlContent = "";
        if (data.items.length === 0) {
            htmlContent = `
                <div class="empty-category">
                    <i class="fas fa-folder-open"></i>
                    <h3>لا توجد مشاريع بعد</h3>
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

    // عرض تفاصيل المشروع
    function showProjectDetails(category, index) {
        const item = portfolioData[category].items[index];
        if (!item) return;

        modalTitle.textContent = item.title;

        let imagesHtml = "";
        if (item.images && item.images.length > 0) {
            imagesHtml = item.images.map(imgSrc => `
                <div class="gallery-item">
                    <img src="${imgSrc}" alt="${item.title}" class="gallery-image" loading="lazy">
                </div>
            `).join("");
        } else {
            imagesHtml = `
                <div class="gallery-placeholder">
                    <i class="fas fa-image"></i>
                    <h3>لا توجد صور لهذا المشروع</h3>
                </div>
            `;
        }

        const detailsHtml = `
            <div class="project-details">
                <p><strong>الوصف:</strong> ${item.description}</p>
                <p><strong>الأدوات:</strong> ${item.tools}</p>
                <div class="project-images-container">
                    <h4>الصور:</h4>
                    <div class="project-images-grid">
                        ${imagesHtml}
                    </div>
                </div>
                <button id="back-to-projects-btn">العودة إلى المشاريع</button>
            </div>
        `;

        updateContentWithFade(modalGallery, detailsHtml, () => {
            const backButton = document.getElementById("back-to-projects-btn");
            if (backButton) {
                backButton.addEventListener("click", () => showProjectList(category));
            }
        });
    }

    // فتح النافذة المنبثقة عند النقر على بطاقة الفئة
    document.querySelectorAll(".portfolio-category .card-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const category = e.currentTarget.closest(".portfolio-category").dataset.category;
            showProjectList(category);
        });
    });

    // إغلاق النافذة المنبثقة
    if (closeModal) {
        closeModal.addEventListener("click", () => {
            modal.classList.remove("show-modal");
            setTimeout(() => {
                modal.style.display = "none";
            }, 300); // يتناسب مع مدة الانتقال في CSS
        });
    }

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.classList.remove("show-modal");
            setTimeout(() => {
                modal.style.display = "none";
            }, 300); // يتناسب مع مدة الانتقال في CSS
        }
    });

    // معالجة إرسال نموذج الاتصال
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("تم إرسال رسالتك بنجاح!"); // يمكن استبدال هذا بمعالجة AJAX حقيقية
            contactForm.reset();
        });
    }
});


