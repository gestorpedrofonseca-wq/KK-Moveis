const defaultData = {
    banners: [
        {
            title: "Design que Inspira",
            text: "Móveis exclusivos com acabamento em ouro e materiais nobres para transformar sua sala de estar.",
            imageDesktop: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2000",
            imageMobile: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
            buttonText: "Ver Coleção",
            link: "#products"
        },
        {
            title: "Tecnologia & Estilo",
            text: "Eletrodomésticos de última geração que unem performance e sofisticação para sua cozinha.",
            imageDesktop: "https://images.unsplash.com/photo-1556911223-e124ac3448af?auto=format&fit=crop&q=80&w=2000",
            imageMobile: "https://images.unsplash.com/photo-1556911223-e124ac3448af?auto=format&fit=crop&q=80&w=800",
            buttonText: "Explorar Agora",
            link: "#products"
        }
    ],
    categories: [
        { name: "Sala de Estar", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800" },
        { name: "Cozinha & Eletro", image: "https://images.unsplash.com/photo-1556912176-12bb89e98543?auto=format&fit=crop&q=80&w=800" },
        { name: "Dormitórios", image: "https://images.unsplash.com/photo-1616594111791-ad743f3b9c1d?auto=format&fit=crop&q=80&w=800" },
        { name: "Estofados", image: "https://images.unsplash.com/photo-1616489953149-8d7697469986?auto=format&fit=crop&q=80&w=800" }
    ],
    products: [
        {
            id: 1,
            name: "Sofá Velvet Gold Sectional",
            category: "Estofados",
            price: "4.599,00",
            oldPrice: "5.800,00",
            images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000"],
            badge: "Destaque",
            description: "O Sofá Velvet Gold Sectional une o máximo conforto do veludo premium com a sofisticação de detalhes em acabamento dourado. Perfeito para salas de estar que buscam um toque de luxo e modernidade.",
            dimensions: "280cm x 160cm x 85cm",
            material: "Veludo Premium, Estrutura em Madeira Maciça, Pés em Aço Carbono Gold",
            condition: "Novo"
        },
        {
            id: 2,
            name: "Geladeira Smart Black Inox",
            category: "Cozinha & Eletro",
            price: "7.299,00",
            images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000"],
            badge: "Premium",
            description: "A Geladeira Smart Black Inox oferece tecnologia de ponta para sua cozinha. Com sistema de economia de energia, painel digital e acabamento em inox preto que não deixa marcas de dedos.",
            dimensions: "185cm x 75cm x 70cm",
            material: "Inox Escovado, Componentes Eletrônicos de Alta Performance",
            condition: "Novo"
        },
        {
            id: 3,
            name: "Mesa de Jantar Imperial",
            category: "Sala de Estar",
            price: "3.850,00",
            images: ["https://images.unsplash.com/photo-1577146333359-b9fdf52456cd?auto=format&fit=crop&q=80&w=1000"],
            badge: "Novo",
            description: "Mesa de jantar elegante com tampo de mármore e base em laca. Ideal para quem valoriza momentos especiais em família com um design que impõe respeito e beleza.",
            dimensions: "220cm x 110cm x 76cm",
            material: "Mármore Carrara, Laca Premium",
            condition: "Novo"
        },
        {
            id: 4,
            name: "Cama King Size Luxory",
            category: "Dormitórios",
            price: "5.900,00",
            images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=1000"],
            badge: "Recomendado",
            description: "Durma como a realeza. A Cama King Size Luxory possui cabeceira capitonê em linho e estrutura reforçada para o máximo conforto e durabilidade.",
            dimensions: "203cm x 193cm x 120cm",
            material: "Linho Cru, Madeira de Reflorestamento",
            condition: "Novo"
        },
        {
            id: 5,
            name: "Armário de Cozinha Gourmet",
            category: "Cozinha & Eletro",
            price: "8.500,00",
            images: ["https://images.unsplash.com/photo-1556911223-e124ac3448af?auto=format&fit=crop&q=80&w=1000"],
            badge: "Sob Medida",
            description: "Cozinha planejada com acabamento em laca alto brilho e ferragens com amortecimento. Design funcional que otimiza seu espaço com extrema elegância.",
            dimensions: "420cm x 240cm x 60cm",
            material: "MDF 18mm, Puxadores em Alumínio Champagne",
            condition: "Novo"
        },
        {
            id: 6,
            name: "Guarda-Roupa Master Glass",
            category: "Dormitórios",
            price: "6.750,00",
            images: ["https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1000"],
            badge: "Luxo",
            description: "Guarda-roupa com portas de correr em espelho bronze e divisão interna inteligente. Organização e amplitude para o seu dormitório.",
            dimensions: "270cm x 235cm x 65cm",
            material: "MDF Premium, Trilhos de Alumínio, Espelhos com Película Protetora",
            condition: "Novo"
        },
        {
            id: 7,
            name: "Fogão de Indução Pro Series",
            category: "Cozinha & Eletro",
            price: "3.200,00",
            images: ["https://images.unsplash.com/photo-1584990344619-3f0dc8447d25?auto=format&fit=crop&q=80&w=1000"],
            badge: "Tecnologia",
            description: "Prepare seus pratos com precisão milimétrica. O Fogão de Indução Pro Series oferece aquecimento rápido, segurança total e limpeza simplificada com seu tampo vitrocerâmico.",
            dimensions: "60cm x 52cm x 5cm",
            material: "Vitrocerâmico, Painel Touch",
            condition: "Novo"
        }
    ],
    contact: {
        whatsapp: "558896476645",
        instagram: "#",
        facebook: "#",
        pinterest: "#"
    },
    about: {
        title: "Uma História de Elegância e Compromisso",
        subtitle: "Nossa Jornada",
        years: 25,
        image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=1000",
        text1: "Fundada em 1999, a K.K Móveis nasceu de um sonho em transformar ambientes comuns em espaços extraordinários. O que começou como uma pequena marcenaria artesanal, hoje se tornou referência em mobiliário de luxo.",
        text2: "Nossa missão vai além de vender móveis; buscamos curar peças que contem histórias, unindo o design atemporal à funcionalidade moderna.",
        text3: "Com décadas de experiência, continuamos evoluindo, mas mantendo nossa essência: o compromisso inabalável com a qualidade e a satisfação do cliente."
    }
};

function getSiteData() {
    const saved = localStorage.getItem('kk_moveis_data');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('kk_moveis_data', JSON.stringify(defaultData));
    return defaultData;
}

function saveSiteData(data) {
    localStorage.setItem('kk_moveis_data', JSON.stringify(data));
    // Dispatch event to notify tabs
    window.dispatchEvent(new Event('storage'));
}
