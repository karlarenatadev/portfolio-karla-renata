const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

function getReplyText(data) {
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Metodo nao permitido.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY nao configurada no servidor.' });
    }

    const { message, systemPrompt } = req.body || {};
    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Mensagem invalida.' });
    }

    try {
        const geminiResponse = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `${systemPrompt || ''}\n\nUsuario: ${message}`
                            }
                        ]
                    }
                ],
                generationConfig: {
                    maxOutputTokens: 300,
                    temperature: 0.7,
                    topP: 0.9
                }
            })
        });

        const data = await geminiResponse.json();

        if (!geminiResponse.ok) {
            const errorMessage = data?.error?.message || 'Falha ao consultar a Gemini.';
            return res.status(geminiResponse.status).json({ error: errorMessage });
        }

        const reply = getReplyText(data);
        if (!reply) {
            return res.status(502).json({ error: 'A Gemini retornou uma resposta vazia.' });
        }

        return res.status(200).json({ reply });
    } catch (error) {
        console.error('Erro no endpoint /api/chat:', error);
        return res.status(500).json({ error: 'Erro interno ao consultar a Gemini.' });
    }
};
