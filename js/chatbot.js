/**
 * Chatbot do portfolio com backend serverless.
 * A chave da Gemini fica no servidor e nunca e enviada ao navegador.
 */

class PortfolioAssistant {
    constructor() {
        this.apiEndpoint = '/api/chat';
        this.isLoading = false;
        this.portfolioData = this.getPortfolioData();
    }

    getPortfolioData() {
        return {
            projetos_dados: [
                { titulo: 'AWS Certification Simulator', tags: ['Python', 'AWS', 'Gemini AI'], desc: 'Pipeline ETL com IA para validacao de simulados' },
                { titulo: 'SaaS Sales Analytics', tags: ['QuickSight', 'AWS', 'Analise'], desc: 'Deteccao de anomalias em faturamento' },
                { titulo: 'Previsao de Estoque', tags: ['SageMaker', 'ML', 'AWS'], desc: 'Modelagem preditiva para otimizacao' },
                { titulo: 'Deal Scoring Preditivo', tags: ['Python', 'Scikit-Learn', 'Power BI'], desc: 'ML para previsao de riscos B2B' },
                { titulo: 'Gestao de Frotas', tags: ['Power BI', 'DAX'], desc: 'Dashboard executivo com KPIs' },
                { titulo: 'Automacao RPA', tags: ['Python', 'PyAutoGUI'], desc: 'Robo inteligente para ERP' },
                { titulo: 'Analise de Vendas', tags: ['Python', 'Seaborn'], desc: 'EDA com visualizacoes avancadas' },
                { titulo: 'Dashboard Logistica', tags: ['Power BI'], desc: 'Visualizacao de operacoes logisticas' },
                { titulo: 'Fluxo de Caixa', tags: ['Power BI'], desc: 'Gestao financeira' }
            ]
        };
    }

    renderChatbot() {
        const html = `
            <div id="chatbot-container" class="chatbot-bubble">
                <div class="chatbot-header">
                    <div class="chatbot-info">
                        <h3>Assistente Karla</h3>
                        <p class="status">Online</p>
                    </div>
                    <button id="chatbot-minimize" class="chatbot-minimize">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div id="chatbot-messages" class="chatbot-messages">
                    <div class="message bot-message">
                        <div class="message-content">
                            <p>Ola! Sou a assistente virtual do portfolio da Karla Renata.</p>
                            <p style="font-size: 0.85rem; margin-top: 8px;">Pergunte sobre projetos, skills ou experiencia.</p>
                        </div>
                    </div>
                </div>
                <div class="chatbot-input-area">
                    <textarea id="chatbot-input" class="chatbot-input" placeholder="Digite sua pergunta..." rows="2"></textarea>
                    <button id="chatbot-send" class="chatbot-send">
                        <span class="material-symbols-outlined">send</span>
                    </button>
                </div>
                <div class="chatbot-footer"><p>Powered by Gemini</p></div>
            </div>
            <button id="chatbot-toggle" class="chatbot-toggle">
                <span class="material-symbols-outlined">smart_toy</span>
            </button>
        `;

        document.body.insertAdjacentHTML('beforeend', html);
        this.setupListeners();
    }

    setupListeners() {
        const toggleBtn = document.getElementById('chatbot-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleChat());
        }

        const minimizeBtn = document.getElementById('chatbot-minimize');
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => this.toggleChat());
        }

        const sendBtn = document.getElementById('chatbot-send');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }

        const input = document.getElementById('chatbot-input');
        if (input) {
            input.addEventListener('keypress', (event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    this.sendMessage();
                }
            });
        }
    }

    toggleChat() {
        const container = document.getElementById('chatbot-container');
        const toggle = document.getElementById('chatbot-toggle');
        const input = document.getElementById('chatbot-input');

        if (!container || !toggle) {
            return;
        }

        container.classList.toggle('open');

        if (container.classList.contains('open')) {
            toggle.style.display = 'none';
            if (input) {
                input.focus();
            }
        } else {
            toggle.style.display = 'flex';
        }
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        if (!input) {
            return;
        }

        const message = input.value.trim();
        if (!message || this.isLoading) {
            return;
        }

        this.addMessageToUI(message, 'user');
        input.value = '';
        this.isLoading = true;
        this.showTypingIndicator();

        try {
            const response = await this.getAIResponse(message);
            this.removeTypingIndicator();
            this.addMessageToUI(response, 'bot');
        } catch (error) {
            this.removeTypingIndicator();
            console.error('Chatbot Error:', error);
            this.addMessageToUI('Nao consegui conectar com a IA agora. Tente novamente em instantes.', 'bot');
        }

        this.isLoading = false;
    }

    async getAIResponse(userMessage) {
        const response = await fetch(this.apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: userMessage,
                systemPrompt: this.buildSystemPrompt()
            })
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.error || `Erro HTTP ${response.status}`);
        }

        if (!data.reply) {
            throw new Error('Resposta vazia da API');
        }

        return data.reply;
    }

    buildSystemPrompt() {
        const projects = this.portfolioData.projetos_dados
            .map((project) => `- ${project.titulo}: ${project.desc}`)
            .join('\n');

        return `Voce e a assistente profissional do portfolio de Karla Renata, uma Desenvolvedora Web e Analista de Dados especializada em Python, SQL, Power BI e AWS.
PROJETOS PRINCIPAIS:
${projects}
INSTRUCOES:
1. Responda sempre em portugues.
2. Seja concisa, com no maximo 3 paragrafos.
3. Cite projetos relevantes quando apropriado.
4. Se perguntarem sobre algo fora do portfolio, redirecione gentilmente.
5. Ofereca sugestoes de projetos relacionados ao interesse.
6. Seja amigavel e profissional.`;
    }

    addMessageToUI(message, sender) {
        const container = document.querySelector('.chatbot-messages');
        if (!container) {
            return;
        }

        const messageClass = sender === 'user' ? 'user-message' : 'bot-message';
        const html = `
            <div class="message ${messageClass}">
                <div class="message-content">
                    <p>${this.escapeHtml(message)}</p>
                </div>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', html);
        container.scrollTop = container.scrollHeight;
    }

    showTypingIndicator() {
        const container = document.querySelector('.chatbot-messages');
        if (!container) {
            return;
        }

        container.insertAdjacentHTML('beforeend', `
            <div class="message bot-message typing-indicator">
                <div class="message-content">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            </div>
        `);
        container.scrollTop = container.scrollHeight;
    }

    removeTypingIndicator() {
        const typing = document.querySelector('.typing-indicator');
        if (typing) {
            typing.remove();
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.portfolioAssistant = new PortfolioAssistant();
    window.portfolioAssistant.renderChatbot();
});
