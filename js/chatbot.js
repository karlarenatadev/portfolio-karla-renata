/**
 * CHATBOT IA CONVERSACIONAL COM GEMINI
 * Melhoria #4: Assistente inteligente para exploração de projetos
 * 🤖 Powered by Google Gemini API
 */

class PortfolioAssistant {
    constructor() {
        // ✅ SUBSTITUA COM SUA CHAVE AQUI
        this.apiKey = 'AIzaSyC2n4RYn_r-4x0mXGxJV8_r0dXc-q9d-cQ'; 
        this.apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
        this.isLoading = false;
        this.portfolioData = this.getPortfolioData();
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
        const html = `
            <div id="chatbot-container" class="chatbot-bubble">
                <div class="chatbot-header">
                    <div class="chatbot-info">
                        <h3>💬 Assistente Karla</h3>
                        <p class="status">Online</p>
                    </div>
                    <button class="chatbot-minimize" onclick="portfolioAssistant.toggleChat()">
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
                    <button class="chatbot-send" onclick="portfolioAssistant.sendMessage()">
                        <span class="material-symbols-outlined">send</span>
                    </button>
                </div>
                <div class="chatbot-footer"><p>Powered by Gemini AI</p></div>
            </div>
            <button id="chatbot-toggle" class="chatbot-toggle" onclick="portfolioAssistant.toggleChat()">
                <span class="material-symbols-outlined">chat</span>
            </button>
        `;
        
        document.body.insertAdjacentHTML('beforeend', html);
        this.setupListeners();
    }

    setupListeners() {
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
        container.classList.toggle('open');
        toggle.style.display = container.classList.contains('open') ? 'none' : 'flex';
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        if (!message || this.isLoading) return;

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
            this.addMessageToUI('❌ Desculpe, ocorreu um erro. Tente novamente.', 'bot');
            console.error('Chatbot Error:', error);
        }
        this.isLoading = false;
    }

    async getAIResponse(userMessage) {
        const systemPrompt = this.buildSystemPrompt();
        const requestBody = {
            contents: [{
                parts: [{ text: systemPrompt + "\n\nUsuário: " + userMessage }]
            }],
            generationConfig: {
                maxOutputTokens: 300,
                temperature: 0.7,
                topP: 0.9
            }
        };

        const response = await fetch(`${this.apiEndpoint}?key=${this.apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }
        
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    buildSystemPrompt() {
        const projects = this.portfolioData.projetos_dados
            .map(p => `- ${p.titulo}: ${p.desc}`)
            .join('\n');

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
        const container = document.getElementById('chatbot-messages');
        const messageClass = sender === 'user' ? 'user-message' : 'bot-message';
        const html = `
            <div class="message ${messageClass}">
                <div class="message-content"><p>${this.escapeHtml(message)}</p></div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', html);
        container.scrollTop = container.scrollHeight;
    }

    showTypingIndicator() {
        const container = document.getElementById('chatbot-messages');
        container.insertAdjacentHTML('beforeend', 
            `<div class="message bot-message typing-indicator">
                <div class="message-content">
                    <span class="dot"></span><span class="dot"></span><span class="dot"></span>
                </div>
            </div>`);
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

// ✅ INICIALIZA O CHATBOT QUANDO A PÁGINA CARREGA
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioAssistant = new PortfolioAssistant();
    portfolioAssistant.renderChatbot();
});