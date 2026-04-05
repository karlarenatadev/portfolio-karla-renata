# Portfolio Profissional - Karla Renata

Portfolio pessoal com projetos de dados, BI, automacao e desenvolvimento web.

## Stack

- HTML, CSS e JavaScript no frontend
- Gemini API no backend serverless
- Vercel para hospedagem do site e da funcao `/api/chat`
- GitHub Actions para checagens de qualidade

## Chatbot seguro

O chatbot nao expõe mais a chave da Gemini no navegador.

Fluxo atual:
- o frontend envia a mensagem para `/api/chat`
- a funcao serverless usa `process.env.GEMINI_API_KEY`
- a chamada para a Gemini acontece somente no servidor

Arquivos principais:
- `js/chatbot.js`: cliente do chat
- `api/chat.js`: endpoint serverless
- `vercel.json`: configuracao basica de deploy

## Executando localmente

1. Instale a CLI da Vercel, se necessario:
   `npm install -g vercel`
2. Crie um arquivo `.env` baseado em `.env.example`
3. Preencha a variavel:
   `GEMINI_API_KEY=sua_chave_aqui`
4. Rode o projeto com:
   `vercel dev`

## Deploy

O deploy do chatbot seguro deve ser feito na Vercel.

1. Importe este repositorio na Vercel
2. Adicione a variavel de ambiente `GEMINI_API_KEY`
3. Faça o deploy

Observacao:
- GitHub Pages foi desativado para o chatbot porque nao executa funcoes serverless

## Qualidade

Workflow ativo:
- `.github/workflows/portfolio-check.yml`

Workflow de Pages:
- `.github/workflows/pages.yml` agora existe apenas como aviso para evitar deploy quebrado em GitHub Pages

## Licenca

MIT. Veja `LICENSE`.
