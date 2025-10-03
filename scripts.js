// fazer os botões rolarem até a parte desejada
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}
function clickMenu() {
    if (items.style.display == 'block') {
        items.style.display = 'none';
    } else {
        items.style.display = 'block';
    }
}
// recursividade
function mudouTamanho() {
    if (window.innerWidth >= 768) {
        items.style.display = 'block';
    } else {
        items.style.display = 'none';
    }
}
// mudança de idioma
const ptBtn = document.getElementById('ptBtn');
const enBtn = document.getElementById('enBtn');
const elements = document.querySelectorAll('.lang');

ptBtn.addEventListener('click', () => {
  elements.forEach(el => {
    el.textContent = el.getAttribute('data-pt');
  });
});

enBtn.addEventListener('click', () => {
  elements.forEach(el => {
    el.textContent = el.getAttribute('data-en');
  });
});