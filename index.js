const express = require('express');
const Groq = require('groq-sdk');

const app = express();
const port = 3000;
const groqApiKey = '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'; // Replace with your actual Groq API key

const groq = new Groq({ apiKey: groqApiKey });

app.get('/llama3', async (req, res) => {
    const prompt = req.query.prompt;
    if (!prompt) {
        return res.status(400).send('Prompt query parameter is required');
    }

    try {
        const chatCompletion = await getGroqChatCompletion(prompt);
        res.json({ response: chatCompletion.choices[0]?.message?.content || '' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating response from Groq API');
    }
});

async function getGroqChatCompletion(prompt) {
    return groq.chat.completions.create({
        messages: [
            {
                role: 'user',
                content: prompt,
            },
        ],
        model: 'llama3-8b-8192',
    });
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
