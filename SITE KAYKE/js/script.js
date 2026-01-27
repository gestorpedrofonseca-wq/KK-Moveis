// Initialize Global Data
let siteData = getSiteData();

function initPage() {
    renderBanners();
    renderCategories();
    renderProducts();
    renderAbout();
    renderFooter();
    initSwiper();
}

function initSwiper() {
    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 1200,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            init: function () {
                animateHeroText(this);
            },
            slideChange: function () {
                animateHeroText(this);
            }
        }
    });
}

function animateHeroText(swiper) {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const texts = activeSlide.querySelectorAll('.animate-text');

    swiper.slides.forEach(slide => {
        if (slide !== activeSlide) {
            gsap.set(slide.querySelectorAll('.animate-text'), { opacity: 0, y: 30 });
        }
    });

    gsap.fromTo(texts,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: "power3.out", delay: 0.5 }
    );
}

function renderBanners() {
    const wrapper = document.getElementById('hero-wrapper');
    wrapper.innerHTML = siteData.banners.map(banner => `
        <div class="swiper-slide hero-slide" style="background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${banner.image}');">
            <div class="container hero-content">
                <h2 class="animate-text">${banner.title}</h2>
                <p class="animate-text">${banner.text}</p>
                <a href="${banner.link}" class="btn btn-gold animate-text">${banner.buttonText}</a>
            </div>
        </div>
    `).join('');
}

function renderCategories() {
    const grid = document.getElementById('categories-grid');
    grid.innerHTML = siteData.categories.map((cat, index) => {
        const num = (index + 1).toString().padStart(2, '0');
        return `
            <div class="category-card" style="background-image: url('${cat.image}');" onclick="filterBySelectedCategory('${cat.name}')">
                <span class="cat-number">${num}</span>
                <div class="category-overlay">
                    <h3>${cat.name}</h3>
                    <span class="view-more">Ver Coleção <i class="fas fa-chevron-right"></i></span>
                </div>
            </div>
        `;
    }).join('');
}

window.filterBySelectedCategory = (categoryName) => {
    // 1. Render products with filter
    renderProducts(categoryName);

    // 2. Update filter buttons active state
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.filter === categoryName) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    // 3. Scroll to products section
    const productsSection = document.getElementById('products');
    window.scrollTo({
        top: productsSection.offsetTop - 80,
        behavior: 'smooth'
    });
};

function renderProducts(filter = 'all') {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    const filteredProducts = filter === 'all'
        ? siteData.products
        : siteData.products.filter(p => p.category === filter);

    filteredProducts.forEach(product => {
        const productHTML = `
            <div class="product-card">
                <a href="product.html?id=${product.id}" class="product-link-wrapper">
                    <div class="product-img">
                        <img src="${product.image}" alt="${product.name}">
                        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                        <div class="product-actions">
                            <span class="btn-product-overlay">Ver Detalhes</span>
                        </div>
                    </div>
                </a>
                <div class="product-info">
                    <a href="product.html?id=${product.id}"><h3>${product.name}</h3></a>
                    <div class="product-price">
                        R$ ${product.price}
                        ${product.oldPrice ? `<span>R$ ${product.oldPrice}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
        productsGrid.innerHTML += productHTML;
    });

    gsap.from(".product-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });
}

function renderAbout() {
    const about = document.getElementById('about');
    const d = siteData.about;
    about.innerHTML = `
        <div class="container about-container">
            <div class="about-image animate-on-scroll">
                <img src="${d.image}" alt="Nossa História">
                <div class="experience-badge">
                    <span class="years">${d.years}</span>
                    <span class="years-text">Anos de Excelência</span>
                </div>
            </div>
            <div class="about-text animate-on-scroll">
                <span class="subtitle">${d.subtitle}</span>
                <h2 class="section-title">${d.title}</h2>
                <div class="gold-divider-start"></div>
                <p class="description">${d.text1}</p>
                <p class="description">${d.text2}</p>
                <p class="description">${d.text3}</p>
            </div>
        </div>
    `;
}

function renderFooter() {
    const footer = document.getElementById('site-footer');
    const c = siteData.contact;
    footer.innerHTML = `
        <div class="container footer-top">
            <div class="footer-info">
                <img src="assets/logo.png" alt="K.K Móveis Logo" class="footer-logo">
                <p>K.K Móveis é sinônimo de luxo, qualidade e durabilidade. Especialistas em transformar casas em lares extraordinários.</p>
                <div class="social-links">
                    <a href="${c.instagram}"><i class="fab fa-instagram"></i></a>
                    <a href="${c.facebook}"><i class="fab fa-facebook"></i></a>
                    <a href="https://wa.me/${c.whatsapp}" target="_blank"><i class="fab fa-whatsapp"></i></a>
                </div>
            </div>
            
            <div class="footer-links">
                <h3>Links Úteis</h3>
                <ul>
                    <li><a href="#home">Início</a></li>
                    <li><a href="#about">Sobre Nós</a></li>
                    <li><a href="#categories">Categorias</a></li>
                    <li><a href="#products">Produtos</a></li>
                </ul>
            </div>
            
            <div class="footer-contact">
                <h3>Onde Estamos</h3>
                <p><i class="fas fa-map-marker-alt"></i> ${c.address}</p>
                <p><i class="fas fa-phone"></i> ${c.phone}</p>
                <p><i class="fas fa-envelope"></i> ${c.email}</p>
            </div>
        </div>
        
        <div class="footer-bottom">
            <div class="container">
                <p>&copy; 2026 K.K Móveis. Todos os direitos reservados.</p>
            </div>
        </div>
    `;

    // Update Floating WhatsApp
    const floatWa = document.querySelector('.float-whatsapp');
    if (floatWa) floatWa.href = `https://wa.me/${c.whatsapp}`;

    // Update Contact Section Button
    const contactBtn = document.querySelector('.btn-whatsapp');
    if (contactBtn) contactBtn.href = `https://wa.me/${c.whatsapp}`;
}

// Global Actions
window.addToCart = (id) => {
    const product = siteData.products.find(p => p.id === id);
    const toast = document.createElement('div');
    toast.style.cssText = `position: fixed; bottom: 20px; right: 20px; background: var(--gold); color: white; padding: 15px 25px; border-radius: 5px; z-index: 9999; box-shadow: 0 5px 15px rgba(0,0,0,0.2);`;
    toast.textContent = "Tenho interesse em: " + product.name;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);

    window.open(`https://wa.me/${siteData.contact.whatsapp}?text=Olá! Tenho interesse no produto: ${product.name} (R$ ${product.price})`);
};

// UI Interactions
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});

const mobileMenu = document.getElementById('mobile-menu');
document.getElementById('mobile-menu-open').addEventListener('click', () => mobileMenu.classList.add('active'));
document.getElementById('mobile-menu-close').addEventListener('click', () => mobileMenu.classList.remove('active'));

document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('active'));
});

// Product Filtering Logic
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelector('.filter-btn.active').classList.remove('active');
        this.classList.add('active');

        const filter = this.dataset.filter;
        renderProducts(filter);
    });
});

// Initial Load
document.addEventListener('DOMContentLoaded', initPage);

// Listen for updates from Admin Panel
window.addEventListener('storage', () => {
    siteData = getSiteData();
    initPage();
});
