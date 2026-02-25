export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, history = [] } = req.body;

  if (!message) return res.status(400).json({ error: 'Missing message' });

  const systemPrompt = `Du er en hjælpsom kundeservice-assistent for STW Design – et dansk digitalt bureau.
STW Design tilbyder tre ydelser:
- Hjemmesider: professionelle, hurtige og mobilvenlige hjemmesider
- AI Chatbots: intelligente chatbots der svarer kunder 24/7
- SEO: optimering så virksomheder bliver fundet på Google

Svar altid på dansk, kort og venligt. Maks 2-3 sætninger.
Hvis nogen spørger om priser, leveringstider eller noget du ikke kender svaret på, svar da præcis: KONTAKT_MIG`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        system: systemPrompt,
        messages: [...history, { role: 'user', content: message }],
      }),
    });

    const data = await response.json();

    if (data.error) return res.status(400).json({ error: data.error.message });

    return res.status(200).json({ reply: data.content[0].text });

  } catch (error) {
    return res.status(500).json({ error: 'Server error: ' + error.message });
  }
}