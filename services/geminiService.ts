import { GoogleGenAI } from "@google/genai";

// This is a global variable set by the config.js script
// which is generated at container startup by entrypoint.sh
declare global {
  interface Window {
    runtimeConfig: {
      apiKey: string;
    };
  }
}

const API_KEY = window.runtimeConfig?.apiKey;

if (!API_KEY) {
    throw new Error("API_KEY is not configured. It should be provided via a runtime config.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const reviewCode = async (code: string, language: string): Promise<string> => {
  const model = 'gemini-2.5-flash';
  
  const prompt = `
    You are an expert code reviewer with years of experience. Your task is to provide a comprehensive and constructive review of the following ${language} code.

    Analyze the code for the following aspects:
    1.  **Correctness & Bugs:** Identify any potential bugs, logical errors, or edge cases that are not handled correctly.
    2.  **Best Practices & Code Style:** Check for adherence to common style guides and best practices for the language. Suggest improvements for readability and maintainability.
    3.  **Performance:** Point out any potential performance bottlenecks and suggest more efficient alternatives.
    4.  **Security:** Highlight any security vulnerabilities (e.g., injection attacks, improper error handling, etc.).
    5.  **Clarity & Simplicity:** Suggest ways to simplify complex code or improve naming conventions.
    6.  **Отвечай строго на русском языке!
    
    Provide your feedback in Markdown format. Use clear headings for each section (e.g., \`## 🐛 Bugs\`, \`## ✨ Best Practices\`, \`## 🚀 Performance\`, \`## 🔒 Security\`).
    For each point, briefly explain the issue and provide a corrected code snippet if applicable. Be concise and professional. If no issues are found in a category, state that.

    Here is the code to review:
    \`\`\`${language.toLowerCase()}
    ${code}
    \`\`\`
  `;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the Gemini API. Please check your connection and API key.");
  }
};
