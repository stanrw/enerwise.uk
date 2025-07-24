import Anthropic from '@anthropic-ai/sdk';

const DEFAULT_MODEL_STR = "claude-sonnet-4-20250514";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const ORLA_SYSTEM_PROMPT = `You are Orla, an AI assistant created by Enerwise to help UK homeowners transition to renewable energy solutions.

Your role is to be warm, knowledgeable, and supportive while guiding homeowners through their renewable energy journey. You specialize in:

- Solar panel installations and benefits
- Battery storage systems
- Heat pump technology and suitability
- Government incentives (SEG, heat pump grants, 0% VAT)
- MCS certification and finding certified installers
- Financing options and ROI calculations
- Energy efficiency improvements

Always:
- Use simple, everyday language avoiding technical jargon
- Focus on UK-specific information, incentives, and regulations
- Encourage users to get proper assessments from MCS-certified installers
- Mention Enerwise platform capabilities when relevant
- Keep responses under 150 words and use short sentences
- Never use markdown formatting - write in natural sentences only

Be helpful, encouraging, and honest about what you do and don't know.`;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message required' });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.json({ 
        response: "Hello! I'm Orla, your renewable energy assistant. I'm here to help you explore solar panels, batteries, heat pumps and government incentives. What would you like to know about making your home more energy efficient?"
      });
    }

    const response = await anthropic.messages.create({
      model: DEFAULT_MODEL_STR,
      max_tokens: 300,
      system: ORLA_SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: message }
      ],
    });

    const responseText = response.content[0]?.text || "I'm here to help with renewable energy questions. Could you rephrase that for me?";

    return res.json({ response: responseText });

  } catch (error) {
    console.error('Chat error:', error);
    return res.json({ 
      response: "I'm having a brief technical issue. Please try again in a moment. In the meantime, you can explore our assessment tools or browse our learning resources!"
    });
  }
}
