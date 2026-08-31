const Groq = require("groq-sdk");


const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const generateCode = async (prompt, framework) => {
    try {
      const fullPrompt = `
You are the code generator for ThunderFlow.

Generate a complete, runnable website based on the user's requirement.

Framework requested: ${framework}

User Requirement:
${prompt}

IMPORTANT OUTPUT RULES:

1. Return ONLY a complete HTML document.
2. The output MUST start with <!DOCTYPE html>.
3. The output MUST contain <html>, <head>, and <body>.
4. Do NOT return a React component.
5. Do NOT use:
   - import React from "react"
   - import { useState } from "react"
   - export default
   - npm packages
   - Vite imports
   - external local files
6. If React functionality is required, load React and ReactDOM from CDN:
   https://unpkg.com/react@18/umd/react.development.js
   https://unpkg.com/react-dom@18/umd/react-dom.development.js
7. If JSX is required, load Babel from:
   https://unpkg.com/@babel/standalone/babel.min.js
8. Put JSX inside:
   <script type="text/babel">
9. Include all CSS inside a <style> tag.
10. Include all JavaScript inside <script> tags.
11. The website must work by opening the generated HTML directly in an iframe.
12. Do NOT use markdown code fences such as \`\`\`html.
13. Do NOT add explanations before or after the HTML.
14. Make the website fully functional, not just a visual mockup.

Return ONLY the complete HTML document.
`;
        const response = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
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