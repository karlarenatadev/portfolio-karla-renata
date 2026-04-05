# 🛠️ Guia de Desenvolvimento

Este guia é destinado a desenvolvedores e profissionais de dados que desejam clonar, executar ou modificar este portfólio localmente.

## 📋 Pré-requisitos

Para rodar o ambiente completo localmente, você precisará ter instalado:
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (versão 18+ recomendada) - Utilizado para gerenciamento de pacotes e projetos fullstack acessórios.
* [Python 3.10+](https://www.python.org/) - Necessário para rodar os scripts de automação e notebooks de Machine Learning associados.

## 🚀 Configuração do Ambiente Local

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU-USUARIO/portfolio-karla-renata.git](https://github.com/SEU-USUARIO/portfolio-karla-renata.git)
    cd portfolio-karla-renata
    ```

2.  **Instalação de Dependências (Web):**
    O projeto utiliza o `npm` para gerenciar dependências de desenvolvimento e utilitários.
    ```bash
    npm install
    ```

3.  **Execução do Portfólio (Frontend):**
    Você pode abrir o arquivo `index.html` diretamente no seu navegador ou, para uma experiência melhor (evitando problemas de CORS em chamadas de API ou módulos JS), utilizar uma extensão como o *Live Server* do VS Code ou um servidor HTTP simples em Python:
    ```bash
    python -m http.server 8000
    ```
    Acesse `http://localhost:8000`.

## 📂 Estrutura de Diretórios

* `/`: Arquivos principais HTML (index, páginas de projetos).
* `/style/`: CSS modular (`style.css` geral, `mobile.css` para responsividade, `impressora.css`).
* `/js/`: Scripts JavaScript divididos por funcionalidade (interatividade, idioma, modais).
* `/imagens/`: Assets estáticos otimizados.
* `/pages/`: Páginas detalhadas de cada projeto de portfólio.
* `/arquivo/`: Documentos para download (ex: currículo em PDF).

## 🌿 Estratégia de Branching (Git Flow Simplificado)

* `main`: Branch de produção. Reflete exatamente o que está no ar no GitHub Pages.
* `feature/nome-da-feature`: Branches criadas para o desenvolvimento de novas seções, adição de projetos ou refatorações complexas.
* `fix/nome-do-bug`: Branches exclusivas para correção de bugs no layout ou lógica.