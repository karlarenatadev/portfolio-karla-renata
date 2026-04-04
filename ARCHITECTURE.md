# 🏛️ Arquitetura do Sistema e Projetos

Este documento descreve a arquitetura do portfólio e a infraestrutura técnica dos projetos de Data Science, BI e Automação integrados a ele. O foco é manter um ecossistema escalável, performático e de fácil manutenção.

## 💻 Arquitetura do Portfólio (Frontend)

O portfólio foi desenhado com uma arquitetura **Static Site Generation / Client-Side Render**, priorizando velocidade, SEO e acessibilidade.

* **Apresentação:** HTML5 semântico e CSS3 modular (metodologia BEM-like para isolamento de escopo entre `style.css` e `mobile.css`).
* **Interatividade:** JavaScript Vanilla (ES6+) para manipulação de DOM, modais, lazy loading de imagens e controle de estado (ex: alternância de idioma PT/EN via `localStorage`).
* **Hospedagem & CI/CD:** GitHub Pages com integração contínua.
* **Performance & Analytics:** Minificação de assets, otimização de imagens (WebP/PNG) e tagueamento via Google Analytics.

## 📊 Arquitetura Padrão de Projetos de Dados (Showcases)

Os projetos de dados apresentados no portfólio (como o Deal Scoring e a Previsão de Estoque) seguem, em sua maioria, uma arquitetura de dados moderna focada em Cloud e automação.

### Pipeline de Dados (ELT/ETL)
1.  **Extração & Automação:** Orquestração de rotinas utilizando **n8n** e scripts em **Python** (integração via APIs REST e Webhooks).
2.  **Processamento:** Uso de bibliotecas como `Pandas` e `NumPy` para limpeza e transformação de dados em memória.
3.  **Machine Learning:** Modelagem preditiva utilizando `Scikit-learn` e `CatBoost` (ex: modelos de classificação de leads), com deploy simulado ou real via **AWS SageMaker** ou APIs construídas com **FastAPI/Node.js**.
4.  **Visualização & BI:** Consumo de dados processados através do **Power BI** (utilizando modelagem tabular e DAX avançado) e **Amazon QuickSight**, integrados via dashboards interativos.

## ☁️ Infraestrutura Cloud (AWS)

Para os projetos que exigem backend ou processamento em nuvem:
* **Compute:** EC2 para hospedagem de scripts de automação e APIs.
* **Storage:** Amazon S3 para data lakes estruturados e versionamento de datasets.
* **Identity:** IAM configurado com políticas de menor privilégio para segurança dos pipelines.