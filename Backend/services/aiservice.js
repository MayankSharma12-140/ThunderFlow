const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const generateCode = async (prompt, framework) => {
    try {
        const fullPrompt = `
Generate a complete ${framework} UI.

User Requirement:
${prompt}

Rules:
1. Return only code.
2. Do not use markdown.
3. Do not explain anything.
`;

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: fullPrompt,
                },
            ],
            temperature: 0.4,
        });

        return response.choices[0].message.content;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    generateCode,
};