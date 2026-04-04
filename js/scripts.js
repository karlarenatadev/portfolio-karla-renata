/* ============================================================
   CONFIGURAÇÕES E IDIOMA
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // 1. GESTÃO DE IDIOMA (Com Persistência)
    const savedLang = localStorage.getItem('portfolio-lang') || 'pt';
    applyLanguage(savedLang);

    const ptBtn = document.getElementById('ptBtn');
    const enBtn = document.getElementById('enBtn');

    // Só adiciona o evento se os botões existirem na página atual
    if (ptBtn && enBtn) {
        ptBtn.onclick = () => applyLanguage('pt');
        enBtn.onclick = () => applyLanguage('en');
    }
});

function applyLanguage(lang) {
    localStorage.setItem('portfolio-lang', lang);
    const elements = document.querySelectorAll('.lang');
    
    elements.forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            // Se for um elemento de texto simples, usa innerText
            if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
                el.innerText = text;
            } else {
                el.placeholder = text;
            }
        }
    });

    // Atualiza o visual dos botões se existirem
    const ptBtn = document.getElementById('ptBtn');
    const enBtn = document.getElementById('enBtn');
    if (ptBtn && enBtn) {
        if (lang === 'pt') {
            ptBtn.classList.add('active');
            enBtn.classList.remove('active');
        } else {
            enBtn.classList.add('active');
            ptBtn.classList.remove('active');
        }
    }
}

/* ============================================================
   NAVEGAÇÃO E UI (DISPONÍVEL GLOBALMENTE)
   ============================================================ */

// Menu Hambúrguer (Certifique-se que o CSS usa .ativo)
window.clickMenu = function() {
    const items = document.getElementById('items');
    if (items) {
        items.classList.toggle('ativo');
    }
}

// Scroll Suave e fechar menu mobile
window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        const items = document.getElementById('items');
        if (items) items.classList.remove('ativo');
    }
}

// Slider de Projetos
window.scrollSlider = function(distance) {
    const slider = document.getElementById('dados-slider');
    if (slider) {
        slider.scrollBy({ left: distance, behavior: 'smooth' });
    }
}

/* ============================================================
   LÓGICA DE MODAIS
   ============================================================ */
window.abrirModal = function(idModal) {
    const overlay = document.getElementById('modal-container');
    const modalConteudo = document.getElementById(idModal);

    if (overlay && modalConteudo) {
        // Esconde outros modais que possam estar abertos
        document.querySelectorAll('.modal-content').forEach(el => el.classList.remove('ativo'));
        
        overlay.classList.add('aberto');
        modalConteudo.classList.add('ativo');
        document.body.style.overflow = 'hidden'; // Bloqueia o scroll do fundo
    }
}

window.fecharModal = function(event) {
    const overlay = document.getElementById('modal-container');
    
    // Fecha se clicar no fundo escuro ou no botão X
    if (!event || event.target.classList.contains('modal-overlay') || event.target.classList.contains('fechar-modal')) {
        if (overlay) {
            overlay.classList.remove('aberto');
            document.querySelectorAll('.modal-content').forEach(el => el.classList.remove('ativo'));
            document.body.style.overflow = 'auto'; // Liberta o scroll
        }
    }
}