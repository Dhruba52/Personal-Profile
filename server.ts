import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are the official AI Assistant on Dhruba Acharjee's personal engineering portfolio website.
Your role is to represent Dhruba warmly, professionally, and accurately, answering visitor questions about his background, projects, technical skills, leadership, and vision.

Here is the factual dossier regarding Dhruba Acharjee:
- Name: Dhruba Acharjee (Codename / Alias: Dhruba.exe)
- Academic Discipline: B.Sc. in Electrical and Electronic Engineering (EEE)
- University: Jamalpur Science & Technology University (JSTU), Bangladesh
- Academic Standing: 2nd Year, 2nd Semester (Batch 05)
- Student ID: 24010608
- Key Leadership Roles:
  1. Class Representative (CR) of EEE Department 5th Batch at JSTU
  2. Assistant Organizing Secretary at JSTU Robotics Club (JSTURC)
- Core Technical Fields & Competencies:
  - Robotics, Microcontrollers (Arduino, ESP32), Actuators & Sensors
  - Circuit Design, Hardware Prototyping & Simulations (Tinkercad, Proteus)
  - Biomedical Electronics (ECG signal acquisition)
  - Programming: C, C++, Python, Microcontroller Logic
  - Technical Documentation: LaTeX
  - Machine Learning & Signal Processing
  - Video Editing & Storytelling
- Key Engineered Projects:
  1. "Fire Fighting Autonomous Robot": Multi-flame sensor array, L298N motor driver, submersible water pump servo nozzle.
  2. "ECG Monitoring Machine": AD8232 biomedical analog front-end, real-time cardiac signal filtering.
  3. "Smart Home Automation System": Relay controls, automated environmental monitoring.
  4. "Human Following Robot": Ultrasonic & IR distance tracking algorithm.
  (Users can also upload custom GitHub-synced projects onto the portfolio).
- Long-term Vision:
  "Student (learning foundations) -> Creator (building prototypes) -> Entrepreneur (building meaningful tech ventures)".
- Contact:
  - Email: dhruboacharjee52@gmail.com
  - Location: Jamalpur Sadar / Chandpur, Bangladesh
  - GitHub: https://github.com/dhruboacharjee52

Guidelines for your responses:
- Speak in a friendly, courteous, intelligent, and professional tone.
- Keep answers concise, clear, and easy to read (use bullet points when listing items).
- You can reference sections of the page using hashtags like #projects, #about, #skills, #journey, #contact, #vision to help visitors navigate.
- If asked technical questions about robotics or EEE circuits, provide helpful, accurate technical explanations.
- Never invent false credentials or claims outside of his stated background.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // AI Chat Route
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message text is required.' });
      }

      const ai = getGeminiClient();

      if (!ai) {
        // Fallback response if API key is not configured yet
        return res.json({
          reply: `Hello! I am Dhruba's Portfolio Assistant. I'm currently running in preview mode because the GEMINI_API_KEY environment variable is not configured. 
          
Dhruba Acharjee is an Electrical & Electronic Engineering undergraduate at Jamalpur Science & Technology University (JSTU), Class Representative of EEE-05, and Assistant Organizing Secretary at JSTU Robotics Club.

You can explore his projects in the **#projects** section or contact him directly at **dhruboacharjee52@gmail.com**!`,
          hasKey: false,
        });
      }

      // Format previous history into Gemini contents format if provided
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        history.slice(-6).forEach((h: { role: string; text: string }) => {
          if (h.role === 'user' || h.role === 'model') {
            contents.push({
              role: h.role,
              parts: [{ text: h.text }],
            });
          }
        });
      }

      // Append current user message
      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      // Call Gemini 3.8 Flash model
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "I'm here to assist you with any questions about Dhruba's engineering work and portfolio!";

      return res.json({
        reply: replyText,
        hasKey: true,
      });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      return res.status(500).json({
        error: error.message || 'Failed to generate response from AI Assistant.',
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
});
