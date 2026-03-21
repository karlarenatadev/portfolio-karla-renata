// Constantes de configuração
const CONFIG = {
    SLIDER_SCROLL_AMOUNT: 320,
    MOBILE_BREAKPOINT: 768
};

// Adiciona um listener que espera o HTML carregar completamente
document.addEventListener('DOMContentLoaded', function() {

    // Seleciona os elementos do DOM uma única vez
    const items = document.getElementById('items');
    const ptBtn = document.getElementById('ptBtn');
    const enBtn = document.getElementById('enBtn');
    const elements = document.querySelectorAll('.lang');

    // Função para rolar até a seção desejada
    window.scrollToSection = function(sectionId) {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    }

    // Função do menu hambúrguer
    window.clickMenu = function() {
        items.classList.toggle('menu-aberto');
    }

    // Função para ajustar o menu ao mudar o tamanho da tela
    function mudouTamanho() {
        if (window.innerWidth >= CONFIG.MOBILE_BREAKPOINT) {
            items.classList.remove('menu-aberto');
        }
    }

    // Adiciona o evento de redimensionamento à janela
    window.onresize = mudouTamanho;

    // Funções de mudança de idioma
    ptBtn.addEventListener('click', () => {
      elements.forEach(el => {
        const ptText = el.getAttribute('data-pt');
        if (ptText) el.textContent = ptText;
      });
        ptBtn.classList.add('active');
        enBtn.classList.remove('active');
    });

    enBtn.addEventListener('click', () => {
      elements.forEach(el => {
        const enText = el.getAttribute('data-en');
        if (enText) el.textContent = enText;
      });
      enBtn.classList.add('active');
      ptBtn.classList.remove('active');
    });
    
    // Define PT como idioma padrão
    ptBtn.classList.add('active');
    
    // Inicializa os event listeners dos cards de projetos
    inicializarCardsModais();
});

// --- LÓGICA DO SLIDER DE PROJETOS ---

/**
 * Função para controlar o movimento do carrossel de projetos
 * @param {number} amount - Quantidade de pixels a deslocar (positivo = direita, negativo = esquerda)
 */
window.scrollSlider = function(amount) {
    try {
        const container = document.getElementById('dados-slider');
        if (container) {
            container.scrollLeft += amount;
        } else {
            console.warn('Slider container não encontrado');
        }
    } catch (error) {
        console.error('Erro ao mover slider:', error);
    }
}

// --- LÓGICA DO MODAL ---

/**
 * Inicializa os event listeners dos cards de projetos
 */
function inicializarCardsModais() {
    // Seleciona todos os cards de projetos que têm onclick
    const cards = document.querySelectorAll('.projeto-card[onclick]');
    
    cards.forEach(card => {
        // Remove o onclick inline
        const onclickAttr = card.getAttribute('onclick');
        if (onclickAttr) {
            // Extrai o ID do modal do atributo onclick
            const match = onclickAttr.match(/abrirModal\('([^']+)'\)/);
            if (match && match[1]) {
                const modalId = match[1];
                
                // Remove o onclick inline
                card.removeAttribute('onclick');
                
                // Adiciona event listener adequado
                card.addEventListener('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    abrirModal(modalId, event);
                });
                
                console.log(`Event listener adicionado ao card: ${modalId}`);
            }
        }
    });
}

/**
 * Abre um modal específico
 * @param {string} idModal - ID do modal a abrir
 * @param {Event} event - Evento do clique (opcional)
 */
window.abrirModal = function(idModal, event) {
    try {
        // Previne propagação do evento se fornecido
        if (event) {
            event.stopPropagation();
        }

        const overlay = document.getElementById('modal-container');
        const modalConteudo = document.getElementById(idModal);

        if (!overlay || !modalConteudo) {
            console.warn(`Modal ${idModal} ou overlay não encontrado`);
            return;
        }

        // Esconde todos os conteúdos antes de mostrar o escolhido
        document.querySelectorAll('.modal-content').forEach(el => el.classList.remove('ativo'));

        // Mostra o overlay e o conteúdo específico
        overlay.classList.add('aberto');
        modalConteudo.classList.add('ativo');
        
        console.log(`Modal ${idModal} aberto com sucesso`);
    } catch (error) {
        console.error('Erro ao abrir modal:', error);
    }
}

/**
 * Fecha o modal aberto
 * @param {Event} event - Evento do clique
 */
window.fecharModal = function(event) {
    try {
        // Previne propagação para não interferir com outros elementos
        if (event) {
            event.stopPropagation();
        }

        // Fecha se clicar no "X" ou fora do conteúdo (no overlay escuro)
        if (!event || event.target.classList.contains('modal-overlay') || event.target.classList.contains('fechar-modal')) {
            const modalContainer = document.getElementById('modal-container');
            if (modalContainer) {
                modalContainer.classList.remove('aberto');
                // Remove a classe ativo de todos os modais
                document.querySelectorAll('.modal-content').forEach(el => el.classList.remove('ativo'));
                console.log('Modal fechado com sucesso');
            }
        }
    } catch (error) {
        console.error('Erro ao fechar modal:', error);
    }
}