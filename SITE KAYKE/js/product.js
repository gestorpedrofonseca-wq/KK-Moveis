document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    const siteData = getSiteData();

    const product = siteData.products.find(p => p.id === productId);

    if (!product) {
        window.location.href = 'index.html';
        return;
    }

    updateHeaderIdentity(siteData);
    renderProductDetail(product, siteData.contact);
    renderFooterAlternative(siteData);
});

function updateHeaderIdentity(data) {
    const logoImg = document.getElementById('site-logo');
    if (logoImg && data.siteLogo) {
        logoImg.src = data.siteLogo;
    }
    if (data.siteTitle) {
        document.title = `${data.siteTitle} | ${document.title.split('|')[1] || 'Detalhes do Produto'}`;
    }
}

function renderProductDetail(p, c) {
    const container = document.getElementById('product-container');

    // Handle legacy single image or new array
    const images = p.images && p.images.length > 0 ? p.images : [p.image];

    container.innerHTML = `
        <div class="product-breadcrumb animate-in">
            <a href="index.html#products">Coleção</a>
            <span class="sep">/</span>
            <a href="#">${p.category}</a>
            <span class="sep">/</span>
            <span class="current">${p.name}</span>
        </div>
        
        <div class="product-luxury-layout">
            <!-- LEFT AREA: The Gallery -->
            <div class="product-showcase">
                <div class="gallery-wrapper animate-in">
                    <div class="product-main-view">
                        <div class="swiper product-swiper">
                            <div class="swiper-wrapper">
                                ${images.map(img => `
                                    <div class="swiper-slide">
                                        <div class="swiper-zoom-container">
                                            <img src="${img}" alt="${p.name}">
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="swiper-button-next"></div>
                            <div class="swiper-button-prev"></div>
                        </div>
                    </div>
                    
                    ${images.length > 1 ? `
                    <div class="product-thumbnails-list">
                        ${images.map((img, i) => `
                            <div class="lux-thumb ${i === 0 ? 'active' : ''}" data-index="${i}">
                                <img src="${img}">
                            </div>
                        `).join('')}
                    </div>
                    ` : ''}
                </div>

                <div class="product-details-content animate-in">
                    <div class="info-section">
                        <h2 class="section-title-small">Descrição</h2>
                        <p class="lux-description">${p.description || 'Uma peça que transcende o tempo, unindo o design contemporâneo à tradição da marcenaria de luxo. Cada detalhe foi pensado para proporcionar não apenas conforto, mas uma experiência estética completa em seu ambiente.'}</p>
                    </div>
                    
                    <div class="info-section">
                        <h2 class="section-title-small">Especificações Técnicas</h2>
                        <ul class="lux-specs-list">
                            <li><strong>Material:</strong> <span>${p.material || 'Materiais nobres selecionados'}</span></li>
                            <li><strong>Dimensões:</strong> <span>${p.dimensions || 'Consulte para sob medida'}</span></li>
                            <li><strong>Acabamento:</strong> <span>Premium Alto Brilho / Mate</span></li>
                            <li><strong>Estrutura:</strong> <span>Madeira de Reflorestamento Certificada</span></li>
                            <li><strong>Garantia:</strong> <span>12 Meses contra defeitos de fabricação</span></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- RIGHT AREA: Pricing & Boutique Info -->
            <div class="product-boutique-sidebar">
                <div class="boutique-card animate-in">
                    <div class="boutique-header">
                        <span class="lux-tag">${p.badge || 'Exclusivo'}</span>
                        <h1 class="lux-title">${p.name}</h1>
                        <div class="boutique-divider"></div>
                    </div>

                    <div class="lux-price-area">
                        ${p.oldPrice ? `<span class="lux-old-price">R$ ${p.oldPrice}</span>` : ''}
                        <div class="lux-price">
                            <span class="symbol">R$</span>
                            <span class="val">${p.price}</span>
                        </div>
                        <p class="lux-payment-info">Consulte condições especiais de parcelamento via WhatsApp.</p>
                    </div>

                    <div class="boutique-actions">
                        <a href="https://wa.me/${c.whatsapp}?text=Olá! Gostaria de adquirir o móvel: ${p.name}. Podemos conversar sobre os detalhes?" class="btn-lux-primary">
                            <span>Adquirir Móvel</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>

                    <div class="brand-commitments">
                        <div class="commitment-item">
                            <i class="fas fa-gem"></i>
                            <div>
                                <h4>Qualidade Impecável</h4>
                                <p>Materiais de alta durabilidade e acabamento artesanal.</p>
                            </div>
                        </div>
                        <div class="commitment-item">
                            <i class="fas fa-shipping-fast"></i>
                            <div>
                                <h4>Entrega Premium</h4>
                                <p>Logística própria especializada em móveis de luxo.</p>
                            </div>
                        </div>
                    </div>
                </div>

                </div>
            </div>
        </div>
    `;

    // Initialize Swiper
    const swiper = new Swiper('.product-swiper', {
        loop: images.length > 1,
        zoom: true,
        grabCursor: true,
        parallax: true,
        speed: 800,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Handle Thumbs Click
    document.querySelectorAll('.lux-thumb').forEach(thumb => {
        thumb.addEventListener('click', function () {
            const index = parseInt(this.dataset.index);
            swiper.slideToLoop(index);
            document.querySelectorAll('.lux-thumb').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Sync active thumb with swiper
    swiper.on('slideChange', () => {
        const index = swiper.realIndex;
        document.querySelectorAll('.lux-thumb').forEach((t, i) => {
            if (i === index) t.classList.add('active');
            else t.classList.remove('active');
        });
    });

    // Tabs functionality
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));

            btn.classList.add('active');
            document.getElementById(`tab-${btn.dataset.tab}`).classList.remove('hidden');
        });
    });

    // Update Floating WA
    document.querySelector('.float-whatsapp').href = `https://wa.me/${c.whatsapp}`;

    // GSAP Animation
    gsap.from(".animate-in", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
    });
}

function renderFooterAlternative(data) {
    const footer = document.getElementById('site-footer');
    const c = data.contact;
    const siteTitle = data.siteTitle || 'K.K Móveis';
    const siteLogo = data.siteLogo || 'assets/logo.png';

    footer.innerHTML = `
        <div class="container footer-top">
            <div class="footer-info">
                <img src="${siteLogo}" alt="${siteTitle} Logo" class="footer-logo">
                <p>${siteTitle} é sinônimo de luxo, qualidade e durabilidade. Especialistas em transformar casas em lares extraordinários.</p>
                <div class="social-links">
                    <a href="${c.instagram}"><i class="fab fa-instagram"></i></a>
                    <a href="${c.facebook}"><i class="fab fa-facebook"></i></a>
                    <a href="https://wa.me/${c.whatsapp}" target="_blank"><i class="fab fa-whatsapp"></i></a>
                </div>
            </div>
            
            <div class="footer-links">
                <h3>Links Úteis</h3>
                <ul>
                    <li><a href="index.html#home">Início</a></li>
                    <li><a href="index.html#about">Sobre Nós</a></li>
                    <li><a href="index.html#categories">Categorias</a></li>
                    <li><a href="index.html#products">Produtos</a></li>
                </ul>
            </div>
            
            <div class="footer-contact">
                <h3>Contato</h3>
                <p><i class="fab fa-whatsapp"></i> Atendimento via WhatsApp</p>
                <a href="https://wa.me/${c.whatsapp}" class="btn-link-gold">Conversar Agora <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
        
        <div class="footer-bottom">
            <div class="container">
                <p>&copy; 2026 ${siteTitle}. Todos os direitos reservados.</p>
            </div>
        </div>
    `;
}
