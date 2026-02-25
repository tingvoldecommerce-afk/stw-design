const https = require('https');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, history = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Ingen besked modtaget' });
  }

  let siteContent = '';
  try {
    const htmlPath = path.join(process.cwd(), 'index.html');
    siteContent = fs.readFileSync(htmlPath, 'utf8');
  } catch (e) {
    siteContent = 'STW Design er et dansk digitalt bureau der tilbyder hjemmesider, AI chatbots og SEO.';
  }

  const systemPrompt = `Du er en venlig chatbot for STW Design - et dansk digitalt bureau.
Du skal altid svare på dansk.
Du må gerne svare på hilsner som "Hej", "Godmorgen" osv. på en venlig måde.
Baser dine svar på følgende indhold fra hjemmesiden:

${siteContent}

Hvis spørgsmålet ikke handler om STW Designs ydelser (hjemmesider, AI chatbots, SEO), skal du svare:
"Det kan jeg desværre ikke hjælpe med, men er du interesseret i en dybere dialog, kan jeg skrive dig op til at blive kontaktet af vores team."
Hold svarene korte og venlige.
Brug aldrig markdown-formatering. Ingen stjerner, hashtags, bindestreger som bullets eller andre specialtegn. Skriv kun i almindelig tekst.`;

  const recentHistory = history.slice(-6); // maks 3 udvekslinger tilbage

  const data = JSON.stringify({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 512,
    system: systemPrompt,
    messages: [...recentHistory, { role: 'user', content: message }]
  });

  const options = {
    hostname: 'api.anthropic.com',
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  try {
    const response = await new Promise((resolve, reject) => {
      const request = https.request(options, (r) => {
        let body = '';
        r.on('data', chunk => body += chunk);
        r.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(new Error('Invalid JSON: ' + body));
          }
        });
      });
      request.on('error', reject);
      request.write(data);
      request.end();
    });

    if (response.error) {
      return res.status(500).json({ error: response.error.message });
    }

    const reply = response.content[0].text;
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: 'Noget gik galt: ' + error.message });
  }
};
