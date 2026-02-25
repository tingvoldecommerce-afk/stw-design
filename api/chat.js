const https = require('https');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  
  const htmlPath = path.join(process.cwd(), 'index.html');
  const siteContent = fs.readFileSync(htmlPath, 'utf8');

  const systemPrompt = `Du er en hjælpsom chatbot for STW Design - et dansk digitalt bureau. 
Du skal svare på dansk og kun basere dine svar på følgende indhold fra hjemmesiden:

${siteContent}

Hvis du ikke kan finde svaret i ovenstående indhold, skal du svare præcis: "KONTAKT_MIG"
Hold svarene korte og venlige.`;

  const data = JSON.stringify({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: 'user', content: message }]
  });

  const options = {
    hostname: 'api.anthropic.com',
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    }
  };

  try {
    const response = await new Promise((resolve, reject) => {
      const request = https.request(options, (r) => {
        let body = '';
        r.on('data', chunk => body += chunk);
        r.on('end', () => resolve(JSON.parse(body)));
      });
      request.on('error', reject);
      request.write(data);
      request.end();
    });

    const reply = response.content[0].text;
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: 'Noget gik galt' });
  }
};