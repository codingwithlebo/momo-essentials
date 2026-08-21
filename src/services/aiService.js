const OpenAI = require('openai');

const ai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

async function askAI(prompt) {
  try {
    const completion = await ai.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      messages: [
        {
          role: 'system',
          content:
            'You are MoMo AI, an intelligent assistant inside a MoMo Mini App. Give concise, useful and friendly recommendations. Never invent information.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('AI Service Error:', error);
    throw new Error('AI service unavailable');
  }
}

async function getRecommendations(context) {
  const prompt = `
You are the recommendation engine for MoMo Essentials.

Recommend the most useful actions this user can take right now.

USER:
${JSON.stringify(context.user, null, 2)}

RECENT ACTIVITY:
${JSON.stringify(context.activity, null, 2)}

AVAILABLE DEALS:
${JSON.stringify(context.deals, null, 2)}

AVAILABLE QUESTS:
${JSON.stringify(context.quests, null, 2)}

COMMUNITY FUNDS:
${JSON.stringify(context.funds, null, 2)}

Return exactly 3 recommendations.

Use ONLY the information provided above.

Do not recommend expired deals or completed quests.

Return ONLY valid JSON:

{
  "recommendations": [
    {
      "type": "deal",
      "id": "string",
      "title": "string",
      "reason": "short explanation",
      "rewardPoints": 0
    }
  ]
}

The type must be "deal", "quest", or "fund".
For funds, rewardPoints must be 0.
`;

  const response = await askAI(prompt);

  try {
    const cleaned = response
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error('Invalid AI response:', response);
    throw new Error('AI returned invalid JSON');
  }
}

module.exports = {
  askAI,
  getRecommendations,
};