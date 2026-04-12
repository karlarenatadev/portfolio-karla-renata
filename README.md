# Karla Renata | Portfólio de Dados & Estratégia

> Soluções orientadas a performance para operações comerciais, previsão, automação e inteligência executiva em nuvem.

Este repositório contém o código-fonte do meu portfólio profissional, desenhado para demonstrar o impacto de negócio através de Engenharia de Dados, Machine Learning e Business Intelligence. A arquitetura do projeto foi estruturada com foco em performance, design minimalista e segurança de credenciais em ambiente Cloud.

🔗 **Acesse online:** [karlarenata.com ou link da vercel]

---

## 🛠 Arquitetura e Stack Tecnológico

O projeto adota uma abordagem moderna e leve, sem dependência de frameworks complexos no frontend, e utiliza computação *serverless* para integrações seguras de IA.

* **Frontend:** HTML5, CSS3, Vanilla JavaScript (focado em responsividade e usabilidade).
* **Backend / Cloud:** Serverless Functions hospedadas na Vercel (`/api/chat`).
* **Inteligência Artificial:** Integração com a API do Google Gemini.
* **CI/CD & Qualidade:** GitHub Actions (`portfolio-check.yml`).

---

## 🔒 Segurança e Integração com IA (Chatbot)

Uma das premissas deste projeto foi implementar um assistente virtual sem expor chaves de API no lado do cliente. 

O fluxo de comunicação foi estruturado da seguinte forma:
1. O cliente (`js/chatbot.js`) capta o input do usuário.
2. A requisição é enviada para o endpoint *serverless* (`/api/chat`).
3. A função na Vercel consome a variável de ambiente `process.env.GEMINI_API_KEY` e realiza a chamada segura à API do Gemini, retornando apenas o *payload* necessário para o frontend.

> **Nota de Infraestrutura:** O deploy via GitHub Pages foi descontinuado especificamente para suportar a execução de funções *serverless* e garantir a integridade da arquitetura de segurança do chatbot. O ambiente de produção oficial ocorre via Vercel.

---

## 💻 Como executar localmente

Para rodar a aplicação simulando o ambiente *serverless* localmente:

1. Instale a CLI da Vercel globalmente (se necessário):
   ```bash
   npm install -g vercel
   ```
2. Crie um arquivo `.env` na raiz do projeto (utilize o `.env.example` como base).
3. Adicione a sua chave de API na variável:
   ```bash
   GEMINI_API_KEY=sua_chave_aqui
   ```
4. Inicie o servidor de desenvolvimento da Vercel:
   ``` bash
   vercel dev
   ```

---
   
## 🚀 Deploy
O pipeline de deploy está configurado para a Vercel, garantindo suporte nativo às rotas de API.

1. Importe o repositório no painel da Vercel.

2. Nas configurações de projeto, adicione a variável de ambiente GEMINI_API_KEY.

3. Inicie o deploy.

---

## 📄 Licença
Distribuído sob a licença MIT. Consulte LICENSE para mais informações.
