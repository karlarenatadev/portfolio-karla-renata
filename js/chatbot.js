/**
 * CHATBOT IA CONVERSACIONAL COM GEMINI
 * Melhoria #4: Assistente inteligente para exploração de projetos
 * 🤖 Powered by Google Gemini API
 */

class PortfolioAssistant {
    constructor() {
        // LÊ A CHAVE DO .env OU GITHUB SECRETS (GEMINI_API_KEY)
        this.apiKey = this.getApiKey();
        this.apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
        this.isLoading = false;
        this.portfolioData = this.getPortfolioData();
        
        if (!this.apiKey) {
            console.warn('⚠️ Chave API não configurada. O Chat vai abrir para teste visual.');
        }
    }

    getApiKey() {
        return window.__GEMINI_API_KEY__ || '';
    }

    getPortfolioData() {
        return {
            projetos_dados: [
                { titulo: "AWS Certification Simulator", tags: ["Python", "AWS", "Gemini AI"], desc: "Pipeline ETL com IA para validação de simulados" },
                { titulo: "SaaS Sales Analytics", tags: ["QuickSight", "AWS", "Análise"], desc: "Detecção de anomalias em faturamento" },
                { titulo: "Previsão de Estoque", tags: ["SageMaker", "ML", "AWS"], desc: "Modelagem preditiva para otimização" },
                { titulo: "Deal Scoring Preditivo", tags: ["Python", "Scikit-Learn", "Power BI"], desc: "ML para previsão de riscos B2B" },
                { titulo: "Gestão de Frotas", tags: ["Power BI", "DAX"], desc: "Dashboard executivo com KPIs" },
                { titulo: "Automação RPA", tags: ["Python", "PyAutoGUI"], desc: "Robô inteligente para ERP" },
                { titulo: "Análise de Vendas", tags: ["Python", "Seaborn"], desc: "EDA com visualizações avançadas" },
                { titulo: "Dashboard Logística", tags: ["Power BI"], desc: "Visualização de operações logísticas" },
                { titulo: "Fluxo de Caixa", tags: ["Power BI"], desc: "Gestão financeira" }
            ]
        };
    }

    renderChatbot() {
        // HTML Limpo, sem "onclick" misturados. A responsabilidade do clique fica no JS!
        const html = `
            <div id="chatbot-container" class="chatbot-bubble">
                <div class="chatbot-header">
                    <div class="chatbot-info">
                        <h3>💬 Assistente Karla</h3>
                        <p class="status">Online</p>
                    </div>
                    <button id="chatbot-minimize" class="chatbot-minimize">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div id="chatbot-messages" class="chatbot-messages">
                    <div class="message bot-message">
                        <div class="message-content">
                            <p>👋 Olá! Sou assistente de IA do portfólio da Karla Renata</p>
                            <p style="font-size: 0.85rem; margin-top: 8px;">Pergunte-me sobre projetos, skills ou experiência!</p>
                        </div>
                    </div>
                </div>
                <div class="chatbot-input-area">
                    <textarea id="chatbot-input" class="chatbot-input" placeholder="Digite sua pergunta..." rows="2"></textarea>
                    <button id="chatbot-send" class="chatbot-send">
                        <span class="material-symbols-outlined">send</span>
                    </button>
                </div>
                <div class="chatbot-footer"><p>Powered by Gemini AI</p></div>
            </div>
            <button id="chatbot-toggle" class="chatbot-toggle">
                <span class="material-symbols-outlined">smart_toy</span>
            </button>
        `;
        
        document.body.insertAdjacentHTML('beforeend', html);
        this.setupListeners(); // Liga os botões logo após criar o HTML
    }

    setupListeners() {
        // 1. Listener para abrir o chat no botão flutuante
        const toggleBtn = document.getElementById('chatbot-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleChat());
        }

        // 2. Listener para fechar o chat no "X"
        const minimizeBtn = document.getElementById('chatbot-minimize');
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => this.toggleChat());
        }

        // 3. Listener para o botão de Enviar (Aviãozinho)
        const sendBtn = document.getElementById('chatbot-send');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }

        // 4. Listener para a tecla Enter no teclado
        const input = document.getElementById('chatbot-input');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    this.sendMessage();
                    e.preventDefault();
                }
            });
        }
    }

    toggleChat() {
        const container = document.getElementById('chatbot-container');
        const toggle = document.getElementById('chatbot-toggle');
        const input = document.getElementById('chatbot-input');
        
        if (!container || !toggle) return;
        
        container.classList.toggle('open');
        
        if (container.classList.contains('open')) {
            toggle.style.display = 'none';
            if(input) input.focus(); // Coloca o cursor a piscar pronto a escrever
        } else {
            toggle.style.display = 'flex';
        }
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message || this.isLoading) return;
        
        this.addMessageToUI(message, 'user');
        input.value = '';
        
        if (!this.apiKey) {
            this.addMessageToUI('⚠️ API key não configurada. Gere uma chave no Google AI Studio e adicione ao projeto.', 'bot');
            return;
        }

        this.isLoading = true;
        this.showTypingIndicator();

        try {
            const response = await this.getAIResponse(message);
            this.removeTypingIndicator();
            this.addMessageToUI(response, 'bot');
        } catch (error) {
            this.removeTypingIndicator();
            console.error('Chatbot Error:', error);
            this.addMessageToUI('❌ Erro ao conectar com a IA. Tente novamente.', 'bot');
        }
        
        this.isLoading = false;
    }

    async getAIResponse(userMessage) {
        const systemPrompt = this.buildSystemPrompt();
        const requestBody = {
            contents: [{ parts: [{ text: systemPrompt + "\n\nUsuário: " + userMessage }] }],
            generationConfig: { maxOutputTokens: 300, temperature: 0.7, topP: 0.9 }
        };

        const response = await fetch(`${this.apiEndpoint}?key=${this.apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error ${response.status}: ${errorData.error?.message || 'Erro desconhecido'}`);
        }
        
        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
            throw new Error('Resposta vazia da API');
        }
        
        return data.candidates[0].content.parts[0].text;
    }

    buildSystemPrompt() {
        const projects = this.portfolioData.projetos_dados.map(p => `- ${p.titulo}: ${p.desc}`).join('\n');
        return `Você é assistente profissional do portfólio de Karla Renata, uma Desenvolvedora Web e Analista de Dados especializada em Python, SQL, Power BI e AWS.
PROJETOS PRINCIPAIS:
${projects}
INSTRUÇÕES:
1. Responda sempre em português
2. Seja conciso (máximo 3 parágrafos)
3. Cite projetos relevantes quando apropriado
4. Use emojis para melhorar a legibilidade
5. Se perguntarem sobre algo fora do portfólio, redirecione gentilmente
6. Ofereça sugestões de projetos relacionados ao interesse
7. Seja amigável e profissional`;
    }

    addMessageToUI(message, sender) {
        const container = document.querySelector('.chatbot-messages');
        if (!container) return;

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
        if (!container) return;

        container.insertAdjacentHTML('beforeend', 
            `<div class="message bot-message typing-indicator">
                <div class="message-content">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            </div>`);
        container.scrollTop = container.scrollHeight;
    }

    removeTypingIndicator() {
        const typing = document.querySelector('.typing-indicator');
        if (typing) typing.remove();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// INICIALIZA O CHATBOT QUANDO A PÁGINA CARREGA
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioAssistant = new PortfolioAssistant();
    window.portfolioAssistant.renderChatbot();
});