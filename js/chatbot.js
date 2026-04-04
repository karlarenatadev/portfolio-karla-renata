// AI Chatbot Implementation using Gemini API

class Chatbot {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.gemini.com/v1';
    }

    async sendMessage(message) {
        const response = await fetch(`${this.baseUrl}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({ message })
        });
        return response.json();
    }

    async getResponse(userMessage) {
        const response = await this.sendMessage(userMessage);
        return response.reply || 'I am sorry, I didn’t understand that.';
    }
}

// Usage
const chatbot = new Chatbot('YOUR_GEMINI_API_KEY');
chatbot.getResponse('Hello, how can I help you?').then(console.log);