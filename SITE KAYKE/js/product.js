document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    const siteData = getSiteData();

    const product = siteData.products.find(p => p.id === productId);

    if (!product) {
        window.location.href = 'index.html';
        return;
    }

    renderProductDetail(product, siteData.contact);
    renderFooterAlternative(siteData);
});

function renderProductDetail(p, c) {
    const container = document.getElementById('product-container');

    container.innerHTML = `
        <a href="index.html#products" class="back-link"><i class="fas fa-arrow-left"></i> Voltar aos Produtos</a>
        <div class="product-detail-flex">
            <div class="product-media">
                <img src="${p.image}" alt="${p.name}">
            </div>
            
            <div class="product-content">
                ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
                <h1>${p.name}</h1>
                <div class="detail-price">
                    R$ ${p.price}
                    ${p.oldPrice ? `<span>R$ ${p.oldPrice}</span>` : ''}
                </div>
                
                <div class="description-block">
                    <h3>Descrição</h3>
                    <p>${p.description || 'Produto de alta qualidade selecionado pela K.K Móveis para transformar seu ambiente.'}</p>
                </div>
                
                <div class="specs-list">
                    <div class="spec-item">
                        <span class="spec-label">Dimensões:</span>
                        <span class="spec-value">${p.dimensions || 'Consulte-nos'}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Material:</span>
                        <span class="spec-value">${p.material || 'Premium'}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Disponibilidade:</span>
                        <span class="spec-value">Sob consulta</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Estado do produto:</span>
                        <span class="spec-value">${p.condition || 'Novo'}</span>
                    </div>
                </div>
                
                <div class="product-actions-detail">
                    <a href="https://wa.me/${c.whatsapp}?text=Olá! Gostaria de mais informações sobre o produto: ${p.name} (R$ ${p.price})" class="btn-whatsapp-large" target="_blank">
                        <i class="fab fa-whatsapp"></i> Consultar Disponibilidade
                    </a>
                </div>
            </div>
        </div>
    `;

    // Floating WA update
    document.querySelector('.float-whatsapp').href = `https://wa.me/${c.whatsapp}`;
}

function renderFooterAlternative(data) {
    // Reuse footer render logic from script.js logic or similar
    const footer = document.getElementById('site-footer');
    const c = data.contact;
    footer.innerHTML = `
        <div class="container footer-top">
            <div class="footer-info">
                <img src="assets/logo.png" alt="K.K Móveis Logo" class="footer-logo">
                <p>K.K Móveis é sinônimo de luxo, qualidade e durabilidade.</p>
                <div class="social-links">
                    <a href="${c.instagram}"><i class="fab fa-instagram"></i></a>
                    <a href="${c.facebook}"><i class="fab fa-facebook"></i></a>
                    <a href="https://wa.me/${c.whatsapp}" target="_blank"><i class="fab fa-whatsapp"></i></a>
                </div>
            </div>
            <div class="footer-links">
                <h3>Acesso Rápido</h3>
                <ul>
                    <li><a href="index.html#home">Início</a></li>
                    <li><a href="index.html#about">Sobre Nós</a></li>
                    <li><a href="index.html#products">Produtos</a></li>
                </ul>
            </div>
            <div class="footer-contact">
                <h3>Onde Estamos</h3>
                <p><i class="fas fa-map-marker-alt"></i> ${c.address}</p>
                <p><i class="fas fa-phone"></i> ${c.phone}</p>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <p>&copy; 2026 K.K Móveis. Todos os direitos reservados.</p>
            </div>
        </div>
    `;
}
