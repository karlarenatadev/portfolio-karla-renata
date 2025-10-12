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

    // Função do menu hambúrguer CORRIGIDA
    window.clickMenu = function() {
        // Alterna a classe 'menu-aberto' no elemento do menu
        items.classList.toggle('menu-aberto');
    }

    // Função para ajustar o menu ao mudar o tamanho da tela
    function mudouTamanho() {
        // Se a tela for maior que 768px, remove a classe para garantir que o menu não fique "preso" no estado fechado
        if (window.innerWidth >= 768) {
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
});
ptBtn.classList.add('active');