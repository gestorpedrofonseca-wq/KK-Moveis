// Admin State
let currentData = getSiteData();
let activeModalType = '';
let editIndex = -1;

// Login Logic
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('admin-user').value;
    const pass = document.getElementById('admin-pass').value;
    if (user === 'admin' && pass === 'admin123') {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('admin-dashboard').style.display = 'flex';
        initAdmin();
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
});

// Tab Logic
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.nav-btn.active').classList.remove('active');
        document.querySelector('.admin-tab.active').classList.remove('active');

        btn.classList.add('active');
        const tabId = btn.dataset.tab;
        document.getElementById(tabId).classList.add('active');
        document.getElementById('current-tab-title').textContent = btn.textContent.trim();
        renderTabContent(tabId);
    });
});

function initAdmin() {
    renderTabContent('tab-banners');
}

function renderTabContent(tabId) {
    switch (tabId) {
        case 'tab-banners': renderBannersAdmin(); break;
        case 'tab-categories': renderCategoriesAdmin(); break;
        case 'tab-products': renderProductsAdmin(); break;
        case 'tab-about': renderAboutAdmin(); break;
        case 'tab-contact': renderContactAdmin(); break;
    }
}

// BANNERS
function renderBannersAdmin() {
    const list = document.getElementById('banners-list');
    list.innerHTML = currentData.banners.map((b, i) => `
        <div class="list-item">
            <img src="${b.image}" class="preview-img">
            <div class="item-info">
                <h4>${b.title}</h4>
                <p>${b.text.substring(0, 50)}...</p>
            </div>
            <div class="item-actions">
                <button class="btn-edit" onclick="showBannerModal(${i})">Editar</button>
                <button class="btn-delete" onclick="deleteItem('banners', ${i})">Excluir</button>
            </div>
        </div>
    `).join('');
}

window.showBannerModal = (index = -1) => {
    activeModalType = 'banners';
    editIndex = index;
    const b = index > -1 ? currentData.banners[index] : { title: '', text: '', image: '', buttonText: 'Ver Coleção', link: '#products' };

    showModal(index > -1 ? 'Editar Banner' : 'Novo Banner', `
        <div class="form-group"><label>Título</label><input type="text" name="title" value="${b.title}" required></div>
        <div class="form-group"><label>Texto</label><textarea name="text" required>${b.text}</textarea></div>
        <div class="form-group">
            <label>Imagem do Banner (Recomendado: 1920x1080px)</label>
            <div class="upload-area">
                <input type="file" id="file-banner" accept="image/*" style="display:none">
                <input type="hidden" name="image" id="input-image-banner" value="${b.image}">
                <div class="upload-preview" onclick="document.getElementById('file-banner').click()">
                    <img src="${b.image || 'https://via.placeholder.com/1920x1080?text=Enviar+Imagem'}" id="preview-banner">
                    <span>Clique para trocar imagem</span>
                </div>
            </div>
        </div>
        <div class="form-group"><label>Texto do Botão</label><input type="text" name="buttonText" value="${b.buttonText}"></div>
        <div class="form-group"><label>Link</label><input type="text" name="link" value="${b.link}"></div>
    `);
    setupFileUpload('file-banner', 'preview-banner', 'input-image-banner');
}

// CATEGORIES
function renderCategoriesAdmin() {
    const list = document.getElementById('categories-list');
    list.innerHTML = currentData.categories.map((c, i) => `
        <div class="list-item">
            <img src="${c.image}" class="preview-img">
            <div class="item-info">
                <h4>${c.name}</h4>
            </div>
            <div class="item-actions">
                <button class="btn-edit" onclick="showCategoryModal(${i})">Editar</button>
                <button class="btn-delete" onclick="deleteItem('categories', ${i})">Excluir</button>
            </div>
        </div>
    `).join('');
}

window.showCategoryModal = (index = -1) => {
    activeModalType = 'categories';
    editIndex = index;
    const c = index > -1 ? currentData.categories[index] : { name: '', image: '' };
    showModal(index > -1 ? 'Editar Categoria' : 'Nova Categoria', `
        <div class="form-group"><label>Nome</label><input type="text" name="name" value="${c.name}" required></div>
        <div class="form-group">
            <label>Imagem da Categoria (Quadrada/Retangular)</label>
            <div class="upload-area">
                <input type="file" id="file-cat" accept="image/*" style="display:none">
                <input type="hidden" name="image" id="input-image-cat" value="${c.image}">
                <div class="upload-preview" onclick="document.getElementById('file-cat').click()">
                    <img src="${c.image || 'https://via.placeholder.com/400?text=Enviar+Imagem'}" id="preview-cat">
                    <span>Trocar imagem</span>
                </div>
            </div>
        </div>
    `);
    setupFileUpload('file-cat', 'preview-cat', 'input-image-cat');
}

// PRODUCTS
function renderProductsAdmin() {
    const list = document.getElementById('products-list');
    list.innerHTML = currentData.products.map((p, i) => `
        <div class="list-item">
            <img src="${p.image}" class="preview-img">
            <div class="item-info">
                <h4>${p.name}</h4>
                <p>R$ ${p.price} | ${p.category}</p>
            </div>
            <div class="item-actions">
                <button class="btn-edit" onclick="showProductModal(${i})">Editar</button>
                <button class="btn-delete" onclick="deleteItem('products', ${i})">Excluir</button>
            </div>
        </div>
    `).join('');
}

window.showProductModal = (index = -1) => {
    activeModalType = 'products';
    editIndex = index;
    const p = index > -1 ? currentData.products[index] : { name: '', category: 'Salas', price: '', oldPrice: '', image: '', badge: '', description: '', dimensions: '', material: '' };
    showModal(index > -1 ? 'Editar Produto' : 'Novo Produto', `
        <div class="form-group"><label>Nome do Produto</label><input type="text" name="name" value="${p.name}" required></div>
        <div class="form-group"><label>Categoria</label><input type="text" name="category" value="${p.category}" required></div>
        <div class="form-group"><label>Preço (Ex: 1.500,00)</label><input type="text" name="price" value="${p.price}" required></div>
        <div class="form-group"><label>Preço Antigo (Opcional)</label><input type="text" name="oldPrice" value="${p.oldPrice}"></div>
        <div class="form-group">
            <label>Imagem do Produto</label>
            <div class="upload-area">
                <input type="file" id="file-prod" accept="image/*" style="display:none">
                <input type="hidden" name="image" id="input-image-prod" value="${p.image}">
                <div class="upload-preview" onclick="document.getElementById('file-prod').click()">
                    <img src="${p.image || 'https://via.placeholder.com/300?text=Enviar+Imagem'}" id="preview-prod">
                    <span>Mudar foto</span>
                </div>
            </div>
        </div>
        <div class="form-group"><label>Etiqueta (Ex: Novo, Promo)</label><input type="text" name="badge" value="${p.badge || ''}"></div>
        <div class="form-group"><label>Descrição Detalhada</label><textarea name="description">${p.description || ''}</textarea></div>
        <div class="form-group"><label>Dimensões (Ex: 200x100x50cm)</label><input type="text" name="dimensions" value="${p.dimensions || ''}"></div>
        <div class="form-group"><label>Material / Acabamento</label><input type="text" name="material" value="${p.material || ''}"></div>
        <div class="form-group"><label>Estado do Produto (Ex: Novo, Usado)</label><input type="text" name="condition" value="${p.condition || 'Novo'}"></div>
    `);
    setupFileUpload('file-prod', 'preview-prod', 'input-image-prod');
}

// ABOUT
function renderAboutAdmin() {
    const form = document.getElementById('about-form');
    const a = currentData.about;
    form.innerHTML = `
        <h3>Editar Nossa História</h3><br>
        <div class="form-group"><label>Título Principal</label><input type="text" name="title" value="${a.title}"></div>
        <div class="form-group"><label>Sutítulo</label><input type="text" name="subtitle" value="${a.subtitle}"></div>
        <div class="form-group"><label>Anos de Experiência</label><input type="number" name="years" value="${a.years}"></div>
        <div class="form-group">
            <label>Imagem da História</label>
            <div class="upload-area">
                <input type="file" id="file-about" accept="image/*" style="display:none">
                <input type="hidden" name="image" id="input-image-about" value="${a.image}">
                <div class="upload-preview" onclick="document.getElementById('file-about').click()">
                    <img src="${a.image}" id="preview-about">
                    <span>Substituir Imagem</span>
                </div>
            </div>
        </div>
        <div class="form-group"><label>Parágrafo 1</label><textarea name="text1">${a.text1}</textarea></div>
        <div class="form-group"><label>Parágrafo 2</label><textarea name="text2">${a.text2}</textarea></div>
        <div class="form-group"><label>Parágrafo 3</label><textarea name="text3">${a.text3}</textarea></div>
        <button type="submit" class="btn-admin">Salvar História</button>
    `;
    setupFileUpload('file-about', 'preview-about', 'input-image-about');
    form.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        currentData.about = Object.fromEntries(formData.entries());
        saveSiteData(currentData);
        alert('Dados salvos com sucesso!');
    };
}

// CONTACT
function renderContactAdmin() {
    const form = document.getElementById('contact-form');
    const c = currentData.contact;
    form.innerHTML = `
        <h3>Configurações de Contato e Redes</h3><br>
        <div class="form-group"><label>WhatsApp (Somente números com DDD)</label><input type="text" name="whatsapp" value="${c.whatsapp}"></div>
        <div class="form-group"><label>Telefone Exibição</label><input type="text" name="phone" value="${c.phone}"></div>
        <div class="form-group"><label>E-mail</label><input type="email" name="email" value="${c.email}"></div>
        <div class="form-group"><label>Endereço Completo</label><input type="text" name="address" value="${c.address}"></div>
        <div class="form-group"><label>Link Instagram</label><input type="text" name="instagram" value="${c.instagram}"></div>
        <div class="form-group"><label>Link Facebook</label><input type="text" name="facebook" value="${c.facebook}"></div>
        <button type="submit" class="btn-admin">Salvar Configurações</button>
    `;
    form.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        currentData.contact = Object.fromEntries(formData.entries());
        saveSiteData(currentData);
        alert('Configurações salvas!');
    };
}

// Modal Actions
function showModal(title, fieldsHtml) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-fields').innerHTML = fieldsHtml;
    document.getElementById('modal-container').style.display = 'flex';
}

window.closeModal = () => {
    document.getElementById('modal-container').style.display = 'none';
}

document.getElementById('admin-modal-form').onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const itemData = Object.fromEntries(formData.entries());

    if (activeModalType === 'products' && editIndex === -1) {
        itemData.id = Date.now();
    }

    if (editIndex > -1) {
        currentData[activeModalType][editIndex] = itemData;
    } else {
        currentData[activeModalType].push(itemData);
    }

    saveSiteData(currentData);
    closeModal();
    renderTabContent('tab-' + activeModalType);
};

window.deleteItem = (type, index) => {
    if (confirm('Deseja realmente excluir este item?')) {
        currentData[type].splice(index, 1);
        saveSiteData(currentData);
        renderTabContent('tab-' + type);
    }
}

function setupFileUpload(inputId, previewId, hiddenInputId) {
    setTimeout(() => {
        const fileInput = document.getElementById(inputId);
        const preview = document.getElementById(previewId);
        const hidden = document.getElementById(hiddenInputId);
        const uploadArea = preview.parentElement; // The .upload-preview container

        if (!fileInput || !uploadArea) return;

        // Visual feedback for drag and drop
        ['dragover', 'dragenter'].forEach(eventName => {
            uploadArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                uploadArea.classList.add('drag-active');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                uploadArea.classList.remove('drag-active');
            }, false);
        });

        // Handle dropped files
        uploadArea.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles(files);
        }, false);

        // Handle selected files
        fileInput.addEventListener('change', function () {
            handleFiles(this.files);
        });

        function handleFiles(files) {
            const file = files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    preview.src = e.target.result;
                    hidden.value = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        }
    }, 100);
}

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
});
